import { StyleSheet, Dimensions } from 'react-native';
import appStyles from '../../appStyles';
import { colors } from '../../../utils';

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
    mainCont: {
        ...appStyles.mainContainer,
        ...appStyles.w100,
    },

    flexRow: {
        ...appStyles.directionRow,
        ...appStyles.alignCenter,
    },

    search: {
        width: "90%"
    },

    flatListCont: {
        flexGrow: 1,
        paddingHorizontal: 3,
        marginHorizontal: 20,
        paddingTop: width * 0.04,
    },

    flatListStyle: {
        flex: 1,
        marginBottom: 10
    },

    messageView: {
        ...appStyles.justifySpaceBetween,
        height: 60,
        backgroundColor: colors.lightGray,
        paddingHorizontal: 10,
        borderTopRightRadius: 5,
        borderTopLeftRadius: 5,
        paddingRight: 20
    },

    textInput: {
        flex: 1,
        height: '100%',
        color: colors.gray,
        ...appStyles.font13,
        ...appStyles.family_SofiaPro_Regular
    },

    icon: {
        width: 15,
        height: 15,
    },

    verticalLine: {
        width: 1.2,
        height: 25,
        backgroundColor: colors.gray,
        marginHorizontal: 8
    },

    sendCont: {
        width: 30,
        height: 30,
        backgroundColor: colors.primary,
        ...appStyles.alignCenter,
        ...appStyles.justifyCenter,
        borderRadius: 5,
    },
});

export default styles;
