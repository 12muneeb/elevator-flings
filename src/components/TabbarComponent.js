import React from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Text, Keyboard,
  Platform,
} from 'react-native';
import { colors } from '../utils';
import { appIcons } from '../assets';
import appStyles from '../screens/appStyles';
import Shadows from '../helpers/Shadows';
import { togglePropertyAddModal } from '../redux/actions/appAction';

const { width } = Dimensions.get('window');
class TabBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      keyboardStatus: false,
    };
  }
  componentDidMount() {
    this.showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      this.setState({ keyboardStatus: true });
    });
    this.hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      this.setState({ keyboardStatus: false });
    });
  }
  componentWillUnmount() {
    this.showSubscription.remove();
    this.hideSubscription.remove();
  }
  render() {
    const { state, navigation } = this.props;
    const { keyboardStatus } = this.state;
    return (
      <View
        style={[{
          ...Shadows.shadow5,
          width: width - 30,
          height: width * 0.17,
          position: 'absolute',
          bottom: 20,
          justifyContent: 'center',
          backgroundColor: colors.gray,
          paddingBottom: 6,
          justifyContent: 'flex-end',
          alignSelf: 'center',
          borderRadius: 37,
          borderWidth: 3,
          borderColor: colors.lightGray
        }, keyboardStatus ? styles.hideTabNavigation : null,]}>
        <View
          style={{
            flexDirection: 'row',
            overflow: 'hidden',
            justifyContent: 'space-around',
          }}>
          {state.routes.map((route, index) => {
            const isFocused = state.index === index;

            const onPress = () => {
              if (route.name === 'Home') navigation.navigate('Home');
              if (route.name === 'Profile') navigation.navigate('Profile');
            };

            let imageSrc = appIcons.homeUnSelected;
            if (route.name === 'Home') imageSrc = appIcons.home;
            if (route.name === 'Profile') imageSrc = appIcons.profile;
            if (route.name === 'tabBar4') {
              return <View key={index + 1} style={styles.tabs} />;
            }

            return (
              <TouchableOpacity
                key={index + 1}
                accessibilityState={isFocused ? { selected: true } : {}}
                accessibilityRole="button"
                activeOpacity={0.8}
                onPress={onPress}
                style={styles.tabs}>
                {isFocused ? (
                  <View
                    style={{
                      height: 4,
                      width: 40,
                      borderRadius: 10,
                      marginBottom: 1.8,
                      backgroundColor: colors.primary,
                      marginTop: 5
                    }}></View>
                ) : (
                  <View
                    style={{
                      height: 4,
                      width: 40,
                      borderRadius: 1,
                      marginBottom: 1.8,
                    }}></View>
                )}

                <View style={[styles.innerTabStyle]}>
                  <Image
                    source={imageSrc}
                    style={{
                      height: 20,
                      width: 20,
                      tintColor: isFocused
                        ? colors.primary
                        : colors.inactiveTab,
                      opacity: isFocused ? null : 0.5,
                    }}
                    resizeMode="contain"
                  />
                  {route.name !== 'tabBar4' && (
                    <Text
                      style={{
                        color: isFocused ? colors?.primary : colors.inactiveTab,
                        opacity: isFocused ? null : 0.5,
                        ...appStyles.family_SofiaPro_Regular,
                        ...appStyles.font13,
                        marginTop: Platform.OS == 'android' ? 2 : 6,
                      }}>
                      {route?.name}
                    </Text>
                  )}
                </View>
              </TouchableOpacity>
            );
          })}
        
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: colors.white,
    flex: 0.14,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  buttonWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonStyle: {
    width: width * 0.4,
    borderRadius: 10,
  },
  buttonPerfectionNext: {
    backgroundColor: colors.secondary,
    marginLeft: 15,
  },
  tabs: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    // marginBottom: 5,
    height: 61,
    ...Shadows.shadow5,
  },

  innerTabStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    // marginBottom: 15,
    // height: width * 0.18,
  },
  hideTabNavigation: {
    width: 0,
    height: 0,
    position: 'absolute',
    bottom: 0,
  },
});

export default TabBar;
