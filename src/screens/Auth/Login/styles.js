import { StyleSheet, Dimensions } from 'react-native';
import { colors, HP, WP, size, family } from '../../../utils';
import appStyles from '../../appStyles';
const { width, height } = Dimensions.get('window');
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
    // marginBottom: 40,
   marginTop:"27%"
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
    color: colors.black,
    textDecorationColor: colors.black,
    ...appStyles.font14,
    ...appStyles.family_SofiaPro_Regular,
    textDecorationLine: "underline",
  },

  loginBtn: {
    borderRadius: 26,
    width: width - 55,
  },

  loginTitle: {
    ...appStyles.font16,
    ...appStyles.family_SofiaPro_Regular,
  },

  applogo:{
    width:150,
    height:150,
    resizeMode:"contain",
    marginTop:"12%"
  },

  space: {
    paddingVertical: 20
  },
  textStyle:{
    textDecorationLine:'underline',
  },
  content:{alignItems: 'center'},
  subcontent:{
    alignItems: 'center',
    flexDirection: 'row',
  },
  forgot:{
    marginVertical:10,
    alignSelf:'center'
  },
  postion:{marginTop:10}
});

export default styles;
