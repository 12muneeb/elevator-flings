import { StyleSheet, Dimensions } from 'react-native';
import { colors } from '../../utils';
import appStyles from '../appStyles';

const { width, height } = Dimensions.get('window');

const style = StyleSheet.create({
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
  buttonContainer: {
    backgroundColor: colors.primary,
    borderRadius: 10,
    width: width - 60,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 7,
    height: 60,
    justifyContent: 'center',

  },
  buttonInnerImage: {
    width: 25,
    height: 25,
    resizeMode: 'contain',
    tintColor: colors.white,
    position: 'absolute',
    left: width / 6,
  },
  buttonInnerText: {
    ...appStyles.font17,
    color: colors.white,
    position: 'absolute',
    left: width / 3.5,
    ...appStyles.family_SofiaPro_Regular,
  },

  applogo:{
    width:300,
    height:200,
    resizeMode:"contain",
    marginTop:"12%"
  },
  
  space: {
    paddingVertical: 20
  }
});

export default style;
