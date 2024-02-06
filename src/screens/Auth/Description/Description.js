import React, { Component } from 'react'
import { View } from 'react-native'
import { SelectList } from 'react-native-dropdown-select-list'
import { appIcons } from '../../../assets'
import CTextfield from '../../../components/CTextField'
import CustomBackground from '../../../components/CustomBackground'
import Img from '../../../components/Img'
import { colors, family } from '../../../utils'
import { styles } from './styles'
import CustomButton from '../../../components/CustomButton'
import NavService from '../../../helpers/NavService'
import Toast from 'react-native-toast-message'

export class Description extends Component {
  constructor(props) {
    super(props)
    this.state = {
      interests: '',
      career: '',
      weight: '',
      height: '',
      networth: '',
    }
  }
  render() {
    const {  career, weight, networth, height } = this.state

    const intentionData = [
      { key: '0', value: 'Action' },
      { key: '1', value: 'Attation' },
    ];
    const lookingforData = [
      { key: '0', value: 'Search' },
      { key: '1', value: 'QR Code' },
    ];
    const educationData = [
      { key: '0', value: 'Bachelors' },
      { key: '1', value: 'Intermediate' },
    ];
    const onSubmit = () => {
     if(!career){
      Toast.show({
        text1: "Career field can't be empty.",
        type: 'error',
        visibilityTime: 3000,
      })
     }else if(!weight){
      Toast.show({
        text1: "Weight field can't be empty.",
        type: 'error',
        visibilityTime: 3000,
      })
     }else if(!height){
      Toast.show({
        text1: "Height field can't be empty.",
        type: 'error',
        visibilityTime: 3000,
      })
     }else if(!networth){
      Toast.show({
        text1: "Networth field can't be empty.",
        type: 'error',
        visibilityTime: 3000,
      })
     }else{
      NavService.navigate('Descriptions');
     }
    }
    return (
      <CustomBackground showLogo={false} titleText={'Descriptions'} skip>
        <View style={[styles.container, { marginTop: 80 }]}>
          <View style={{ gap: 15, marginHorizontal: 20 }}>
            <SelectList
              setSelected={selected =>
                this.setState({ selected: intentionData[selected]?.value })
              }
              fontFamily={family.SofiaProBold}
              data={intentionData}
              arrowicon={
                <Img
                  local
                  src={appIcons.downArrow}
                  style={styles.dropdownIcon}
                  resizeMode={'contain'}
                  tintColor={colors.lightGray}
                />
              }
              search={false}
              boxStyles={styles.dropdown}
              placeholder="Intention"
              disabledCheckBoxStyles={styles.label}
              dropdownStyles={styles.label}
              dropdownTextStyles={{ color: colors.lightGray, }}
              inputStyles={styles.inputStyles}
            />
            <SelectList
              setSelected={selected =>
                this.setState({ selected: lookingforData[selected]?.value })
              }
              fontFamily={family.SofiaProBold}
              data={lookingforData}
              arrowicon={
                <Img
                  local
                  src={appIcons.downArrow}
                  style={styles.dropdownIcon}
                  resizeMode={'contain'}
                  tintColor={colors.lightGray}
                />
              }
              search={false}
              boxStyles={styles.dropdown}
              placeholder="Looking for"
              disabledCheckBoxStyles={styles.label}
              dropdownStyles={styles.label}
              dropdownTextStyles={{ color: colors.lightGray }}
              inputStyles={styles.inputStyles}
            />
            <SelectList
              setSelected={selected =>
                this.setState({ selected: educationData[selected]?.value })
              }
              fontFamily={family.SofiaProBold}
              data={educationData}
              arrowicon={
                <Img
                  local
                  src={appIcons.downArrow}
                  style={styles.dropdownIcon}
                  resizeMode={'contain'}
                  tintColor={colors.lightGray}
                />
              }
              search={false}
              boxStyles={styles.dropdown}
              placeholder="Education"
              disabledCheckBoxStyles={styles.label}
              dropdownStyles={styles.label}
              dropdownTextStyles={{ color: colors.lightGray }}
              inputStyles={styles.inputStyles}
            />
            <CTextfield
              secureTextEntry={false}
              inputLabel='Career'
              placeholderTextColor={colors.gray}
              mode={'outlined'}
              multiLine={false}
              numberOfLines={1}
              iconColor={colors.primary}
              outlineColor={colors.gray}
              bgColor={{ backgroundColor: colors.gray }}
              activeOutlineColor={colors.primary}
              toggleSecure
              values={career}
              keyboardType='number-pad'
              onChangeText={(text) => this.setState({ career: text })}
            />
            <CTextfield
              secureTextEntry={false}
              inputLabel='Weight'
              placeholderTextColor={colors.gray}
              mode={'outlined'}
              multiLine={false}
              numberOfLines={1}
              iconColor={colors.primary}
              outlineColor={colors.gray}
              bgColor={{ backgroundColor: colors.gray }}
              activeOutlineColor={colors.primary}
              toggleSecure
              values={weight}
              keyboardType='number-pad'
              onChangeText={(text) => this.setState({ weight: text })}
            />
            <CTextfield
              secureTextEntry={false}
              inputLabel='Height'
              placeholderTextColor={colors.gray}
              mode={'outlined'}
              multiLine={false}
              numberOfLines={1}
              iconColor={colors.primary}
              outlineColor={colors.gray}
              bgColor={{ backgroundColor: colors.gray }}
              activeOutlineColor={colors.primary}
              toggleSecure
              values={height}
              keyboardType='number-pad'
              onChangeText={(text) => this.setState({ height: text })}
            />
            <CTextfield
              secureTextEntry={false}
              inputLabel='Networth'
              placeholderTextColor={colors.gray}
              mode={'outlined'}
              multiLine={false}
              numberOfLines={1}
              iconColor={colors.primary}
              outlineColor={colors.gray}
              bgColor={{ backgroundColor: colors.gray }}
              activeOutlineColor={colors.primary}
              toggleSecure
              values={networth}
              keyboardType='number-pad'
              onChangeText={(text) => this.setState({ networth: text })}
            />
              <CustomButton
                title="Continue"
                onPress={onSubmit}
                buttonStyle={styles.signUpBtn}
                textStyle={styles.signUpTitle}
              />
          </View>
        </View>
      </CustomBackground>
    )
  }
}

export default Description
