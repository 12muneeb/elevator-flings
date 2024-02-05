import { StyleSheet } from 'react-native';
import { colors} from '../../../utils';
import appStyles from '../../appStyles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
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
    marginBottom: 20,
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
    backgroundColor: '#313131',
    borderColor: colors.white,
    borderWidth: 1,
  },

  profileImg: {
    width: 80,
    height: 60,
    resizeMode: "contain",
    tintColor:colors.darkGray
  },

  uploadIconCont: {
    position: "absolute",
    width: 30,
    height: 30,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 80,
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
    backgroundColor:'red'
  },

  signUpBtn: {
    borderRadius: 26,
    marginTop: 15,
    marginBottom:16
  },

  signUpTitle: {
    ...appStyles.font16,
    ...appStyles.family_SofiaPro_Regular,
  },
});

export default styles;
