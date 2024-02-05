import React, {Component, createRef} from 'react';
import {View, Image, BackHandler, Keyboard} from 'react-native';
import CustomBackground from '../../../components/CustomBackground';
import CustomButton from '../../../components/CustomButton';
import OutlineInput from '../../../components/OutlineInput';
import NavService from '../../../helpers/NavService';
import {appLogos} from '../../../assets/index';
import {resetValidations} from '../../../utils/validation';
import styles from './styles';
import {Formik} from 'formik';
import {resendPassword} from '../../../redux/actions/authAction';
import {connect} from 'react-redux';

class ResetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.resetForm = createRef(null);
  }

  //BACK HANDLER
  handleBackButtonClick = () => {
    this?.props?.navigation.navigate('Login');
    return true;
  };

  componentDidMount() {
    BackHandler?.addEventListener(
      'hardwareBackPress',
      this?.handleBackButtonClick,
    );
    return () => {
      BackHandler?.removeEventListener(
        'hardwareBackPress',
        this?.handleBackButtonClick,
      );
    };
  }

  onSubmit = values => {
    let payload = {
      new_password: values?.password,
    };
    Keyboard.dismiss();
    this.props.resendPassword(payload);
  };

  render() {
    const {} = this.state;
    return (
      <CustomBackground
        showLogo={false}
        titleText={'Reset Password'}
        onBack={() => NavService.navigate('Login')}>
        <View style={styles.container}>
          <Formik
            innerRef={this.resetForm}
            onSubmit={values => this.onSubmit(values)}
            initialValues={{
              password: '',
              confirmPassword: '',
            }}
            validationSchema={resetValidations}>
            {({handleChange, values, handleSubmit, errors, resetForm}) => {
              return (
                <View style={[styles.container, {marginTop: 20}]}>
                  <View style={styles.logoStyle}>
                    <Image style={styles.applogo} source={appLogos.appLogo} />
                  </View>
                  <View style={styles.textNormal}>
                    <OutlineInput
                      label="New Password"
                      placeholder={'New Password'}
                      leftIcon="lock"
                      value={values?.password}
                      onChangeText={handleChange('password')}
                      error={errors?.password}
                      secureTextEntry
                      rightIcon="eye"
                      righticon="eye-off"
                      maxLength={30}
                    />
                    <OutlineInput
                      label="Confirm Password"
                      placeholder={'Confirm Password'}
                      leftIcon="lock"
                      value={values?.confirmPassword}
                      onChangeText={handleChange('confirmPassword')}
                      secureTextEntry
                      error={errors?.confirmPassword}
                      rightIcon="eye"
                      righticon="eye-off"
                      maxLength={30}
                    />
                    <CustomButton
                      title="Submit"
                      onPress={() => handleSubmit()}
                      buttonStyle={styles.SubmitBtn}
                      textStyle={styles.SubmitTitle}
                    />
                  </View>
                </View>
              );
            }}
          </Formik>
        </View>
      </CustomBackground>
    );
  }
}

const actions = {resendPassword};
export default connect(null, actions)(ResetPassword);
