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
import CustomText from '../../../components/CustomText';
import { colors, family, size } from '../../../utils';
const Otp = ({ navigation, route }) => {
  const { screenName, user_id } = route.params;
  console.log('screenName', screenName, 'user_id', user_id);

  const dispatch = useDispatch();
  let timer;
  const [code, setCode] = useState();
  const [timerCode, setTimerCode] = useState(30);
  const [resend, setResend] = useState(false);


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
  const onSubmit = () => {
    NavService.navigate('CompleteProfile')
  }
  return (
    <CustomBackground
      showLogo={false}
      onBack={() => NavService.navigate('Login')}>
      <View style={styles.container}>
        <View style={[styles.container, { marginTop: 20 }]}>
          <View style={styles.logoStyle}>
            <Image style={styles.applogo} source={appLogos.appLogo} />
          </View>
          <View style={styles.content}>
            <CustomText
              text="One Time Password"
              color={colors.white}
              size={size.h4}
              font={family.SofiaProBold}
            />
            <CustomText
              text="Enter Your OTP"
              color={colors.white}
              size={size.small}
              font={family.SofiaProRegular}
            />
          </View>
          <OTPInputView
            keyboardType="numeric"
            style={styles.otpInput}
            pinCount={4}
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
            title="Continue"
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
