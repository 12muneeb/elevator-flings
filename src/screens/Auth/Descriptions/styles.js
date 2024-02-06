import { StyleSheet } from 'react-native';
import { responsiveScreenHeight } from 'react-native-responsive-dimensions';
import { colors, size } from '../../../utils';


export const styles = StyleSheet.create({
    dropdown:{
        backgroundColor:colors.gray,
        borderWidth:0,
        height: responsiveScreenHeight(6),
        borderRadius:5
      },
      label:{

      },
      dropdownIcon: {width: 20, height: 20,},
      inputStyles: { color: colors.lightGray,fontSize:size.normal }
})