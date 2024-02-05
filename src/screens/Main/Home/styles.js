import { StyleSheet } from 'react-native';
import appStyles from '../../appStyles';
import { colors } from '../../../utils';
import Shadows from '../../../helpers/Shadows';

const styles = StyleSheet.create({
  mainCont: {
    ...appStyles.mainContainer,
    ...appStyles.w100,
  },

  flexRow: {
    ...appStyles.directionRow,
    ...appStyles.alignCenter,
  },

  BtnView: {
    ...appStyles.w100,
    ...appStyles.alignCenter,
    ...appStyles.justifySpaceBetween,
    backgroundColor: colors.lightGray,
    borderRadius: 10,
    paddingHorizontal: 5,
    paddingVertical: 10,
    height: 60,
  },

  buttonStyle: {
    ...Shadows.shadow0,
    width: "50%",
    borderRadius: 10,
    height: 50,
    marginTop:0
  },

  btnTitle:{
    ...appStyles.font14
  }
});

export default styles;
