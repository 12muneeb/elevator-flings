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
    },

    userName: {
        color: colors.black,
        ...appStyles.family_SofiaPro_Medium,
        ...appStyles.font13,
        marginVertical: 5
    },

    infoCont: {
        ...Shadows.shadow5,
        width: "95%",
        backgroundColor: colors.white,
        paddingHorizontal: 15,
        borderRadius: 5,
        marginTop: 20
    },

    infoSubCont: {
        ...appStyles.justifySpaceBetween,
        marginVertical: 5
    },

    horizontalLine: {
        ...appStyles.w100,
        height: 0.3,
        backgroundColor: colors.gray
    },

    btnStyle: {
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

    arrowIcon: {
        width: 15,
        height: 15,
        marginRight: 15
    },

    notiTitle: {
        color: colors.black,
        ...appStyles.font15,
        ...appStyles.family_SofiaPro_Medium
    },

    notiCont: {
        width: "98%",
        borderRadius: 10,
        paddingVertical: 15,
        paddingHorizontal: 20,
        backgroundColor: colors.lightGray,
        ...appStyles.justifySpaceBetween,
        marginTop: 15
    },

    trackonstyle: {
        width: 42,
        height: 24,
    },
    thumb: {
        height: 18,
        width: 18,
        marginLeft: 0,
    },

    trackoff: {
        width: 42,
        height: 24,
        color:colors.secondary
    },
    thumboff: {
        height: 18,
        width: 18,
        marginLeft: 3,
    },

});

export default styles;