import React, {Component, createRef} from 'react';
import {View, Image, Keyboard} from 'react-native';
import {connect} from 'react-redux';
import {Formik} from 'formik';
import CustomBackground from '../../../components/CustomBackground';
import CustomButton from '../../../components/CustomButton';
import {appLogos} from '../../../assets';
import {forgotPassword} from '../../../redux/actions/authAction';
import OutlineInput from '../../../components/OutlineInput';
import {forgetValidation} from '../../../utils/validation';
import styles from './styles';

class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.forgotForm = createRef(null);
  }

  onSubmit = values => {
    console.log('values', values);
    let payload = {
      email: values?.email,
    };
    Keyboard.dismiss();
    this.props.forgotPassword(payload);
    // NavService.navigate('Otp', { screenName: 'forgot' });
  };

  render() {
    const {} = this.state;
    return (
      <CustomBackground
        showLogo={false}
        titleText={'Forgot Password'}
        onBack={() => this.props.navigation.goBack()}>
        <View style={styles.container}>
          <Formik
            innerRef={this.forgotForm}
            onSubmit={values => this.onSubmit(values)}
            initialValues={{
              email: '',
            }}
            validationSchema={forgetValidation}>
            {({handleChange, values, handleSubmit, errors, resetForm}) => {
              return (
                <View style={[styles.container]}>
                  <View style={styles.logoStyle}>
                    <Image style={styles.applogo} source={appLogos.appLogo} />
                  </View>
                  <View style={styles.textNormal}>
                    <OutlineInput
                      label="Email"
                      placeholder={'Email'}
                      leftIcon="email"
                      value={values?.email}
                      onChangeText={handleChange('email')}
                      error={errors?.email}
                      maxLength={35}
                      keyboardType={'email-address'}
                      secureTextEntry={false}
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

const actions = {forgotPassword};
export default connect(null, actions)(ForgotPassword);
