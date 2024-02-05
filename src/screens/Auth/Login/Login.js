import React, {Component, createRef} from 'react';
import {
  Image,
  Text,
  View,
  Pressable,
  Platform,
  Keyboard,
  TouchableOpacity,
} from 'react-native';
import {connect} from 'react-redux';
import {Formik} from 'formik';
import CustomBackground from '../../../components/CustomBackground';
import CustomButton from '../../../components/CustomButton';
import OutlineInput from '../../../components/OutlineInput';
import NavService from '../../../helpers/NavService';
import {getDeviceToken} from '../../../redux/actions/appAction';
import {loginValidations} from '../../../utils/validation';
import {appLogos} from '../../../assets/index';
import {loginCurrentUser} from '../../../redux/actions/authAction';
import styles from './styles';
import CustomText from '../../../components/CustomText';
import {colors, family, size} from '../../../utils';
import CustomTextField from '../../../components/CustomTextField';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      verificationPopUp: false,
    };
    this.loginForm = createRef(null);
  }

  onSubmit = async values => {
    let payload = {...values};
    const fcmToken = await getDeviceToken();
    payload['device_type'] = Platform.OS;
    payload['device_token'] = fcmToken;
    payload['user_type'] = 'business';
    Keyboard.dismiss();
    this.props.loginCurrentUser(payload);
  };

  render() {
    const {verificationPopUp} = this.state;
    return (
      <CustomBackground
        showLogo={false}
        titleText={'Login'}
        onBack={() => this.props.navigation.goBack()}>
        <View style={styles.container}>
          <Formik
            innerRef={this.loginForm}
            onSubmit={values => this.onSubmit(values)}
            initialValues={{
              email: '',
              password: '',
            }}
            validationSchema={loginValidations}>
            {({handleChange, values, handleSubmit, errors, resetForm}) => {
              return (
                <View style={[styles.container, {marginTop: 20}]}>
                  <View style={styles.logoStyle}>
                    <Image style={styles.applogo} source={appLogos.appLogo} />
                  </View>
                  <View style={{alignItems: 'center'}}>
                    <CustomText
                      text="Welcome back!"
                      color={colors.white}
                      size={size.h4}
                      font={family.SofiaProBold}
                    />
                    <View
                      style={{
                        alignItems: 'center',
                        flexDirection: 'row',
                      }}>
                      <CustomText
                        text="Login below or"
                        color={colors.white}
                        size={size.small}
                        font={family.SofiaProRegular}
                      />
                      <TouchableOpacity activeOpacity={0.8}>
                      <CustomText
                        text=" Create an Account"
                        color={colors.primary}
                        size={size.small}
                        font={family.SofiaProBold}
                        style={styles.textStyle}
                      />
                      </TouchableOpacity>
                    </View>
                  </View>
                 
                  <OutlineInput
                    label="Email"
                    placeholder={'Email'}
                    leftIcon="email"
                    value={values?.email}
                    onChangeText={handleChange('email')}
                    error={errors?.email}
                    keyboardType={'email-address'}
                    q
                    maxLength={35}
                  /> 
                  <OutlineInput
                    label="Password"
                    placeholder={'Password'}
                    leftIcon="lock"
                    value={values?.password}
                    onChangeText={handleChange('password')}
                    error={errors?.password}
                    secureTextEntry
                    rightIcon="eye"
                    righticon="eye-off"
                    maxLength={30}
                  />
                  <CustomButton
                    title="Login"
                    onPress={() => handleSubmit()}
                    buttonStyle={styles.loginBtn}
                    textStyle={styles.loginTitle}
                  />
                </View>
              );
            }}
          </Formik>
        </View>
      </CustomBackground>
    );
  }
}
const actions = {loginCurrentUser};
export default connect(null, actions)(Login);
