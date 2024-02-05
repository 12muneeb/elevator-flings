import { StyleSheet } from 'react-native';
import { colors } from '../../../utils';
import appStyles from '../../appStyles';

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
    marginBottom: 10,
  },

  applogo: {
    width: 300,
    height: 200,
    resizeMode: "contain",
    marginTop: "12%"
  },

  underlineStyleBase: {
    width: 42,
    height: 48,
    borderWidth: 0,
    borderRadius: 5,
    borderColor: colors.primary,
    borderWidth: 1,
    ...appStyles.font14,
    color: colors.black,
    ...appStyles.family_SofiaPro_Regular,
  },

  textNormal: {
    ...appStyles.font14,
    color: colors.black,
    ...appStyles.family_SofiaPro_Regular,
  },
  textNormalWithColor: {
    color: colors.primary,
    textDecorationColor: colors.primary,
    ...appStyles.font14,
    ...appStyles.family_SofiaPro_Regular,
    textDecorationLine: "underline",
  },
  textNormalWithColordisabled: {
    color: colors.darkGray,
    textDecorationColor: colors.lightGray,
    ...appStyles.font14,
    ...appStyles.family_SofiaPro_Regular,
    textDecorationLine: "underline",
  },
  otpInput: {
    width: '87%',
    height: 20,
    alignSelf: 'center',
    marginVertical: 40,
    marginLeft: 15
  },
  timerText: {
    alignSelf: 'center',
    color: colors.black,
    fontSize: 13,
    marginVertical: 15,
    textAlign: "center"
  },


  SubmitBtn: {
    borderRadius: 10,
    marginTop: 0
  },

  SubmitTitle: {
    ...appStyles.font16,
    ...appStyles.family_SofiaPro_Regular,
  },
});

export default styles;
