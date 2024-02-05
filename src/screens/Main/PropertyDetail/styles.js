import {Dimensions, StyleSheet} from 'react-native';
import appStyles from '../../appStyles';
import {colors} from '../../../utils';

const {width,height} = Dimensions.get('screen');

const styles = StyleSheet.create({
  mainCont: {
    ...appStyles.mainContainer,
    ...appStyles.w100,
  },

  flexRow: {
    ...appStyles.directionRow,
    ...appStyles.alignCenter,
  },

  property: {
    ...appStyles.w100,
    height: 200,
    borderRadius: 10,
  },

  headingCont: {
    ...appStyles.justifySpaceBetween,
  },

  heading: {
    color: colors.black,
    ...appStyles.font16,
    ...appStyles.family_SofiaPro_Regular,
  },

  contentCont: {
    marginTop: 10,
    marginBottom: 5,
  },

  markerIcon: {
    width: 12,
    height: 14,
    marginRight: 10,
  },

  content: {
    color: colors.black,
    ...appStyles.font13,
    ...appStyles.family_SofiaPro_Regular,
    marginTop: 3,
  },

  description: {
    color: colors.black,
    ...appStyles.font13,
    ...appStyles.family_SofiaPro_Regular,
    marginTop: 3,
    lineHeight: 20,
  },

  horizontalLine: {
    ...appStyles.w100,
    height: 0.3,
    backgroundColor: colors.gray,
    marginVertical: 10,
  },

  eventImages: {
    width: width * 0.2,
    height: height * 0.14,
    borderRadius: 10,
    marginRight: 10,
  },

  pastEventTitle: {
    color: colors.black,
    ...appStyles.font16,
    ...appStyles.family_SofiaPro_Regular,
    marginTop: 10,
  },

  flatListCont: {
    marginTop: 15,
  },
  noMessageView: {
    ...appStyles.mainContainer,
    ...appStyles.justifyCenter,
    ...appStyles.alignCenter,
  },

  noMessageTitle: {
    ...appStyles.family_SofiaPro_Black,
    color: colors.black,
  },
});

export default styles;
