import { StyleSheet } from 'react-native';
import { responsiveScreenHeight } from 'react-native-responsive-dimensions';
import { colors, family, size } from '../../../utils';

export const styles = StyleSheet.create({
    container: {
      },
      dropdown:{
        backgroundColor:colors.gray,
        borderWidth:0,
        height: responsiveScreenHeight(6),
        borderRadius:5
      },
      label:{

      },
      dropdownIcon: {width: 20, height: 20,},
      inputStyles: { color: colors.lightGray,fontSize:size.normal },
      containerStyle: {
        borderRadius: 10,
        width:'100%',
      },
      interest: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: '90%',
        justifyContent: 'flex-start',
        alignSelf: 'flex-start',
        marginTop: 5,
      },
      remove: {
        height: 12,
        width: 12,
        
      },
      tagtxt: {
        color: colors.white,
        fontFamily: family.RedHatDisplay_Bold,
        
      },
    
      tag: {
        paddingVertical: 10,
        margin: 5,
        backgroundColor:colors.gray,
        borderRadius: 20,
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal:15,
        borderWidth:1,
        borderColor:colors.lightGray,
      },
})