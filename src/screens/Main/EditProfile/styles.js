import { Dimensions, StyleSheet } from 'react-native';
import appStyles from '../../appStyles';
import { colors } from '../../../utils';
import Shadows from '../../../helpers/Shadows';

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
    mainCont: {
        ...appStyles.mainContainer,
        ...appStyles.alignCenter,
        ...appStyles.w100,
    },

    flexRow: {
        ...appStyles.directionRow,
        ...appStyles.alignCenter,
    },

    profileView: {
        backgroundColor: "transparent",
        borderColor: colors.secondary,
        borderWidth: 2,
        height: 110,
        width: 110,
        marginTop: 0
    },

    profileImage: {
        borderColor: colors.secondary,
        borderWidth: 2,
        opacity: 0.7
    },

    uploadCont: {
        position: "absolute",
        width: 20,
        height: 20,
        borderRadius: 100,
        backgroundColor: colors.secondary,
        ...appStyles.alignCenter,
        ...appStyles.justifyCenter,
        right: 20,
        bottom: 35,
    },

    uploadIcon: {
        width: 12,
        height: 12,
    },

    bussinesslogoTitle: {
        color: colors.black,
        ...appStyles.family_SofiaPro_Medium,
        ...appStyles.font13,
        marginTop:12
    },

    input: {
        ...appStyles.w100,
    },

    btnStyle: {
        ...appStyles.w100,
        borderRadius: 10,
        marginTop: 15
    },

    btn: {
        ...Shadows.shadow5,
        ...appStyles.alignCenter,
        ...appStyles.justifySpaceBetween,
        width: width - 44,
        height: 55,
        backgroundColor: colors.black,
        borderRadius: 10,
        marginTop: 15,
        paddingHorizontal: 10
    },

    btnTitle: {
        color: colors.white,
        ...appStyles.font15,
        ...appStyles.family_SofiaPro_Regular
    },

});

export default styles;