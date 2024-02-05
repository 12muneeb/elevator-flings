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
  },
  
  applogo:{
    width:300,
    height:200,
    resizeMode:"contain",
    marginTop:"12%"
  },

  SubmitBtn: {
    borderRadius: 10,
    marginTop: 15
  },

  SubmitTitle: {
    ...appStyles.font16,
    ...appStyles.family_SofiaPro_Regular,
  },

  space: {
    paddingVertical: 20
  },
});

export default styles;
