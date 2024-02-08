import React, { Component } from 'react'
import { View } from 'react-native'
import { SelectList } from 'react-native-dropdown-select-list'
import Toast from 'react-native-toast-message'
import { appIcons } from '../../../assets'
import CTextfield from '../../../components/CTextField'
import CustomBackground from '../../../components/CustomBackground'
import CustomButton from '../../../components/CustomButton'
import Img from '../../../components/Img'
import NavService from '../../../helpers/NavService'
import { colors, family } from '../../../utils'
import { styles } from './styles'
export class Descriptions extends Component {
    constructor(props) {
        super(props)
        this.state = {
            bodytype: '',
            haircolor: '',
            eyecolor: '',
        }
    }
    render() {
        const { bodytype, haircolor, eyecolor, } = this?.state

        const piercingData = [
            { key: '0', value: 'Gold' },
            { key: '1', value: 'Ear' },
        ];
        const TatoosData = [
            { key: '0', value: 'Gold' },
            { key: '1', value: 'Ear' },
        ];

        const onSubmit = () => {
            if (!bodytype) {
                Toast.show({
                    text1: 'Body type field can\'t be empty.',
                    type: 'error',
                    visibilityTime: 3000
                })
            } else if (!haircolor) {
                Toast.show({
                    text1: 'Hair color field can\'t be empty.',
                    type: 'error',
                    visibilityTime: 3000
                })
            } else if (!eyecolor) {
                Toast.show({
                    text1: 'Eye color field can\'t be empty.',
                    type: 'error',
                    visibilityTime: 3000
                })
            } else {
               NavService.navigate()

            }
        }
        return (
            <CustomBackground titleText={'Description'} showLogo={false} skip>
                <View style={[styles.container, { marginTop: 80 }]}>
                    <View style={{ marginHorizontal: 20 }}>

                        <CTextfield
                            secureTextEntry={false}
                            inputLabel='Body type'
                            placeholderTextColor={colors.gray}
                            mode={'outlined'}
                            multiLine={false}
                            numberOfLines={1}
                            iconColor={colors.primary}
                            outlineColor={colors.gray}
                            bgColor={{ backgroundColor: colors.gray }}
                            activeOutlineColor={colors.primary}
                            toggleSecure
                            values={bodytype}
                            keyboardType='default'
                            onChangeText={(text) => this.setState({ bodytype: text })}
                        />
                        <CTextfield
                            secureTextEntry={false}
                            inputLabel='Hair color'
                            placeholderTextColor={colors.gray}
                            mode={'outlined'}
                            multiLine={false}
                            numberOfLines={1}
                            iconColor={colors.primary}
                            outlineColor={colors.gray}
                            bgColor={{ backgroundColor: colors.gray }}
                            activeOutlineColor={colors.primary}
                            toggleSecure
                            values={haircolor}
                            keyboardType='default'
                            onChangeText={(text) => this.setState({ haircolor: text })}
                        />
                        <CTextfield
                            secureTextEntry={false}
                            inputLabel='Eye Color'
                            placeholderTextColor={colors.gray}
                            mode={'outlined'}
                            multiLine={false}
                            numberOfLines={1}
                            iconColor={colors.primary}
                            outlineColor={colors.gray}
                            bgColor={{ backgroundColor: colors.gray }}
                            activeOutlineColor={colors.primary}
                            toggleSecure
                            values={eyecolor}
                            keyboardType='default'
                            onChangeText={(text) => this.setState({ eyecolor: text })}
                        />
                        <View style={{ gap: 15, marginTop: 15 }}>
                            <SelectList
                                setSelected={selected =>
                                    this.setState({ selected: piercingData[selected]?.value })
                                }
                                fontFamily={family.SofiaProBold}
                                data={piercingData}
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
                                placeholder="Piercings"
                                disabledCheckBoxStyles={styles.label}
                                dropdownStyles={styles.label}
                                dropdownTextStyles={{ color: colors.lightGray }}
                                inputStyles={styles.inputStyles}
                            />
                            <SelectList
                                setSelected={selected =>
                                    this.setState({ selected: TatoosData[selected]?.value })
                                }
                                fontFamily={family.SofiaProBold}
                                data={TatoosData}
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
                                placeholder="Tattoos"
                                disabledCheckBoxStyles={styles.label}
                                dropdownStyles={styles.label}
                                dropdownTextStyles={{ color: colors.lightGray }}
                                inputStyles={styles.inputStyles}
                            />
                            <SelectList
                                setSelected={selected =>
                                    this.setState({ selected: TatoosData[selected]?.value })
                                }
                                fontFamily={family.SofiaProBold}
                                data={TatoosData}
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
                                placeholder="Smoking"
                                disabledCheckBoxStyles={styles.label}
                                dropdownStyles={styles.label}
                                dropdownTextStyles={{ color: colors.lightGray }}
                                inputStyles={styles.inputStyles}
                            />
                            <SelectList
                                setSelected={selected =>
                                    this.setState({ selected: TatoosData[selected]?.value })
                                }
                                fontFamily={family.SofiaProBold}
                                data={TatoosData}
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
                                placeholder="Drinking"
                                disabledCheckBoxStyles={styles.label}
                                dropdownStyles={styles.label}
                                dropdownTextStyles={{ color: colors.lightGray }}
                                inputStyles={styles.inputStyles}
                            />
                            <SelectList
                                setSelected={selected =>
                                    this.setState({ selected: TatoosData[selected]?.value })
                                }
                                fontFamily={family.SofiaProBold}
                                data={TatoosData}
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
                                placeholder="Ethnicity"
                                disabledCheckBoxStyles={styles.label}
                                dropdownStyles={styles.label}
                                dropdownTextStyles={{ color: colors.lightGray }}
                                inputStyles={styles.inputStyles}
                            />
                            <SelectList
                                setSelected={selected =>
                                    this.setState({ selected: TatoosData[selected]?.value })
                                }
                                fontFamily={family.SofiaProBold}
                                data={TatoosData}
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
                                placeholder="Salary bracket"
                                disabledCheckBoxStyles={styles.label}
                                dropdownStyles={styles.label}
                                dropdownTextStyles={{ color: colors.lightGray }}
                                inputStyles={styles.inputStyles}
                            />
                            <CustomButton
                                title="Create Now"
                                onPress={onSubmit}
                                buttonStyle={styles.signUpBtn}
                                textStyle={styles.signUpTitle}
                            />
                        </View>

                    </View>

                </View>
            </CustomBackground>
        )
    }
}

export default Descriptions
