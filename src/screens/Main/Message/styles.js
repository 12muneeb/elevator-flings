import { StyleSheet } from 'react-native';
import appStyles from '../../appStyles';
import { colors } from '../../../utils';

const styles = StyleSheet.create({
    mainCont: {
        ...appStyles.mainContainer,
        ...appStyles.w100,
    },

    flexRow: {
        ...appStyles.directionRow,
        ...appStyles.alignCenter,
    },
    noMessageView: {
        ...appStyles.mainContainer,
        ...appStyles.alignCenter,
        ...appStyles.justifyCenter,
    },

    noMessageTitle: {
        color: colors.black,
        ...appStyles.font14,
        ...appStyles.family_SofiaPro_Medium
    },

    flatListCont: {
        marginVertical: 10
    },

});

export default styles;