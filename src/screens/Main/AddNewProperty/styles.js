import { Dimensions, StyleSheet,Platform } from 'react-native';
import appStyles from '../../appStyles';
import { colors } from '../../../utils';

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
    mainCont: {
        // ...appStyles.mainContainer,
        // ...appStyles.w100,
        // flexDirection: 'row',
        marginTop: 10,
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
        marginTop: 50
    },

    propertyImage: {
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
        marginTop: 10,
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
        marginBottom: 80
    },

    btnTitle: {
        ...appStyles.font14
    },
    upload1: {
        width: 25,
        height: 25
    },
    uploadIconContainer: {
        backgroundColor: 'red'
    },
    videoStyle: {
        width: 25,
        height: 25,
        resizeMode: 'contain'
    },
    crossContainer: {
        borderWidth: 1,
        borderColor: colors.black
    },
    imgsty1: {
        width: 50,
        height: 50,
        resizeMode: 'contain'
    },
    imgsty2: {
        width: 25,
        height: 25,
        resizeMode: 'contain',
        backgroundColor: 'red'
    },
    viewstyle2: {

    },
    touchsty2: {
        backgroundColor: 'red'
    },
    viewstyle4: {
        marginLeft: 10,
        backgroundColor: colors.cream,
        marginTop: 8,
        paddingVertical: 10,
        paddingHorizontal: 15,
        // position: 'absolute',
        right: 120,
        borderRadius: 15,
        height: 105,
        width: 100,
        alignItems: 'center',
        justifyContent: 'center',
        ...Shadows.shadow0,
        marginBottom: 20,
        borderStyle: 'dashed',
        borderColor: colors.lightBlack,
        borderWidth: 1,
    },
    viewstyle3: {
        marginLeft: 10,
        backgroundColor: colors.cream,
        marginTop: 8,
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 15,
        height: 105,
        width: 100,
        alignItems: 'center',
        justifyContent: 'center',
        ...Shadows.shadow0,
        marginBottom: 20,
        borderStyle: 'dashed',
        borderColor: colors.lightBlack,
        borderWidth: 1,
    },
    images: {
        width: 80,
        height: 80,
        borderRadius: 10,
        alignItems: "flex-end",
        ...appStyles.justifyCenter,
        marginTop: 10,
        marginHorizontal: 5
    },
    hide: {
        display: "none"
    },
    closeIcon: {
        width: 6,
        height: 6,
    },
    mainView: {
        marginHorizontal: 20,
        marginTop:Platform.OS =='ios'?'10%':"5%" 
    },
    dec:{
        backgroundColor: colors.lightGray,
        height:250,
        marginTop:20,paddingHorizontal:15,
        color:"#000",paddingTop:12
    }

});

export default styles;