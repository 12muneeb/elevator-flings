import React from 'react';
import {
  Image,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  View,
  StyleSheet, Text
} from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { appIcons, appImages } from '../assets';
import NavService from '../helpers/NavService';
import Logo from './Logo';
import { colors } from '../utils';
import appStyles from '../screens/appStyles';
import CustomText from './CustomText';

export default ({ children, showLogo = true, back = true, title = true, titleText, onBack = null, skip, onSkip }) => {
  return (
    <ImageBackground source={appImages.backgroundImage} style={{ flex: 1, backgroundColor: colors.white }}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        bounces={false}
        showsVerticalScrollIndicator={false}
        style={{ flex: 1, backgroundColor: colors.background }}
        contentContainerStyle={{
          alignItems: 'center',
          flexGrow: 1,
          paddingBottom: "10%",
          // paddingTop: showLogo ? 0 : getStatusBarHeight(),
        }}>
        {back && (
          <TouchableOpacity
            onPress={() => {
              if (onBack != null) {
                onBack();
              } else {
                NavService.goBack();
              }
            }}
            style={{
              position: 'absolute',
              zIndex: 99,
              top: getStatusBarHeight() + 10,
              left: 20,
            }}>
            <Image
              source={appIcons.backIcon}
              style={{ width: 25, height: 25, resizeMode: 'contain' }}
            />
          </TouchableOpacity>
        )}
        {skip && (
          <TouchableOpacity
            onPress={onSkip}
            style={{
              position: 'absolute',
              zIndex: 99,
              top: getStatusBarHeight() + 10,
              right: 20,
            }}>
            <CustomText text='Skip' color={colors.white} />
          </TouchableOpacity>
        )}
        {title && (
          <View>
            <Text style={styles.headerSignInText}>{titleText}</Text>
          </View>
        )}
        {showLogo && (
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Logo size={220} />
          </View>
        )}
        <View style={{ flex:1,width:'100%',alignSelf:'center' }}>{children}</View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  headerSignInText: {
    ...appStyles.font16,
    ...appStyles.family_SofiaPro_Regular,
    color: colors.white,
    textAlign: "center",
    top: getStatusBarHeight() + 10

  },
  headerContainer: { paddingVertical: 12, flexDirection: "row", alignItems: "center", justifyContent: "center" },

  backButtonContainer: { position: "absolute", left: 10, flexDirection: "row", alignItems: "center", },
  imageStyle: { width: 25, height: 25, tintColor: "#9c9c9c" },

})