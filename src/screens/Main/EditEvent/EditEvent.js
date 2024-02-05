import React, {Component} from 'react';
import {
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  View,
  Keyboard,
  TextInput,
  Platform,
} from 'react-native';
import {connect} from 'react-redux';
import Toast from 'react-native-toast-message';
import moment from 'moment';
import CustomBackground from '../../../components/CustomBackground';
import ImagePicker from '../../../components/ImagePicker';
import {appIcons, appImages} from '../../../assets';
import CustomText from '../../../components/CustomText';
import {colors} from '../../../utils';
import CustomTextInput from '../../../components/CustomTextInput';
import Img from '../../../components/Img';
import CustomButton from '../../../components/CustomButton';
import DropDownPicker from '../../../components/DropDownPicker';
import DateTimePicker from '../../../components/DateTimePicker';
import {
  getListCategory,
  getProperties,
  updateEvent,
} from '../../../redux/actions/appAction';
import {ASSETS_URL} from '../../../config/WebService';
import {updateImagesInGallery} from '../../../utils';
import styles from './styles';
class EditEvent extends Component {
  constructor(props) {
    super(props);
    const params = this?.props?.route?.params?.eventInfo;
    this.state = {
      galleryAssets: params?.attachment?.length > 0 ? params?.attachment : [],
      attachments: [],
      attachment_deleted_ids: [],
      title: undefined,
      selectProperty: '',
      to: '',
      from: '',
      selectCategory: '',
      selectEventCategories: '',
      description: undefined,
      isDatePickerVisible: false,
      openPickerFor: '',
      eventCategories: [],
      properties: [],
      dropdownProperties: [],
      dropdownEvents: [],
    };
  }
  componentDidMount() {
    this.focusListener = this.props.navigation.addListener('focus', () => {
      this.props.getListCategory(async data => {
        if (data) {
          let saturatedEvents = [];
          let result = await data?.map((event, index) => {
            saturatedEvents.push(event?.title);
          });
          await Promise.all([result]);
          this.setState({
            eventCategories: data,
            dropdownEvents: saturatedEvents,
          });
        } else {
          this.setState({eventCategories: null, dropdownEvents: []});
        }
      });
      this.fetchProperties();
    });
  }
  fetchProperties = () => {
    const params = {
      key: 'type',
      value: 'all',
    };
    this.props?.getProperties(params, true, async data => {
      if (data?.length > 0) {
        let saturatedProperties = [];
        let result = await data?.map((property, index) => {
          saturatedProperties.push(property?.name);
        });
        await Promise.all([result]);
        this.setState({
          properties: data,
          dropdownProperties: saturatedProperties,
        });
      } else {
        this.setState({properties: [], dropdownProperties: []});
      }
    });
  };
  componentWillUnmount() {
    this.showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      Keyboard.dismiss;
    });
    this.hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      Keyboard.dismiss;
    });
    this.focusListener();
  }
  onSubmit = () => {
    const {
      attachments,
      attachment_deleted_ids,
      title,
      selectProperty,
      to,
      from,
      selectCategory,
      selectEventCategories,
      description,
    } = this.state;
    const params = this?.props?.route?.params?.eventInfo;
    if (
      attachments?.length == 0 &&
      attachment_deleted_ids?.length == 0 &&
      title == undefined &&
      selectProperty == '' &&
      to == '' &&
      from == '' &&
      selectCategory == '' &&
      selectEventCategories == '' &&
      description == ''
    ) {
      return Toast.show({
        text1: 'Please update any field for save changes',
        type: 'error',
        visibilityTime: 3000,
      });
    } else {
      let payload = new FormData();
      payload.append('event_id', params?.id);
      if (attachments?.length > 0) {
        attachments?.map(imageInfo => {
          payload.append('attachments[]', imageInfo);
        });
      }
      if (attachment_deleted_ids?.length > 0) {
        attachment_deleted_ids?.map(imageInfo => {
          payload.append('attachment_deleted_ids[]', imageInfo);
        });
      }
      if (title !== undefined) {
        payload.append('title', title);
      }
      if (selectProperty !== '') {
        payload.append('property_id', selectProperty?.id);
        payload.append('capacity', selectProperty?.capicity);
      }
      if (to !== '') {
        payload.append('start_datetime', to);
      }
      if (from !== '') {
        payload.append('end_datetime', from);
      }
      if (selectCategory !== '') {
        payload.append('type', selectCategory);
      }
      if (selectEventCategories !== '') {
        payload.append('category', selectEventCategories?.id);
      }
      if (description !== undefined) {
        payload.append('description', description);
      }
      Keyboard.dismiss();
      console.log('payload', payload);
      this.props.updateEvent(payload);
    }
  };

  eventPriority = ['Public', 'Private'];

  render() {
    const {
      eventCategories,
      title,
      to,
      from,
      selectProperty,
      selectCategory,
      selectEventCategories,
      description,
      isDatePickerVisible,
      galleryAssets,
      properties,
      attachments,
      attachment_deleted_ids,
      dropdownProperties,
      dropdownEvents,
    } = this.state;
    const params = this?.props?.route?.params?.eventInfo;
    const showDatePicker = value => {
      this.setState({isDatePickerVisible: true, openPickerFor: value});
    };

    const hideDatePicker = () => {
      this.setState({isDatePickerVisible: false});
    };

    const handleConfirm = date => {
      console.log('date===date', moment(date).format('Y-MM-DD HH:mm:ss'));
      if (this.state.openPickerFor == 'from') {
        this.setState({from: moment(date).format('Y-MM-DD HH:mm:ss')});
      } else {
        this.setState({to: moment(date).format('Y-MM-DD HH:mm:ss')});
      }
      hideDatePicker();
    };

    const handelClose = (image, imageDeletedId) => {
      const deleteImage = galleryAssets.filter(
        item => item?.attachment !== image,
      );
      this.setState({galleryAssets: deleteImage});
      if (imageDeletedId) {
        const existingDeletedImages = attachment_deleted_ids;
        existingDeletedImages.push(imageDeletedId);
        this.setState({attachment_deleted_ids: existingDeletedImages});
      }
    };
    const callBackForGalleryAssets = assets => {
      this.setState({
        attachments: assets,
        galleryAssets: [...galleryAssets, ...assets],
      });
    };

    return (
      <CustomBackground showLogo={false} titleText={'Edit Event'}>
        <View
          style={{
            marginTop: '10%',
            paddingHorizontal: Platform.OS == 'ios' ? 0 : 20,
          }}>
          <ImagePicker
            isMultiple={true}
            onImageChange={(path, mime, type) => {
              updateImagesInGallery(
                path,
                mime,
                type,
                attachments,
                callBackForGalleryAssets,
              );
            }}>
            <View style={styles.imageBtn}>
              <ImageBackground
                source={appImages.placeholder}
                style={styles.propertyImage}
                resizeMode="cover">
                <Img
                  local
                  src={appIcons.upload}
                  style={styles.uploadIcon}
                  resizeMode={'contain'}
                  tintColor={colors.secondary}
                />

                <CustomText
                  text={
                    galleryAssets.length > 0
                      ? 'Add More Images'
                      : 'Upload Image'
                  }
                  style={styles.uploadImageTitle}
                />
              </ImageBackground>
            </View>
          </ImagePicker>

          {galleryAssets?.length > 0 ? (
            <ScrollView
              showsHorizontalScrollIndicator={false}
              style={styles.mainCont}
              horizontal={true}>
              <>
                {galleryAssets?.map((image, index) => {
                  return (
                    <View key={index + 1}>
                      <TouchableOpacity activeOpacity={0.9}>
                        <ImageBackground
                          source={{
                            uri: image?.attachment?.includes('/storage')
                              ? ASSETS_URL + image?.attachment
                              : image?.uri,
                          }}
                          style={styles.images}
                          imageStyle={{borderRadius: 10}}>
                          <TouchableOpacity
                            style={styles.closeIconCont}
                            activeOpacity={0.9}
                            onPress={() =>
                              handelClose(
                                image?.uri ? image?.uri : image?.attachment,
                                image?.id,
                              )
                            }>
                            <Img
                              local
                              src={appIcons.close}
                              style={styles.closeIcon}
                              resizeMode={'contain'}
                              tintColor={colors.white}
                            />
                          </TouchableOpacity>
                        </ImageBackground>
                      </TouchableOpacity>
                    </View>
                  );
                })}
              </>
            </ScrollView>
          ) : null}

          <CustomTextInput
            placeholder={'Event Name'}
            defaultValue={params?.title}
            value={title}
            onChangeText={value => this.setState({title: value})}
            containerStyle={styles.input}
            maxLength={30}
          />
          {dropdownProperties?.length > 0 ? (
            <DropDownPicker
              schema={{
                color: 'black',
              }}
              title={params?.property ? params?.property?.name : 'Property'}
              color={'black'}
              value={selectProperty?.name}
              data={dropdownProperties}
              placeHolderColor={colors.black}
              containerStyle={[styles.flexRow, styles.DropDownCont]}
              onSelected={(key, value) => {
                const findCurrentSelectedProperty = properties?.filter(
                  (property, index) => property?.name == value,
                );
                this.setState({selectProperty: findCurrentSelectedProperty[0]});
                Keyboard.dismiss;
              }}
              titleStyle={styles.dropdownTitle}
            />
          ) : null}
          <View style={[styles.flexRow, styles.timeMainCont]}>
            <TouchableOpacity
              style={[styles.flexRow, styles.timeCont]}
              onPress={() => showDatePicker('to')}>
              <CustomText
                text={`From: ${
                  !to
                    ? moment(params?.start_datetime).format('Y-MM-DD HH:mm:ss')
                    : to
                }`}
                style={styles.timeTitle}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.flexRow, styles.timeCont]}
              onPress={() => showDatePicker('from')}>
              <CustomText
                text={`To: ${
                  !from
                    ? moment(params?.end_datetime).format('Y-MM-DD HH:mm:ss')
                    : from
                }`}
                style={styles.timeTitle}
              />
            </TouchableOpacity>
          </View>
          <DropDownPicker
            schema={{
              color: 'white',
            }}
            title={params?.type ? params?.type : 'Public/Private'}
            color={'black'}
            value={selectCategory}
            data={this.eventPriority}
            placeHolderColor={colors.black}
            containerStyle={[styles.flexRow, styles.DropDownCont]}
            onSelected={(key, value) =>
              this.setState({selectCategory: String(value)?.toLowerCase()})
            }
            titleStyle={styles.dropdownTitle}
          />
          {dropdownEvents?.length > 0 ? (
            <DropDownPicker
              schema={{
                color: 'white',
              }}
              title={
                params?.category ? params?.category?.title : 'Event Categories'
              }
              color={'black'}
              value={selectEventCategories?.title}
              data={dropdownEvents}
              placeHolderColor={colors.black}
              containerStyle={[styles.flexRow, styles.DropDownCont]}
              onSelected={(key, value) => {
                const findCurrentSelectedEvent = eventCategories?.filter(
                  (property, index) => property?.title == value,
                );
                this.setState({
                  selectEventCategories: findCurrentSelectedEvent[0],
                });
              }}
              titleStyle={styles.dropdownTitle}
            />
          ) : null}
          <TextInput
            textAlignVertical="top"
            placeholder={'Description'}
            value={description}
            defaultValue={params?.description}
            onChangeText={value => this.setState({description: value})}
            style={styles.dec}
            multiline
            placeholderTextColor={'#000'}
            maxLength={275}
          />
          <CustomButton
            title="Save Changes"
            onPress={this.onSubmit}
            buttonStyle={styles.btnStyle}
            textStyle={styles.btnTitle}
          />
          <DateTimePicker
            maximumDate={new Date()}
            isDatePickerVisible={isDatePickerVisible}
            handleConfirm={handleConfirm}
            hideDatePicker={hideDatePicker}
          />
        </View>
      </CustomBackground>
    );
  }
}

const actions = {getListCategory, getProperties, updateEvent};
export default connect(null, actions)(EditEvent);
