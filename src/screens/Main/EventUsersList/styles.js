import {StyleSheet} from 'react-native';
import appStyles from '../../appStyles';
import {colors} from '../../../utils';

const styles = StyleSheet.create({
  mainCont: {
    ...appStyles.mainContainer,
    ...appStyles.w100,
  },

  flexRow: {
    ...appStyles.directionRow,
    ...appStyles.alignCenter,
  },

  flatListCont: {
    marginTop: 3,
  },
  noMessageView: {
    ...appStyles.mainContainer,
    ...appStyles.justifyCenter,
    ...appStyles.alignCenter,
    ...appStyles.marginVertical2Percent,
  },

  noMessageTitle: {
    ...appStyles.family_SofiaPro_Black,
    color: colors.black,
  },
});

export default styles;
