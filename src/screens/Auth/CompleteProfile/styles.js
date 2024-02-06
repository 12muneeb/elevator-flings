import { StyleSheet } from 'react-native';
import { colors, family, size} from '../../../utils';
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
    borderColor: '#A0A0A1',
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
    right: 8,
    bottom: 5
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
  dropdown:{
    height:55,
    backgroundColor:colors.gray,
    borderWidth:0,
  },
  dropdownIcon: {width: 20, height: 20,tintColor:colors.lightGray},
  label:{
    fontSize:size.small,
    fontFamily:family.SofiaProBold,
  },
  inputlabel:
    {color:colors.lightGray,fontSize:size.normal}
  
});

export default styles;
