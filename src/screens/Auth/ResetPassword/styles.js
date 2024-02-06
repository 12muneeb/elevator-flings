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
    marginVertical: 30,
},

  applogo: {
    width: 150,
    height: 150,
    resizeMode: "contain",
    marginTop: "12%"
  },

  upload: {
    position: 'absolute',
    alignSelf: 'center',
    top: '74%',
    zIndex: 20,
    right: '28%',
    //   backgroundColor:"red",
    //   // paddingVertical:1,
    //  borderRadius: 30
  },

  SubmitBtn: {
    borderRadius: 26,
    marginTop: 15
  },

  SubmitTitle: {
    ...appStyles.font16,
    ...appStyles.family_SofiaPro_Regular,
  },

});

export default styles;
