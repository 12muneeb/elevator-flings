import React, {Component} from 'react';
import {
  ImageBackground,
  ScrollView,
  View,
  TouchableOpacity,
  Keyboard,
  TextInput,
} from 'react-native';
import {connect} from 'react-redux';
import Toast from 'react-native-toast-message';
import CustomBackground from '../../../components/CustomBackground';
import ImagePicker from '../../../components/ImagePicker';
import {appIcons, appImages} from '../../../assets';
import CustomText from '../../../components/CustomText';
import {colors} from '../../../utils';
import CustomTextInput from '../../../components/CustomTextInput';
import Img from '../../../components/Img';
import CustomButton from '../../../components/CustomButton';
import GooglePlaceAutocomplete from '../../../components/GooglePlaceAutocomplete';
import {updateImagesInGallery} from '../../../utils';
import {addProperties} from '../../../redux/actions/appAction';
import styles from './styles';

class AddNewProperty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      capacity: '',
      lat: '',
      long: '',
      location: '',
      description: '',
      galleryAssets: [],
      hideImage: false,
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
    const {galleryAssets, name, capacity, location, description, lat, long} =
      this.state;
    if (galleryAssets?.length == 0) {
      Toast.show({
        text1: 'Please upload property image',
        type: 'error',
        visibilityTime: 3000,
      });
    } else if (!name) {
      Toast.show({
        text1: "Property name field can't be empty.",
        type: 'error',
        visibilityTime: 3000,
      });
    } else if (!location) {
      Toast.show({
        text1: "Location field can't be empty.",
        type: 'error',
        visibilityTime: 3000,
      });
    } else if (!description) {
      Toast.show({
        text1: "Description field can't be empty.",
        type: 'error',
        visibilityTime: 3000,
      });
    } else if (!capacity) {
      Toast.show({
        text1: "Capacity field can't be empty.",
        type: 'error',
        visibilityTime: 3000,
      });
    } else {
      let payload = new FormData();
      if (galleryAssets?.length) {
        galleryAssets?.map(imageInfo => {
          payload.append('attachments[]', imageInfo);
        });
      }
      payload.append('name', name);
      payload.append('location', location);
      payload.append('latitude', lat);
      payload.append('longitude', long);
      payload.append('description', description);
      payload.append('capicity', capacity);
      Keyboard.dismiss();
      this.props.addProperties(payload);
    }
  };
  render() {
    const {name, capacity, description, galleryAssets, hideImage} = this.state;
    const handelClose = image => {
      const deleteImage = galleryAssets.filter(item => item?.uri !== image);
      this.setState({galleryAssets: deleteImage});
    };
    const callBackForGalleryAssets = galleryAssets => {
      this.setState({galleryAssets});
    };

    return (
      <CustomBackground showLogo={false} titleText={'Add New Property'}>
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
            <ScrollView
              showsHorizontalScrollIndicator={false}
              style={styles.mainCont}
              horizontal={true}>
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

          <View>
            <CustomTextInput
              placeholder={'Property Name'}
              value={name}
              onChangeText={value => this.setState({name: value})}
              containerStyle={styles.input}
              maxLength={30}
            />
            <GooglePlaceAutocomplete
              placeholder={'Location'}
              backgroundColor={colors.lightGray}
              callback={this.callback}
            />
            <TextInput
              textAlignVertical="top"
              placeholder={'Description'}
              placeholderTextColor={'#000'}
              value={description}
              onChangeText={value => this.setState({description: value})}
              style={styles.dec}
              multiline
              maxLength={275}
            />
            <CustomTextInput
              placeholder={'Capacity'}
              value={capacity}
              onChangeText={value => this.setState({capacity: value})}
              containerStyle={styles.input}
              keyboardType="number-pad"
              maxLength={6}
            />
            <CustomButton
              title="Create"
              onPress={this.onSubmit}
              buttonStyle={styles.btnStyle}
              textStyle={styles.btnTitle}
            />
          </View>
        </View>
      </CustomBackground>
    );
  }
}
const actions = {addProperties};
export default connect(null, actions)(AddNewProperty);
