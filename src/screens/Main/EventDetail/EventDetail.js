import React, {Component} from 'react';
import {
  FlatList,
  View,
  TouchableOpacity,
  RefreshControl,
  ScrollView,
} from 'react-native';
import {connect} from 'react-redux';
import moment from 'moment';
import AppBackground from '../../../components/AppBackground';
import ListEmptyComponent from '../../../components/ListEmptyComponent';
import CarouselComponent from '../../../components/CarouselComponent';
import Img from '../../../components/Img';
import {appIcons} from '../../../assets';
import CustomText from '../../../components/CustomText';
import GroupImages from '../../../components/GroupImages';
import RequestList from '../../../components/RequestList';
import NavService from '../../../helpers/NavService';
import {
  getEventDetail,
  deleteCurrentEvent,
  handelEventRequest,
} from '../../../redux/actions/appAction';
import {ASSETS_URL, GOOGLE_MAPS_URL} from '../../../config/WebService';
import {openLink} from '../../../helpers/BrowserUrl';
import appStyles from '../../appStyles';
import styles from './styles';
class EventDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      getEventDetail: null,
      refreshing: false,
    };
  }
  componentDidMount() {
    this.focusListener = this.props.navigation.addListener('focus', () => {
      this.fetchEventDetails();
    });
  }
  componentWillUnmount() {
    this.focusListener();
  }
  fetchEventDetails = () => {
    const {eventInfo} = this.props.route.params;
    const params = {
      key: 'event_id',
      value: eventInfo?.id,
    };
    this.props?.getEventDetail(params, data => {
      if (data) {
        this.setState({getEventDetail: data});
      } else {
        this.setState({getEventDetail: null});
      }
    });
  };
  handleToggleRequest = (user, status) => {
    let payload = {
      status,
      event_id: this?.state?.getEventDetail?.id,
      user_id: user?.id,
    };
    this.props.handelEventRequest(payload, response => {
      if (response?.status == 1) {
        this.fetchEventDetails();
      }
    });
  };
  deleteEvent = () => {
    const eventId = this?.props?.route?.params?.eventInfo?.id;
    const params = {
      key: 'event_id',
      value: eventId,
    };
    this?.props?.deleteCurrentEvent(params);
  };
  render() {
    const {screenName, eventInfo} = this.props.route.params;
    const {getEventDetail, refreshing} = this.state;
    console.log('getEventDetail', getEventDetail);
    return (
      <AppBackground title={'Event Detail'} back marginHorizontal={false}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={async () => {
                this.setState({refreshing: true});
                await this.fetchEventDetails();
                this.setState({refreshing: false});
              }}
            />
          }>
          <View style={styles.mainCont}>
            <CarouselComponent
              message
              carouselImages={getEventDetail?.attachment}
              onEditPress={() =>
                NavService.navigate('EditEvent', {eventInfo: getEventDetail})
              }
              onDeletePress={this.deleteEvent}
              onMessagePress={() =>
                NavService.navigate('Chat', {groupInfo: getEventDetail})
              }
              screenName={screenName}
            />
            <View style={[styles.flexRow, styles.headingCont]}>
              <CustomText text={getEventDetail?.title} style={styles.heading} />
              <CustomText
                text={`Category: ${getEventDetail?.category?.title}`}
                style={styles.content}
              />
            </View>
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() =>
                openLink(
                  GOOGLE_MAPS_URL +
                    `${getEventDetail?.longitude},${getEventDetail?.latitude}`,
                )
              }
              style={[styles.flexRow, styles.contentCont]}>
              <Img local src={appIcons.marker} style={styles.markerIcon} />
              <CustomText
                text={getEventDetail?.location}
                style={styles.content}
              />
            </TouchableOpacity>
            <CustomText
              text={getEventDetail?.description}
              style={styles.description}
            />
            <View style={[styles.flexRow, styles.eventDetailCont]}>
              <CustomText
                text={`Property Name: ${getEventDetail?.property?.name}`}
                style={styles.time}
              />
              <View style={[styles.flexRow, {...appStyles.justifyCenter}]}>
                <CustomText
                  text={`Capacity: ${getEventDetail?.property?.capicity}`}
                  style={styles.time}
                />
              </View>
            </View>
            <View style={[styles.flexRow, styles.eventDetailCont]}>
              <CustomText
                text={`Time: ${moment(getEventDetail?.start_datetime).format(
                  'hh:mm A',
                )} to ${moment(getEventDetail?.end_datetime).format(
                  'hh:mm A',
                )}`}
                style={styles.time}
              />
              <View style={[styles.flexRow, {...appStyles.justifyCenter}]}>
                <CustomText
                  text={`Event: ${getEventDetail?.type}`}
                  style={styles.time}
                />
                <GroupImages
                  images={getEventDetail?.coming_users}
                  style={styles.groupImages}
                  onPress={() =>
                    NavService.navigate('EventUsersList', {
                      coming_users: getEventDetail?.coming_users,
                      event_id: eventInfo?.id,
                    })
                  }
                />
              </View>
            </View>
            <FlatList
              contentContainerStyle={styles.flatListCont}
              data={getEventDetail?.request_users}
              showsVerticalScrollIndicator={false}
              ListHeaderComponent={() => {
                return (
                  <CustomText
                    text={screenName == 'EventPosted' ? 'Requests' : 'Guests'}
                    style={styles.requestTitle}
                  />
                );
              }}
              renderItem={({item}) => {
                return (
                  <RequestList
                    item={item}
                    screenName={screenName}
                    handleAccept={() =>
                      this.handleToggleRequest(item, 'accepted')
                    }
                    handleReject={() =>
                      this.handleToggleRequest(item, 'rejected')
                    }
                  />
                );
              }}
              ListEmptyComponent={
                <ListEmptyComponent
                  title={'No event request found'}
                  viewStyle={styles.noMessageView}
                  titleStyle={styles.noMessageTitle}
                />
              }
            />
          </View>
        </ScrollView>
      </AppBackground>
    );
  }
}

const actions = {getEventDetail, deleteCurrentEvent, handelEventRequest};
export default connect(null, actions)(EventDetail);
