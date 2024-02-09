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
import { connect } from 'react-redux'
import { completeProfile } from '../../../redux/actions/authAction'
export class Descriptions extends Component {
    constructor(props) {
        super(props)
        this.state = {
            bodytype: '',
            haircolor: '',
            eyecolor: '',
            selected: '',
            selected2: '',
            selected3: '',
            selected4: '',
            selected5: '',
            selected6: '',

        }
    }
    render() {
        const { bodytype, haircolor, eyecolor, selected, selected2, selected3, selected4, selected5, selected6 } = this?.state
        const { data } = this.props.route.params
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
            } else if (!selected) {
                Toast.show({
                    text1: 'Piercing field can\'t be empty.',
                    type: 'error',
                    visibilityTime: 3000
                })
            } else if (!selected2) {
                Toast.show({
                    text1: 'Tattoo field can\'t be empty.',
                    type: 'error',
                    visibilityTime: 3000
                })
            } else if (!selected3) {
                Toast.show({
                    text1: "Smoking field can't be empty.",
                    type: 'error',
                    visibilityTime: 3000,
                })

            } else if (!selected4) {
                Toast.show({
                    text1: "Drinking field can't be empty.",
                    type: 'error',
                    visibilityTime: 3000,
                })
            }
            else if (!selected5) {
                Toast.show({
                    text1: "Etnicity field can't be empty.",
                    type: 'error',
                    visibilityTime: 3000,
                })
            }
            else if (!selected6) {
                Toast.show({
                    text1: "Salary bracket field can't be empty.",
                    type: 'error',
                    visibilityTime: 3000,
                })
            }
            else {
                let payload = {
                    ...data,
                    body_type: bodytype,
                    hair_color: haircolor,
                    eye_color: eyecolor,
                    piercings: selected,
                    tattos: selected2,
                    smoking: selected3,
                    drinking: selected4,
                    ethnicity: selected5,
                    salary_bracket: selected6,
                }
                // console.log('objectsds', payload)
                const formdata = new FormData();
                Object.keys(payload).forEach((item) => {
                   return formdata.append(item, payload[item])
                })
                // console.log('formdaJSSJJSta==', formdata);
                this.props.completeProfile(formdata)
                //    NavService.navigate()

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
                                setSelected={selected2 =>
                                    this.setState({ selected2: TatoosData[selected2]?.value })
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
                                setSelected={selected3 =>
                                    this.setState({ selected3: TatoosData[selected3]?.value })
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
                                setSelected={selected4 =>
                                    this.setState({ selected4: TatoosData[selected4]?.value })
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
                                setSelected={selected5 =>
                                    this.setState({ selected5: TatoosData[selected5]?.value })
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
                                setSelected={selected6 =>
                                    this.setState({ selected6: TatoosData[selected6]?.value })
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

// export default Descriptions
const actions = { completeProfile };
export default connect(null, actions)(Descriptions);

