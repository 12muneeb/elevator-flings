import {
  Dimensions,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useRef, useState} from 'react';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import Img from './Img';
import appStyles from '../screens/appStyles';
import {appIcons} from '../assets';
import {colors} from '../utils';
import Shadows from '../helpers/Shadows';
import ConfirmationModal from '../containers/Modal/ConfirmationModal';
import NavService from '../helpers/NavService';
import {ASSETS_URL} from '../config/WebService';
const {width} = Dimensions.get('screen');
const vh = Dimensions.get('window').height * 0.01;

const CarouselComponent = ({
  carouselImages,
  joined,
  onEditPress,
  onDeletePress,
  onMessagePress,
  message,
  screenName,
}) => {
  const [activeSlidePortfolio, setActiveSlidePortfolio] = useState(0); // Use state to track the active slide index
  const [modalVisible, setModalVisible] = useState(false);
  let portfolio_carousel = useRef(null);
  const pagination = (data, activeSlides) => {
    const numberOfDots = data?.length;
    if (numberOfDots == 1) return <View style={{height: 20}} />;
    return (
      <Pagination
        dotsLength={numberOfDots}
        activeDotIndex={activeSlides}
        dotStyle={[styles.dotStyle]}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
        tappableDots={true}
        containerStyle={{
          position: 'absolute',
          width: 4,
          // backgroundColor:"red",
          alignItems: 'center',
          alignSelf: 'center',
          top: 190,
        }}
        inactiveDotStyle={{
          borderWidth: 0,
          backgroundColor: colors.darkGray,
        }}
      />
    );
  };
  const renderItem = ({item}) => {
    return (
      <ImageBackground
        source={
          item?.image
            ? item?.image
            : item?.attachment
            ? {uri: ASSETS_URL + item?.attachment}
            : item?.image
        }
        style={[
          styles.imageView,
          {
            justifyContent:
              screenName == 'PastEvents' ? 'flex-end' : 'flex-start',
            paddingBottom: screenName == 'PastEvents' ? 8 : 0,
          },
        ]}>
        {screenName != 'PastEvents' ? (
          <>
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={onEditPress}
              style={styles.btn}>
              <Img
                local
                src={appIcons.edit}
                style={styles.icon}
                resizeMode={'contain'}
              />
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => setModalVisible(!modalVisible)}
              style={styles.btn}>
              <Img
                local
                src={appIcons.delete}
                style={styles.icon}
                resizeMode={'contain'}
              />
            </TouchableOpacity>
          </>
        ) : null}

        {message && (
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={onMessagePress}
            style={styles.btn}>
            <Img
              local
              src={appIcons.message}
              style={styles.icon}
              resizeMode={'contain'}
            />
          </TouchableOpacity>
        )}
      </ImageBackground>
    );
  };
  return (
    <View>
      <View style={styles.CarouselView}>
        <Carousel
          ref={c => {
            portfolio_carousel = c;
          }}
          data={carouselImages}
          renderItem={item => renderItem(item)}
          sliderWidth={width}
          itemWidth={width}
          onSnapToItem={index => setActiveSlidePortfolio(index)}
          contentContainerCustomStyle={styles.carouselStyle}
        />
      </View>

      {!joined &&
        carouselImages?.length > 0 &&
        pagination(carouselImages, activeSlidePortfolio)}

      <ConfirmationModal
        isModalVisible={modalVisible}
        togglePopup={() => setModalVisible(!modalVisible)}
        Title={'Are you Sure?'}
        SubTitle={
          screenName == 'EventPosted' || screenName == 'PastEvents'
            ? 'Do you really want to delete the event? This process cannot be undone.'
            : 'Do you really want to delete the property? This process cannot be undone.'
        }
        confirmationPopUp
        screenName={screenName}
        btnTitle={'Delete'}
        onPress={() => {
          setModalVisible(!modalVisible);
          onDeletePress();
        }}
      />
    </View>
  );
};

export default CarouselComponent;

const styles = StyleSheet.create({
  CarouselView: {
    marginBottom: 40,
  },

  imageView: {
    height: 25 * vh,
    overflow: 'hidden',
    ...appStyles.w_90,
    borderRadius: 10,
    alignItems: 'flex-end',
    paddingHorizontal: 10,
  },
  dotStyle: {
    width: 12,
    height: 12,
    borderRadius: 100,
    borderColor: colors.secondary,
    borderWidth: 1,
    backgroundColor: 'transparent',
    position: 'absolute',
  },

  btn: {
    ...Shadows.shadow3,
    ...appStyles.alignCenter,
    ...appStyles.justifyCenter,
    width: 30,
    height: 30,
    marginTop: 10,
    backgroundColor: colors.white,
    borderRadius: 6,
  },

  icon: {
    width: 13,
    height: 13,
  },
});
