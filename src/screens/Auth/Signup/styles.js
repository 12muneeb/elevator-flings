import { StyleSheet } from 'react-native';
import { colors } from '../../../utils';
import appStyles from '../../appStyles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
    paddingTop: 10
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.black,
    marginVertical: '8%',
  },
  bottomView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    // marginBottom: 20,
  },
  subText: {
    ...appStyles.font13,
    ...appStyles.family_SofiaPro_Regular,
    color: colors.black,
    marginVertical: 25,
    textDecorationLine: "underline",
  },
  textNormal: {
    ...appStyles.font14,
    color: colors.black,
    ...appStyles.family_SofiaPro_Regular,
  },
  textNormalWithColor: {
    color: colors.primary,
    textDecorationColor: colors.primary,
    ...appStyles.font14,
    ...appStyles.family_SofiaPro_Regular,
    textDecorationLine: "underline",
  },

  profileImgView: {
    backgroundColor: colors.black,
    borderColor: colors.secondary,
    borderWidth: 2,
  },

  profileImg: {
    width: 80,
    height: 60,
    resizeMode: "contain"
  },

  uploadIconCont: {
    position: "absolute",
    width: 30,
    height: 30,
    backgroundColor: colors.secondary,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
    borderColor: colors.white,
    borderWidth: 1,
    right: 10,
    bottom: 55
  },

  uploadIcon: {
    width: 12,
    height: 12,
  },

  bussinessProfileImage: {
    ...appStyles.w100,
    ...appStyles.alignCenter,
    ...appStyles.justifyCenter,
    height: '100%',
  },

  signUpBtn: {
    borderRadius: 26,
    marginTop: 15,
    marginBottom: 16
  },

  signUpTitle: {
    ...appStyles.font16,
    ...appStyles.family_SofiaPro_Regular,
  },
  appLogo: {
    width: 150,
    height: 150,
    resizeMode: "contain",
    marginTop: "12%"
  },
  content: { alignItems: 'center' },
  subcontent: {
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical:10
  },
  textStyle: {
    textDecorationLine: 'underline',
  },
  img: {
    width: 25, height: 25,
  },
  imgtouchable: {
    borderWidth: 4,
    padding: 10,
    borderRadius: 25,
    borderColor: '#36393F'

  },
  bottomcontainer: { alignItems: 'center',marginTop:10 },
  imagecontainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 200,
    justifyContent: 'space-around',
    marginTop: 15

  }
});

export default styles;
