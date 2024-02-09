import OTPInputView from '@twotalltotems/react-native-otp-input';
import React, { useEffect, useState } from 'react';
import {
  BackHandler,
  Image,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import Toast from 'react-native-toast-message';
import { connect, useDispatch, useSelector } from 'react-redux';
import { appLogos } from '../../../assets/index';
import CustomBackground from '../../../components/CustomBackground';
import CustomButton from '../../../components/CustomButton';
import CustomText from '../../../components/CustomText';
import NavService from '../../../helpers/NavService';
import { colors, family, size } from '../../../utils';
import { otpVerify } from '../../../redux/actions/authAction';
import styles from './styles';
const Otp = ({ navigation, route }) => {
  const stateOfRedux = useSelector((state) => state)
  console.log('stateOfRedux', stateOfRedux);
  const { screenName, id } = route.params;
  const dispatch = useDispatch();
  let timer;
  const [code, setCode] = useState();
  console.log('====================================', screenName, id, code);
  const [timerCode, setTimerCode] = useState(30);
  const [resend, setResend] = useState(false);
  const onSubmit = () => {
    if (!code || code.length === 0) {
      Toast.show({
        text1: 'Please enter OTP',
        type: 'error',
        visibilityTime: 3000,
      });
    } else {
      const formdata = new FormData
      formdata.append('user_id', id);
      formdata.append("verified_code", code);
      formdata.append("type", screenName == 'forgot' ? "forgot" : 'account_verify')
      formdata.append("device_type", 'android')
      formdata.append("device_token", '12345')
      dispatch(otpVerify(formdata, screenName));
    }
  }
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
}

const actions = { otpVerify };
export default connect(null, actions)(Otp);
