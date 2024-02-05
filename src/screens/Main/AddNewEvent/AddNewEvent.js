import React, {Component} from 'react';
import {
  ImageBackground,
  ScrollView,
  View,
  TouchableOpacity,
  Keyboard,TextInput
} from 'react-native';
import Toast from 'react-native-toast-message';
import moment from 'moment';
import {connect} from 'react-redux';
import CustomBackground from '../../../components/CustomBackground';
import ImagePicker from '../../../components/ImagePicker';
import CustomText from '../../../components/CustomText';
import {colors} from '../../../utils';
import CustomTextInput from '../../../components/CustomTextInput';
import Img from '../../../components/Img';
import CustomButton from '../../../components/CustomButton';
import DropDownPicker from '../../../components/DropDownPicker';
import DateTimePicker from '../../../components/DateTimePicker';
import {appIcons, appImages} from '../../../assets';
import {updateImagesInGallery} from '../../../utils';
import {
  getListCategory,
  addEvent,
  getProperties,
} from '../../../redux/actions/appAction';
import styles from './styles';

class AddNewEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      galleryAssets: [],
      title: '',
      selectProperty: '',
      to: '',
      from: '',
      selectCategory: '',
      selectEventCategories: '',
      description: '',
      isDatePickerVisible: false,
      openPickerFor: '',
      hideImage: false,
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
    this.focusListener();
    Keyboard.dismiss();
  }
  onSubmit = () => {
    const {
      title,
      to,
      from,
      selectProperty,
      selectCategory,
      selectEventCategories,
      description,
      galleryAssets,
    } = this.state;

    if (galleryAssets?.length == 0) {
      Toast.show({
        text1: 'Please upload event image',
        type: 'error',
        visibilityTime: 3000,
      });
    } else if (!title) {
      Toast.show({
        text1: "Event name field can't be empty.",
        type: 'error',
        visibilityTime: 3000,
      });
    } else if (!selectProperty) {
      Toast.show({
        text1: "Property field can't be empty.",
        type: 'error',
        visibilityTime: 3000,
      });
    } else if (!to) {
      Toast.show({
        text1: "Time (to) field can't be empty.",
        type: 'error',
        visibilityTime: 3000,
      });
    } else if (!from) {
      Toast.show({
        text1: "Time (from) field can't be empty.",
        type: 'error',
        visibilityTime: 3000,
      });
    } else if (!selectCategory) {
      Toast.show({
        text1: "Category field can't be empty.",
        type: 'error',
        visibilityTime: 3000,
      });
    } else if (!selectEventCategories) {
      Toast.show({
        text1: "Event categories field can't be empty",
        type: 'error',
        visibilityTime: 3000,
      });
    } else if (!description) {
      Toast.show({
        text1: "Description field can't be empty",
        type: 'error',
        visibilityTime: 3000,
      });
    } else {
      let payload = new FormData();
      if (galleryAssets?.length > 0) {
        galleryAssets?.map(imageInfo => {
          payload.append('attachments[]', imageInfo);
        });
      }
      payload.append('title', title);
      payload.append('latitude', selectProperty?.latitude);
      payload.append('longitude', selectProperty?.longitude);
      payload.append('description', description);
      payload.append('location', selectProperty?.location);
      payload.append('start_datetime', to);
      payload.append('end_datetime', from);
      payload.append('type', selectCategory);
      payload.append('category', selectEventCategories?.id);
      payload.append('property_id', selectProperty?.id);
      payload.append('capacity', selectProperty?.capicity);
      Keyboard.dismiss();
      console.log('payload', payload);
      this.props.addEvent(payload);
    }
  };

  eventPriority = ['Public', 'Private'];

  render() {
    const {
      eventCategories,
      hideImage,
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
      dropdownProperties,
      dropdownEvents,
    } = this.state;
    const showDatePicker = value => {
      this.setState({isDatePickerVisible: true, openPickerFor: value});
    };

    const hideDatePicker = () => {
      this.setState({isDatePickerVisible: false});
    };

    const handleConfirm = date => {
      if (this.state.openPickerFor == 'from') {
        this.setState({from: moment(date).format('Y-MM-DD HH:mm:ss')});
      } else {
        this.setState({to: moment(date).format('Y-MM-DD HH:mm:ss')});
      }
      hideDatePicker();
    };

    const handelClose = image => {
      const deleteImage = galleryAssets.filter(item => item?.uri !== image);
      this.setState({galleryAssets: deleteImage});
    };
    const callBackForGalleryAssets = galleryAssets => {
      this.setState({galleryAssets});
    };
    return (
      <CustomBackground showLogo={false} titleText={'Add New Event'}>
        <View style={styles.mainView}>
          <ImagePicker
            isMultiple={true}
            onImageChange={(path, mime, type) => {
              updateImagesInGallery(
                path,
                mime,
                type,
                galleryAssets,
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
            <ScrollView showsHorizontalScrollIndicator={false} style={styles.mainCont} horizontal={true}>
              <>
                {galleryAssets?.map((image, index) => {
                  return (
                    <View key={index + 1} style={styles.viewstyle2}>
                      <TouchableOpacity activeOpacity={0.9}>
                        <ImageBackground
                          source={{uri: image?.uri}}
                          style={hideImage ? styles.hide : styles.images}
                          imageStyle={{borderRadius: 10}}>
                          <TouchableOpacity
                            style={styles.closeIconCont}
                            onPress={() => handelClose(image?.uri)}>
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
            value={title}
            onChangeText={value => this.setState({title: value})}
            containerStyle={styles.input}
            maxLength={30}
          />
          {dropdownProperties?.length ? (
            <DropDownPicker
              schema={{
                color: 'black',
              }}
              title={'Select Property'}
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
              }}
              titleStyle={styles.dropdownTitle}
            />
          ) : null}

          <View style={[styles.flexRow, styles.timeMainCont]}>
            <TouchableOpacity
              style={[styles.flexRow, styles.timeCont]}
              onPress={() => showDatePicker('to')}>
              <CustomText text={`From: ${to}`} style={styles.timeTitle} />
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.flexRow, styles.timeCont]}
              onPress={() => showDatePicker('from')}>
              <CustomText text={`To: ${from}`} style={styles.timeTitle} />
            </TouchableOpacity>
          </View>

          <DropDownPicker
            schema={{
              color: 'white',
            }}
            title={'Public/Private'}
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
              title={'Event Categories'}
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
            onChangeText={value => this.setState({description: value})}
            style={styles.dec}
            multiline
            placeholderTextColor={'#000'}
            maxLength={275}
          />
          <CustomButton
            title="Create"
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

const actions = {getListCategory, addEvent, getProperties};
export default connect(null, actions)(AddNewEvent);
