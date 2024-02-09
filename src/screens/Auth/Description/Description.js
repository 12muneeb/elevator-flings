import React, { Component } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { SelectList } from 'react-native-dropdown-select-list'
import Toast from 'react-native-toast-message'
import { appIcons } from '../../../assets'
import CTextfield from '../../../components/CTextField'
import CustomBackground from '../../../components/CustomBackground'
import CustomButton from '../../../components/CustomButton'
import CustomTextInput from '../../../components/CustomTextInput'
import Img from '../../../components/Img'
import NavService from '../../../helpers/NavService'
import { colors, family } from '../../../utils'
import { styles } from './styles'
import { completeProfile } from '../../../redux/actions/authAction'
import { connect } from 'react-redux'
export class Description extends Component {
  constructor(props) {
    super(props)
    this.state = {
      interests: '',
      career: '',
      weight: '',
      height: '',
      networth: '',
      selected: '',
      selected1: '',
      selected2: '',
      texttags: ''
    }
  }
  render() {
    const { career, weight, networth, height, selected, selected2, selected1, interests, texttags } = this.state
    const { data } = this.props.route.params

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
    const handleTagDeletes = index => {
      const { interests } = this.state;
      interests.splice(index, 1);
      this.setState({ interests });
    };
    const onSubmit = () => {
      if (!selected) {
        Toast.show({
          text1: "Intention field can't be empty.",
          type: 'error',
          visibilityTime: 3000,
        })
      } else if (!selected1) {
        Toast.show({
          text1: "Looking for field can't be empty.",
          type: 'error',
          visibilityTime: 3000,
        })
      }
      else if (!interests) {
        Toast.show({
          text1: "Interests field can't be empty.",
          type: 'error',
          visibilityTime: 3000,
        })
      }
      else if (!selected2) {
        Toast.show({
          text1: "Education field can't be empty.",
          type: 'error',
          visibilityTime: 3000,
        })
      }
      else if (!weight) {
        Toast.show({
          text1: "Weight field can't be empty.",
          type: 'error',
          visibilityTime: 3000,
        })
      } else if (!height) {
        Toast.show({
          text1: "Height field can't be empty.",
          type: 'error',
          visibilityTime: 3000,
        })
      } else if (!networth) {
        Toast.show({
          text1: "Networth field can't be empty.",
          type: 'error',
          visibilityTime: 3000,
        })
      } else {
        let payload = {
          ...data,
          intention: selected,
          looking_for: selected1,
          interests: interests,
          education: selected2,
          career: career,
          weight: weight,
          height: height,
          networth: networth,
        }
        NavService.navigate('Descriptions', {
          data: payload
        })
      
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
              setSelected={selected1 =>
                this.setState({ selected1: lookingforData[selected1]?.value })
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
            <CustomTextInput
              placeholder={'Interest'}
              blurOnSubmit={false}
              placeholderColor={colors.lightGray}
              value={texttags}
              containerStyle={styles.containerStyle}
              onSubmitEditing={() => {
                if (texttags.trim() !== '') {
                  this.setState({
                    interests: [...interests, texttags],
                  });
                  this.setState({ texttags: '' });
                }
              }}
              onChangeText={value => {
                this.setState({ texttags: value });
              }}
            />
            {interests?.length > 0 ? (
              <View style={styles.interest}>
                {interests?.map((item, index) => {
                  return (
                    <View key={index} style={styles.tag}>
                      <Text style={styles.tagtxt}>{item}</Text>
                      <TouchableOpacity
                        onPress={() => handleTagDeletes(index)}
                        style={{
                          backgroundColor: colors.white,
                          borderRadius: 10,
                          padding: 4,
                          justifyContent: 'center',
                          left: 5,
                        }}>
                        <Img
                          local
                          style={styles.remove}
                          src={appIcons.close}
                          resizeMode={'contain'}
                          tintColor={'#FFC6C6'}
                        />
                      </TouchableOpacity>
                    </View>
                  );
                })}
              </View>
            ) : null}
            <SelectList
              setSelected={selected2 =>
                this.setState({ selected2: educationData[selected2]?.value })
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

// export default 
const actions = { completeProfile };
export default connect(null, actions)(Description);
