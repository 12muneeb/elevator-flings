import React, {Component} from 'react';
import {
  FlatList,
  ScrollView,
  View,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import {connect} from 'react-redux';
import AppBackground from '../../../components/AppBackground';
import Img from '../../../components/Img';
import {appIcons} from '../../../assets';
import CarouselComponent from '../../../components/CarouselComponent';
import ListEmptyComponent from '../../../components/ListEmptyComponent';
import CustomText from '../../../components/CustomText';
import NavService from '../../../helpers/NavService';
import {
  deleteCurrentProperty,
  getPropertyDetail,
} from '../../../redux/actions/appAction';
import {openLink} from '../../../helpers/BrowserUrl';
import {ASSETS_URL, GOOGLE_MAPS_URL} from '../../../config/WebService';
import styles from './styles';
class PropertyDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      propertyDetails: null,
      refreshing: false,
    };
  }
  componentDidMount() {
    this.focusListener = this.props.navigation.addListener('focus', () => {
      this.fetchPropertyDetails();
    });
  }
  componentWillUnmount() {
    this.focusListener();
  }
  fetchPropertyDetails = () => {
    const propertyId = this?.props?.route?.params?.propertyInfo?.id;
    const params = {
      key: 'property_id',
      value: propertyId,
    };
    this.props?.getPropertyDetail(params, data => {
      if (data) {
        this.setState({propertyDetails: data});
      } else {
        this.setState({propertyDetails: null});
      }
    });
  };
  deleteProperty = () => {
    const propertyId = this?.props?.route?.params?.propertyInfo?.id;
    const params = {
      key: 'property_id',
      value: propertyId,
    };
    this?.props?.deleteCurrentProperty(params);
  };
  render() {
    const propertyInfo = this?.props?.route?.params?.propertyInfo;
    const {propertyDetails, refreshing} = this.state;
    const Images = ({item}) => {
      return (
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() =>
            NavService.navigate('EventDetail', {
              screenName: 'EventPosted',
              eventInfo: item,
            })
          }>
          <Img
            local={false}
            src={ASSETS_URL + item?.attachment[0]?.attachment}
            style={styles.eventImages}
            resizeMode={'contain'}
          />
          <CustomText text={item?.title} style={styles.content} />
        </TouchableOpacity>
      );
    };
    return (
      <AppBackground title={'Property Detail'} back marginHorizontal={false}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={async () => {
                this.setState({refreshing: true});
                await this.fetchPropertyDetails();
                this.setState({refreshing: false});
              }}
            />
          }>
          <View style={styles.mainCont}>
            <CarouselComponent
              carouselImages={propertyInfo?.attachment}
              onEditPress={() =>
                NavService.navigate('EditProperty', {propertyInfo})
              }
              onDeletePress={this.deleteProperty}
              screenName={'Property Detail'}
            />
            <View style={[styles.flexRow, styles.headingCont]}>
              <CustomText text={propertyDetails?.name} style={styles.heading} />
              <CustomText
                text={`${propertyDetails?.capicity}, Capacity`}
                style={styles.content}
              />
            </View>
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() =>
                openLink(
                  GOOGLE_MAPS_URL +
                    `${propertyDetails?.longitude},${propertyDetails?.latitude}`,
                )
              }
              style={[styles.flexRow, styles.contentCont]}>
              <Img local src={appIcons.marker} style={styles.markerIcon} />
              <CustomText
                text={propertyDetails?.location}
                style={styles.content}
              />
            </TouchableOpacity>
            <CustomText
              text={propertyDetails?.description}
              style={styles.description}
            />
            <View style={styles.horizontalLine} />
            <CustomText text={'Past Event'} style={styles.pastEventTitle} />
            <FlatList
              contentContainerStyle={styles.flatListCont}
              showsHorizontalScrollIndicator={false}
              horizontal
              data={propertyDetails?.events}
              keyExtractor={(item, index) => index?.toString()}
              renderItem={({item}) => <Images item={item} />}
              ListEmptyComponent={
                <ListEmptyComponent
                  title={'No past event found'}
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
const actions = {getPropertyDetail, deleteCurrentProperty};
export default connect(null, actions)(PropertyDetail);
