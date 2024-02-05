import React, { useEffect, useState } from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  Image,
  BackHandler,
  Platform,
} from 'react-native';
import { useDispatch } from 'react-redux';
import Toast from 'react-native-toast-message';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import CustomBackground from '../../../components/CustomBackground';
import CustomButton from '../../../components/CustomButton';
import { appLogos } from '../../../assets/index';
import {
  toggleVerificationPopUp,
  otpVerify,
} from '../../../redux/actions/authAction';
import { getDeviceToken } from '../../../redux/actions/appAction';
import styles from './styles';
import NavService from '../../../helpers/NavService';
const Otp = ({ navigation, route }) => {
  const { screenName, user_id } = route.params;
  console.log('screenName', screenName, 'user_id', user_id);

  const dispatch = useDispatch();
  let timer;
  const [code, setCode] = useState();
  const [timerCode, setTimerCode] = useState(30);
  const [resend, setResend] = useState(false);

  const onSubmit = async () => {
    if (code?.length > 0) {
      if (screenName == 'signup') {
        const fcmToken = await getDeviceToken();
        let payload = {
          user_id: user_id,
          verified_code: code,
          type: 'account_verify',
          device_type: Platform.OS,
          device_token: fcmToken,
        };
        console.log('payload===', payload);
        dispatch(otpVerify(payload, 'signup'));
      } else if (screenName == 'forgot') {
        const fcmToken = await getDeviceToken();
        let payload = {
          user_id: user_id,
          verified_code: code,
          type: 'account_verify',
          device_type: Platform.OS,
          device_token: fcmToken,
        };
        console.log('payload===', payload);
        dispatch(otpVerify(payload, 'forgot'));
      }
    } else {
      Toast.show({
        text1: `OTP field can't be empty`,
        type: 'error',
        visibilityTime: 3000,
      });
    }
  };
  const startInterval = () => {
    clearInterval(timer);
    timer = setInterval(() => {
      setTimerCode(timerCode => {
        if (timerCode > 0) {
          return timerCode - 1;
        } else {
          setResend(true);
          clearInterval(timer);
          return '00';
        }
      });
    }, 1000);
  };
  const handleReset = () => {
    if (resend) {
      setTimerCode(30);
      setResend(false);
      setCode();
      startInterval();
      Toast.show({
        text1: 'We have resend OTP verification code at your email address',
        type: 'error',
        visibilityTime: 3000,
      });
    } else {
      Toast.show({
        text1: 'Please wait untill timer finishes!',
        type: 'error',
        visibilityTime: 3000,
      });
    }
  };
  useEffect(() => {
    startInterval();
    return () => {
      clearInterval(timer);
    };
  }, []);

  //BACK HANDLER
  function handleBackButtonClick() {
    navigation.navigate('Login');
    return true;
  }

  useEffect(() => {
    BackHandler?.addEventListener('hardwareBackPress', handleBackButtonClick);
    return () => {
      BackHandler?.removeEventListener(
        'hardwareBackPress',
        handleBackButtonClick,
      );
    };
  }, []);

  return (
    <CustomBackground
      showLogo={false}
      titleText={'OTP Verification'}
      onBack={() => NavService.navigate('Login')}>
      <View style={styles.container}>
        <View style={[styles.container, { marginTop: 20 }]}>
          <View style={styles.logoStyle}>
            <Image style={styles.applogo} source={appLogos.appLogo} />
          </View>
          <OTPInputView
            keyboardType="numeric"
            style={styles.otpInput}
            pinCount={6}
            autoFocusOnLoad={false}
            codeInputFieldStyle={styles.underlineStyleBase}
            codeInputHighlightStyle={styles.underlineStyleHighLighted}
            onCodeChanged={c => {
              const cleanNumber = c.replace(/[- #*;,.<>\{\}\[\]\\\/]/gi, '');
              setCode(cleanNumber);
            }}
            onCodeFilled={c => {
              const cleanNumber = c.replace(/[- #*;,.<>\{\}\[\]\\\/]/gi, '');
              setCode(cleanNumber);
            }}
            code={code}
          />

          <CustomButton
            title="Submit"
            onPress={onSubmit}
            buttonStyle={styles.SubmitBtn}
            textStyle={styles.SubmitTitle}
          />
          <Text style={styles.timerText}>00:{timerCode}</Text>
        </View>
        <View style={styles.bottomView}>
          <Text style={styles.textNormal}> Didn't Receive Code? </Text>
          <TouchableOpacity
            disabled={timerCode > 0 ? true : false}
            onPress={() => handleReset()}>
            <Text style={timerCode > 0 ? styles.textNormalWithColordisabled : styles.textNormalWithColor}>Resend</Text>
          </TouchableOpacity>
        </View>
      </View>
    </CustomBackground>
  );
};

export default Otp;
