import {Dimensions, StyleSheet} from 'react-native';
import appStyles from '../../../../appStyles';
import {colors} from '../../../../../utils';

const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  mainCont: {
    ...appStyles.mainContainer,
    ...appStyles.w100,
  },

  flatListCont: {
    marginVertical: 15,
    paddingBottom: width * 0.25,
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
