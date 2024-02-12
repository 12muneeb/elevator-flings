import {
  Alert,
  Image,
  Platform,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { Component } from 'react';
import Toast from 'react-native-toast-message';
import { colors } from '../../utils';
import CustomBackground from '../../components/CustomBackground';
import { appIcons, appLogos } from '../../assets/index';
import styles from './styles';
import CustomText from '../../components/CustomText';
import { getDeviceToken } from '../../redux/actions/appAction';
import SocialSignin from '../../components/SocialSignin';
import { socialSignin } from '../../redux/actions/authAction';
import { connect } from 'react-redux';

class PreLogin extends Component {
  state = {
    agreementModal: false,
    terms: false,
    policy: false,
    navigator: '',
    verificationPopUp: false
  };




  render() {
    const { agreementModal, terms, policy, navigator, verificationPopUp } = this.state;
    const proceedSocialLogin = async () => {
      await Promise.all();
        Alert.alert('jj')
        const userDetails = await SocialSignin?.Google();
        console.log('userDetails', userDetails);
        let payload = {
          social_token: userDetails?.uid,
          social_type: 'google',
          device_type: Platform.OS,
          device_token: '12345',
          user_type: 'user',
        };
        console.log(payload, 'payloadpayload');
        this.props.socialSignin(payload);

    };
    const methods = [
      {
        name: 'Email',
        icon: appIcons.email,
        onPress: () => navigation.navigate('Login'),
        color: colors.primary,
      },
      {
        name: 'Google',
        icon: appIcons.googlePlus,
        color: colors.google,
        onPress: () => proceedSocialLogin(),
        // onPress: SocialSignin.Google,
      },
      {
        name: 'Apple',
        icon: appIcons.apple,
        color: colors.black,
        onPress: () => proceedSocialLogin('apple'),
        // onPress: SocialSignin.Apple,
      },
    ];
    const { navigation } = this.props;
    return (
      <CustomBackground back={false} showLogo={false} titleText={"Pre-Login"}>
        <View style={[styles.container, { padding: 20 }]}>
          <View style={styles.logoStyle}>
            <Image style={styles.applogo} source={appLogos.appLogo} />
          </View>
          <View style={styles.space}>
            {methods.map((method, i) => {
              const { color, name, icon, onPress } = method;
              if (Platform.OS !== 'ios' && name === 'Apple') return null;
              return (
                <TouchableOpacity
                  onPress={onPress}
                  key={i}
                  activeOpacity={0.8}
                  style={[styles.buttonContainer, { backgroundColor: color }]}>
                  <Image source={icon} style={styles.buttonInnerImage} />

                  <CustomText
                    text={`Sign in with ${name}`}
                    style={styles.buttonInnerText}
                  />
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

      </CustomBackground>
    );
  }
}


const actions = { socialSignin };
export default connect(null, actions)(PreLogin);