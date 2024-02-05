import React, {Component} from 'react';
import {View, FlatList, RefreshControl, ActivityIndicator} from 'react-native';
import {connect} from 'react-redux';
import AppBackground from '../../../components/AppBackground';
import ListEmptyComponent from '../../../components/ListEmptyComponent';
import {getAllEvents} from '../../../redux/actions/appAction';
import EventList from '../../../components/EventList';
import NavService from '../../../helpers/NavService';
import {colors} from '../../../utils/colors';
import styles from './styles';
class PastEvents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allEvents: [],
      refreshing: false,
      paginationInfoEvents: {
        moreLoading: false,
        isListEnded: false,
      },
      currentPaginationForEvents: 0,
    };
  }
  componentDidMount() {
    this.focusListener = this.props.navigation.addListener('focus', () => {
      this.setState(
        {
          allEvents: [],
          paginationInfoEvents: {
            moreLoading: false,
            isListEnded: false,
          },
          currentPaginationForEvents: 0,
        },
        () => {
          this.fetchEvents(0, true);
        },
      );
    });
  }
  componentWillUnmount() {
    this.focusListener();
  }
  fetchEvents = (pagination, loaderShown) => {
    const {allEvents} = this.state;
    const params = {
      firstKey: 'offset',
      firstValue: pagination,
      secondKey: 'list_type',
      secondValue: 'past',
    };
    this.props.getAllEvents(params, loaderShown, data => {
      if (data) {
        const newEvents = data?.events ? data?.events : [];
        const currentAllEvents = allEvents;
        const updatedAllEvents = currentAllEvents.concat(newEvents);

        this.setState(previousState => ({
          allEvents: updatedAllEvents,
          paginationInfoEvents: {
            moreLoading: false,
            isListEnded: data && data?.events?.length > 0 ? false : true,
          },
        }));
      }
    });
  };
  loadMorePagination = () => {
    const {currentPaginationForEvents, paginationInfoEvents} = this.state;
    if (paginationInfoEvents?.isListEnded) return;
    this.fetchEvents(currentPaginationForEvents + 10, false);
    this.setState(previousState => ({
      currentPaginationForEvents: previousState?.currentPaginationForEvents + 1,
      paginationInfoEvents: {
        moreLoading: true,
        isListEnded: false,
      },
    }));
  };
  render() {
    const {allEvents, refreshing, paginationInfoEvents} = this.state;
    const ListFooterComponent = () => {
      return (
        <View style={styles.footerText}>
          {paginationInfoEvents?.moreLoading && (
            <ActivityIndicator size={'small'} color={colors.primary} />
          )}
          {paginationInfoEvents?.isListEnd && (
            <Text>No more events at the moment</Text>
          )}
        </View>
      );
    };
    return (
      <AppBackground title={'Past Events'} back marginHorizontal={false}>
        <View style={styles.mainCont}>
          {allEvents?.length > 0 ? (
            <FlatList
              contentContainerStyle={styles.flatListCont}
              data={allEvents}
              ItemSeparatorComponent={() => <View style={{height: 15}} />}
              ListEmptyComponent={
                <ListEmptyComponent
                  title={'No past event found'}
                  viewStyle={styles.noMessageView}
                  titleStyle={styles.noMessageTitle}
                />
              }
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={async () => {
                    this.setState({refreshing: true});
                    await this.fetchEvents(0, false);
                    this.setState({refreshing: false});
                  }}
                />
              }
              showsVerticalScrollIndicator={false}
              keyExtractor={(item, index) => index?.toString()}
              onEndReachedThreshold={0.5}
              onEndReached={() => this.loadMorePagination()}
              ListFooterComponent={<ListFooterComponent />}
              renderItem={({item}) => {
                return (
                  <EventList
                    item={item}
                    onPress={() =>
                      NavService.navigate('EventDetail', {
                        screenName: 'PastEvents',
                        eventInfo: item,
                      })
                    }
                    screenName="PastEvents"
                  />
                );
              }}
            />
          ) : (
            <ListEmptyComponent
              title={'No past event found'}
              viewStyle={styles.noMessageView}
              titleStyle={styles.noMessageTitle}
            />
          )}
        </View>
      </AppBackground>
    );
  }
}

const actions = {getAllEvents};
function mapStateToProps({authReducer}) {
  return {
    user: authReducer?.user,
  };
}
export default connect(mapStateToProps, actions)(PastEvents);
