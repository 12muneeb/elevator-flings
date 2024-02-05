import {Dimensions, StyleSheet} from 'react-native';
import appStyles from '../../appStyles';
import {colors} from '../../../utils';

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

  time: {
    color: colors.black,
    ...appStyles.font13,
    ...appStyles.family_SofiaPro_Regular,
    marginTop: 5,
    textTransform: 'capitalize',
  },

  eventDetailCont: {
    ...appStyles.justifySpaceBetween,
    marginTop: 10,
  },

  groupImages: {
    marginTop: 8,
    marginLeft: 0,
  },

  requestTitle: {
    color: colors.black,
    ...appStyles.family_SofiaPro_Medium,
    ...appStyles.font16,
    marginTop: 6,
    marginBottom: 5,
  },

  flatListCont: {
    paddingBottom: width * 0.03,
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
