import { StyleSheet } from 'react-native';
import appStyles from '../../appStyles';
import { colors } from '../../../utils';

const styles = StyleSheet.create({
    mainCont: {
        // ...appStyles.mainContainer,
        // ...appStyles.w100,
        marginTop: 20
    },
    flexRow: {
        ...appStyles.directionRow,
        ...appStyles.alignCenter,
    },

    imageBtn: {
        ...appStyles.w100,
        height: 150,
        borderColor: colors.gray,
        borderStyle: "dotted",
        borderWidth: 2,
        borderRadius: 10,
        ...appStyles.alignCenter,
        ...appStyles.justifyCenter,
        ...appStyles.alignSelf,
        backgroundColor: colors.lightGray,
        overflow: "hidden",
        marginTop:40
    },

    eventImage: {
        width: "100%",
        height: "100%",
        ...appStyles.alignCenter,
        ...appStyles.justifyCenter,
    },

    uploadImg: {
        ...appStyles.w100,
        height: 130,
    },

    uploadIcon: {
        width: 16,
        height: 16,
    },

    uploadImageTitle: {
        color: colors.black,
        ...appStyles.font14,
        ...appStyles.family_SofiaPro_Regular,
        marginTop: 5
    },

    DropDownCont: {
        borderRadius: 10,
        height: 55,
        marginTop: 18,
        paddingHorizontal: 10,
        ...appStyles.justifySpaceBetween,
        backgroundColor: colors.lightGray
    },

    input: {
        ...appStyles.w100,
        ...Shadows.shadow0,
        backgroundColor: colors.lightGray,
        borderWidth: 0,
    },

    btnStyle: {
        ...appStyles.w100,
        borderRadius: 10,
        marginTop: 15,
        marginBottom: 10
    },

    btnTitle: {
        ...appStyles.font14
    },

    dropdownTitle: {
        color: colors.black,
        ...appStyles.font13,
        ...appStyles.family_SofiaPro_Regular,
    },

    timeMainCont: {
        ...appStyles.justifySpaceBetween,
        marginTop: 18,
    },

    timeCont: {
        width: "43%",
        height: 55,
        backgroundColor: colors.lightGray,
        paddingHorizontal: 15,
        borderRadius: 5,
        alignItems: "center",
    },

    timeTitle: {
        color: colors.black,
        ...appStyles.font13,
        ...appStyles.family_SofiaPro_Regular,
    },
    propertyImage: {
        width: "100%",
        height: "100%",
        ...appStyles.alignCenter,
        ...appStyles.justifyCenter,
    },
    images: {
        width: 80,
        height: 80,
        borderRadius: 10,
        alignItems: "flex-end",
        ...appStyles.justifyCenter,
        marginHorizontal: 5,
    },

    hide: {
        display: "none"
    },
    closeIconCont: {
        position: "absolute",
        width: 15,
        height: 15,
        borderRadius: 100,
        ...appStyles.alignCenter,
        ...appStyles.justifyCenter,
        backgroundColor: colors.secondary,
        top: 0,
        right: 1,
        borderColor: colors.white,
        borderWidth: 1
    },
    closeIcon: {
        width: 6,
        height: 6,
    },
    dec:{
        backgroundColor: colors.lightGray,
        height:250,
        marginTop:20,paddingHorizontal:15,
        color:"#000",paddingTop:12
    }
});

export default styles;