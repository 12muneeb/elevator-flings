import {Dimensions, StyleSheet} from 'react-native';
import appStyles from '../../../../appStyles';
import {colors} from '../../../../../utils';

const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  mainCont: {
    ...appStyles.mainContainer,
    ...appStyles.w100,
  },

  flexRow: {
    ...appStyles.directionRow,
    ...appStyles.alignCenter,
  },

  buttonStyle: {
    borderRadius: 10,
  },

  flatListCont: {
    marginVertical: 20,
    paddingBottom: width * 0.25,
  },

  btnTitle: {
    ...appStyles.font14,
  },
  noMessageView: {
    ...appStyles.mainContainer,
    ...appStyles.alignCenter,
    ...appStyles.justifyCenter,
  },

  noMessageTitle: {
    ...appStyles.family_SofiaPro_Black,
    color: colors.black,
  },
});

export default styles;
