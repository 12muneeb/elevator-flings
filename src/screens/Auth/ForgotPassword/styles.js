import { StyleSheet, Dimensions } from 'react-native';
import { colors, HP, WP, size } from '../../../utils';
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
    marginBottom: 40,
  },
  textNormal: {
    // marginVertical: 10
    marginTop:20
  },
  
  applogo:{
   width:150,
   height:150,
    resizeMode:"contain",
    marginTop:"12%"
  },

  SubmitBtn: {
    borderRadius: 26,
    marginTop: 15
  },

  SubmitTitle: {
    ...appStyles.font16,
    ...appStyles.family_SofiaPro_Regular,
  },

  space: {
    paddingVertical: 20
  },
  content:{alignItems: 'center'},
});

export default styles;
