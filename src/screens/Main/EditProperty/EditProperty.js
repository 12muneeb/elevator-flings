import React, {Component} from 'react';
import {
  ImageBackground,
  ScrollView,
  View,
  TouchableOpacity,
  Keyboard,TextInput
} from 'react-native';
import {connect} from 'react-redux';
import Toast from 'react-native-toast-message';
import CustomBackground from '../../../components/CustomBackground';
import ImagePicker from '../../../components/ImagePicker';
import CustomText from '../../../components/CustomText';
import CustomTextInput from '../../../components/CustomTextInput';
import CustomButton from '../../../components/CustomButton';
import Img from '../../../components/Img';
import GooglePlaceAutocomplete from '../../../components/GooglePlaceAutocomplete';
import {ASSETS_URL} from '../../../config/WebService';
import {updateProperties} from '../../../redux/actions/appAction';
import {appIcons, appImages} from '../../../assets';
import {colors} from '../../../utils';
import {updateImagesInGallery} from '../../../utils';
import styles from './styles';

class EditProperty extends Component {
  constructor(props) {
    super(props);
    const params = this?.props?.route?.params?.propertyInfo;
    this.state = {
      name: undefined,
      capacity: undefined,
      lat: '',
      long: '',
      location: '',
      description: undefined,
      galleryAssets: params?.attachment?.length > 0 ? params?.attachment : [],
      attachments: [],
      attachment_deleted_ids: [],
    };
  }
  // ADDRESS
  callback = (address, geometry) => {
    this.setState({
      location: address,
      long: geometry?.location.lng,
      lat: geometry?.location.lat,
    });
  };

  onSubmit = () => {
    const {
      name,
      capacity,
      location,
      description,
      lat,
      long,
      attachments,
      attachment_deleted_ids,
    } = this.state;

    const params = this?.props?.route?.params?.propertyInfo;
    if (
      attachments?.length == 0 &&
      attachment_deleted_ids?.length == 0 &&
      name == undefined &&
      capacity == undefined &&
      location == '' &&
      description == undefined
    ) {
      return Toast.show({
        text1: 'Please update any field for save changes',
        type: 'error',
        visibilityTime: 3000,
      });
    } else {
      let payload = new FormData();
      payload.append('property_id', params?.id);
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
      if (name !== undefined) {
        payload.append('name', name);
      }
      if (capacity !== undefined) {
        payload.append('capicity', capacity);
      }
      if (location !== '') {
        payload.append('location', location);
        payload.append('latitude', lat);
        payload.append('longitude', long);
      }
      if (description !== undefined) {
        payload.append('description', description);
      }
      Keyboard.dismiss();
      this.props.updateProperties(payload);
    }
  };

  render() {
    const {
      name,
      capacity,
      description,
      location,
      galleryAssets,
      attachment_deleted_ids,
      attachments,
    } = this.state;
    const params = this?.props?.route?.params?.propertyInfo;
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
      <CustomBackground showLogo={false} titleText={'Edit Property'}>
        <View style={styles.mainView}>
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
            <ScrollView showsHorizontalScrollIndicator={false} style={styles.mainCont} horizontal={true}>
              <>
                {galleryAssets?.map((image, index) => {
                  return (
                    <View key={index + 1} style={styles.viewstyle2}>
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
            placeholder={'Property Name'}
            defaultValue={params?.name}
            value={name}
            onChangeText={value => this.setState({name: value})}
            containerStyle={styles.input}
            maxLength={40}
          />
          <CustomTextInput
            placeholder={'Capacity'}
            defaultValue={params?.capicity}
            value={capacity}
            onChangeText={value => this.setState({capacity: value})}
            containerStyle={styles.input}
            keyboardType="number-pad"
            maxLength={6}
          />
          <GooglePlaceAutocomplete
            placeholder={params?.location ? params?.location : 'Location'}
            backgroundColor={colors.lightGray}
            callback={() => this.callback(formatted_address, geometry)}
          />
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
        </View>
      </CustomBackground>
    );
  }
}

const actions = {updateProperties};
export default connect(null, actions)(EditProperty);
