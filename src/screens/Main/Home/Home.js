import React, {Component} from 'react';
import {connect} from 'react-redux';
import Toast from 'react-native-toast-message';
import AppBackground from '../../../components/AppBackground';
import Search from '../../../components/Search';
import {View, Keyboard} from 'react-native';
import CustomButton from '../../../components/CustomButton';
import {colors} from '../../../utils';
import Properties from './TabbarComponents/Properties/Properties';
import EventPosted from './TabbarComponents/EventPosted/EventPosted';
import {
  getProperties,
  getAllEvents,
  getSearchInfoForAll,
} from '../../../redux/actions/appAction';
import styles from './styles';
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchList: [],
      allProperties: [],
      searchProperties: [],
      allEvents: [],
      searchedEvents: [],
      isSearching: false,
      index: 0,
      currentPaginationForProperties: 0,
      currentPaginationForEvents: 0,
      paginationInfoProperties: {
        moreLoading: false,
        isListEnded: false,
      },
      paginationInfoEvents: {
        moreLoading: false,
        isListEnded: false,
      },
    };
  }
  componentDidMount() {
    const {index, currentPaginationForProperties, currentPaginationForEvents} =
      this.state;
    this.focusListener = this.props.navigation.addListener('focus', () => {
      if (index == 0) {
        this.setState(
          {
            allProperties: [],
            searchProperties: [],
            currentPaginationForProperties: 0,
          },
          () => {
            this.fetchProperties(currentPaginationForProperties, true);
          },
        );
      } else if (index == 1) {
        this.setState(
          {
            allEvents: [],
            searchedEvents: [],
            currentPaginationForEvents: 0,
          },
          () => {
            this.fetchEvents(currentPaginationForEvents, true);
          },
        );
      }
    });
  }
  componentWillUnmount() {
    this.focusListener();
  }
  fetchProperties = (pagination, loaderShown) => {
    const {allProperties, searchProperties} = this.state;
    const params = {
      key: 'offset',
      value: pagination,
    };
    this.props?.getProperties(params, loaderShown, data => {
      if (data) {
        const newProperties = data;
        const currentAllProperties = allProperties;
        const currentSearchProperties = searchProperties;
        const updatedAllProperties = currentAllProperties.concat(newProperties);
        const updatedSearchProperties =
          currentSearchProperties.concat(newProperties);
        this.setState({
          allProperties: updatedAllProperties,
          searchProperties: updatedSearchProperties,
          paginationInfoProperties: {
            moreLoading: false,
            isListEnded: newProperties?.length > 0 ? false : true,
          },
        });
      }
    });
  };
  fetchEvents = (pagination, loaderShown) => {
    const {allEvents, searchedEvents} = this.state;
    const params = {
      firstKey: 'offset',
      firstValue: pagination,
      secondKey: 'list_type',
      secondValue: 'ongoing',
    };
    this.props.getAllEvents(params, loaderShown, data => {
      if (data) {
        const newEvents = data?.events ? data?.events : [];
        const currentAllEvents = allEvents;
        const currentSearchedEvents = searchedEvents;
        const updatedAllProperties = currentAllEvents.concat(newEvents);
        const updatedSearchProperties = currentSearchedEvents.concat(newEvents);
        this.setState({
          allEvents: updatedAllProperties,
          searchedEvents: updatedSearchProperties,
          paginationInfoEvents: {
            moreLoading: false,
            isListEnded: data && data?.events?.length > 0 ? false : true,
          },
        });
      }
    });
  };
  fetchSearchInfo = search_key => {
    const params = {
      key: 'search_key',
      value: search_key,
    };
    this.props.getSearchInfoForAll(params, data => {
      if (data) {
        this.setState({
          searchProperties: data?.properties,
          searchedEvents: data?.events,
          isSearching: true,
        });
      } else {
        this.setState({
          searchProperties: [],
          searchedEvents: [],
          isSearching: true,
        });
      }
    });
  };
  loadMorePagination = paginationFor => {
    const {
      currentPaginationForProperties,
      paginationInfoProperties,
      currentPaginationForEvents,
      paginationInfoEvents,
    } = this.state;
    if (paginationFor == 'property') {
      if (paginationInfoProperties?.isListEnded) return;
      this.fetchProperties(currentPaginationForProperties + 10, false);
      this.setState(previousState => ({
        currentPaginationForProperties:
          previousState?.currentPaginationForProperties + 10,
        paginationInfoProperties: {
          moreLoading: true,
          isListEnded: false,
        },
      }));
    } else if (paginationFor == 'events') {
      if (paginationInfoEvents?.isListEnded) return;
      this.fetchEvents(currentPaginationForEvents + 10, false);
      this.setState(previousState => ({
        currentPaginationForEvents:
          previousState?.currentPaginationForEvents + 10,
        paginationInfoEvents: {
          moreLoading: true,
          isListEnded: false,
        },
      }));
    }
  };

  render() {
    const {
      allProperties,
      isSearching,
      allEvents,
      searchProperties,
      searchedEvents,
      index,
      paginationInfoProperties,
      paginationInfoEvents,
    } = this?.state;

    const SearchData = async text => {
      Keyboard.dismiss();
      if (text == '')
        return Toast.show({
          text1: 'Please enter some text to search',
          type: 'error',
          visibilityTime: 3000,
        });
      this.fetchSearchInfo(text);
    };
    const removeSavedSearchInfo = () => {
      this.setState({
        searchProperties: allProperties,
        searchedEvents: allEvents,
        isSearching: false,
      });
    };

    return (
      <AppBackground
        notification
        message
        username={`Hello, ${this?.props?.user?.full_name}`}
        marginHorizontal={false}
        marginBottom={10}>
        <View style={styles.mainCont}>
          <Search
            searcIcon
            marginHorizontal={true}
            fetchSearchInfo={text => SearchData(text)}
            removeCurrentSearchInfo={removeSavedSearchInfo}
          />
          <View style={[styles.flexRow, styles.BtnView]}>
            <CustomButton
              title="Properties"
              onPress={() => {
                if (!isSearching) {
                  this.setState(
                    {
                      index: 0,
                      allProperties: [],
                      searchProperties: [],
                      currentPaginationForProperties: 0,
                    },
                    () => {
                      if (!isSearching) {
                        this.fetchProperties(0, true);
                      }
                    },
                  );
                } else {
                  this.setState({index: 0});
                }
              }}
              buttonStyle={[
                styles.buttonStyle,
                {
                  backgroundColor: index == 0 ? colors.primary : null,
                },
              ]}
              textStyle={[
                styles.btnTitle,
                {
                  color: index == 0 ? colors.white : colors.black,
                },
              ]}
            />
            <CustomButton
              title="Event Posted"
              onPress={() => {
                if (!isSearching) {
                  this.setState(
                    {
                      index: 1,
                      allEvents: [],
                      searchedEvents: [],
                      currentPaginationForEvents: 0,
                    },
                    () => {
                      if (!isSearching) {
                        this.fetchEvents(0, true);
                      }
                    },
                  );
                } else {
                  this.setState({index: 1});
                }
              }}
              buttonStyle={[
                styles.buttonStyle,
                {
                  backgroundColor:
                    index == 1 ? colors.primary : colors.lightGray,
                },
              ]}
              textStyle={[
                styles.btnTitle,
                {
                  color: index == 1 ? colors.white : colors.black,
                },
              ]}
            />
          </View>
          {index == 0 ? (
            <Properties
              allProperties={searchProperties}
              loadMore={() => this.loadMorePagination('property')}
              paginationInfo={paginationInfoProperties}
              isSearching={isSearching}
            />
          ) : (
            <EventPosted
              allEvents={searchedEvents}
              loadMore={() => this.loadMorePagination('events')}
              paginationInfo={paginationInfoEvents}
              isSearching={isSearching}
            />
          )}
        </View>
      </AppBackground>
    );
  }
}

const actions = {getProperties, getAllEvents, getSearchInfoForAll};
function mapStateToProps({authReducer}) {
  return {
    user: authReducer?.user,
  };
}
export default connect(mapStateToProps, actions)(Home);
