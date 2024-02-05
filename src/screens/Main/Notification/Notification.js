import React, {Component} from 'react';
import {FlatList, Text, View, ActivityIndicator} from 'react-native';
import {connect} from 'react-redux';
import {getNotificationList} from '../../../redux/actions/appAction';
import AppBackground from '../../../components/AppBackground';
import NotificationList from '../../../components/NotificationList';
import {colors} from '../../../utils';
import styles from './styles';

class Notification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notifications: [],
      currentPaginationForNotification: 0,
      paginationInfoNotification: {
        moreLoading: false,
        isListEnded: false,
      },
    };
  }
  componentDidMount() {
    this.focusListener = this.props.navigation.addListener('focus', () => {
      this.fetchNotification(0, true);
    });
  }
  componentWillUnmount() {
    this.focusListener();
  }
  fetchNotification = (pagination, loaderShown) => {
    const {notifications} = this.state;
    const params = {
      key: 'offset',
      value: pagination,
    };
    this.props?.getNotificationList(params, loaderShown, data => {
      if (data) {
        const newNotification = data;
        const currentAllNotification = notifications;
        const updatedAllProperties =
          currentAllNotification.concat(newNotification);
        this.setState({
          notifications: updatedAllProperties,
          paginationInfoNotification: {
            moreLoading: false,
            isListEnded: newNotification?.length > 0 ? false : true,
          },
        });
      }
    });
  };
  loadMorePagination = () => {
    const {currentPaginationForNotification, paginationInfoNotification} =
      this.state;
    if (paginationInfoNotification?.isListEnded) return;
    this.fetchNotification(currentPaginationForNotification + 10, false);
    this.setState(previousState => ({
      currentPaginationForNotification:
        previousState?.currentPaginationForNotification + 10,
      paginationInfoNotification: {
        moreLoading: true,
        isListEnded: false,
      },
    }));
  };
  render() {
    const {notifications, paginationInfoNotification} = this.state;
    const ListEmptyComponent = () => {
      return (
        <View style={styles.noMessageView}>
          <Text style={styles.noMessageTitle}>No notification found</Text>
        </View>
      );
    };
    const ListFooterComponent = () => {
      return (
        <View style={styles.footerText}>
          {paginationInfoNotification?.moreLoading && (
            <ActivityIndicator size={'small'} color={colors.primary} />
          )}
          {paginationInfoNotification?.isListEnd && (
            <Text>No more notification at the moment</Text>
          )}
        </View>
      );
    };
    return (
      <AppBackground back title={'Notification'} marginHorizontal={false}>
        <View style={styles.mainCont}>
          {notifications?.length > 0 ? (
            <FlatList
              contentContainerStyle={styles.flatListCont}
              data={notifications}
              ListEmptyComponent={<ListEmptyComponent />}
              showsVerticalScrollIndicator={false}
              keyExtractor={(item, index) => index?.toString()}
              onEndReachedThreshold={0.5}
              onEndReached={this.loadMorePagination}
              ListFooterComponent={<ListFooterComponent />}
              renderItem={({item}) => <NotificationList item={item} />}
            />
          ) : (
            <ListEmptyComponent />
          )}
        </View>
      </AppBackground>
    );
  }
}

const actions = {getNotificationList};
function mapStateToProps({authReducer}) {
  return {
    user: authReducer?.user,
  };
}
export default connect(mapStateToProps, actions)(Notification);
