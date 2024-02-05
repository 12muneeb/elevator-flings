import React, {Component, createRef} from 'react';
import {
  FlatList,
  Keyboard,
  Platform,
  UIManager,
  View,
  TextInput,
  LayoutAnimation,
  TouchableOpacity,
} from 'react-native';
import {connect} from 'react-redux';
import Toast from 'react-native-toast-message';
import AppBackground from '../../../components/AppBackground';
import Chats from '../../../components/Chats';
import Img from '../../../components/Img';
import UserListModal from '../../../containers/Modal/UserListModal';
import {colors} from '../../../utils';
import {appIcons, appImages} from '../../../assets';
import {
  loaderStartWithDispatch,
  loaderStopWithDispatch,
  fetchUsersOfEvent,
  toggleBlockListUser,
  removeUserFromEvent,
} from '../../../redux/actions/appAction';
import styles from './styles';

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}
class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      eventComingUsers: [],
      userListPopupVisible: false,
    };
    this.messageInput = createRef(null);
    this.messageInput = createRef(null);
  }
  componentDidMount() {
    this.focusListener = this.props.navigation.addListener('focus', () => {
      loaderStartWithDispatch();
      this.fetchPresentEventUsers();
      this.response();
    });
  }
  componentWillUnmount() {
    this.focusListener();
  }
  fetchPresentEventUsers = () => {
    const groupInfo = this?.props?.route?.params?.groupInfo;
    let params = {
      key: 'event_id',
      value: groupInfo?.event_id ? groupInfo?.event_id : groupInfo?.id,
    };
    this.props.fetchUsersOfEvent(params, users => {
      console.log('users', users);
      if (users) {
        this.setState({eventComingUsers: users});
      } else {
        this.setState({eventComingUsers: []});
      }
    });
  };
  onBlockPress = (user, blockType) => {
    console.log('user', user);
    let payload = {block_user_id: user?.id, type: blockType};
    console.log('payload', payload);
    this.props.toggleBlockListUser(payload, response => {
      if (response?.status == 1) {
        this.fetchPresentEventUsers();
      }
    });
  };
  onRemoveUserPress = user => {
    console.log('user', user, 'user');
    const groupInfo = this?.props?.route?.params?.groupInfo;
    let payload = {
      event_id: groupInfo?.event_id ? groupInfo?.event_id : groupInfo?.id,
      user_id: user?.id,
    };
    console.log('payload', payload);
    this.props.removeUserFromEvent(payload, response => {
      if (response?.status == 1) {
        this.fetchPresentEventUsers();
      }
    });
  };
  response = () => {
    const socket = this.props?.socket;
    const groupInfo = this?.props?.route?.params?.groupInfo;
    const senderInfo = this?.props?.user;
    if (socket && socket !== null && typeof socket == 'object') {
      socket?.emit('group_event_get_messages', {
        user_id: senderInfo?.id,
        group_id: groupInfo?.event_group
          ? groupInfo?.event_group?.id
          : groupInfo?.id,
      });
      socket?.on('response', data => {
        console.log('response', data);
        if (data?.message?.length == 0) {
          loaderStopWithDispatch();
          return;
        }
        if (data?.object_type == 'get_messages') {
          const chatList = data?.data || [];
          this.setState({messages: chatList});
        } else if (data?.object_type == 'get_message') {
          const newData = [data?.data];
          this.setState(prevState => ({
            messages: [...newData, ...prevState?.messages],
          }));
          // setChatList(chatList => [...data?.data, ...chatList]);
        }
        loaderStopWithDispatch();
        LayoutAnimation.linear();
      });
      socket.on('error', data => {
        loaderStopWithDispatch();
      });
    }
  };
  render() {
    const {messages, eventComingUsers, userListPopupVisible} = this.state;
    const socket = this.props?.socket;
    const senderInfo = this?.props?.user;
    const groupInfo = this?.props?.route?.params?.groupInfo;
    const sendNewMessage = async (type, image) => {
      if (this.messageInput.current.length > 0) {
        loaderStartWithDispatch();
        const data = {
          sender_id: senderInfo?.id,
          group_id: groupInfo?.event_group
            ? groupInfo?.event_group?.id
            : groupInfo?.id,
          message: this.messageInput.current,
          chat_type: 'text',
        };
        socket?.emit('group_event_send_message', data);
        this.messageInput.current = '';
        this.messageInput.clear();
        LayoutAnimation.linear();
      } else {
        Toast.show({
          text1: 'Enter message',
          type: 'error',
          visibilityTime: 3000,
        });
      }
    };

    return (
      <AppBackground
        title={'Chat'}
        back
        profile={appImages.user1}
        setting
        settingsPress={() => this.setState({userListPopupVisible: true})}>
        <View style={styles.mainCont}>
          <FlatList
            data={messages}
            inverted
            showsVerticalScrollIndicator={false}
            style={styles.flatListStyle}
            contentContainerStyle={styles.flatListCont}
            renderItem={({item}) => (
              <Chats item={item} currentUser={this.props.user} />
            )}
          />

          <View style={[styles.flexRow, styles.messageView]}>
            <TextInput
              ref={input => {
                this.messageInput = input;
              }}
              style={styles.textInput}
              placeholder="Type a message....."
              placeholderTextColor={colors.gray}
              value={this.messageInput}
              onChangeText={text => {
                console.log(text);
                this.messageInput.current = text;
              }}
            />
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                sendNewMessage('text');
              }}
              style={styles.sendCont}>
              <Img
                local
                src={appIcons.send}
                style={styles.icon}
                resizeMode={'contain'}
              />
            </TouchableOpacity>
          </View>
        </View>
        <UserListModal
          isModalVisible={userListPopupVisible}
          togglePopup={() =>
            this.setState(previousState => ({
              userListPopupVisible: !previousState?.userListPopupVisible,
            }))
          }
          Title={'User List'}
          users={eventComingUsers}
          currentFocus={this}
          confirmationPopUp
          onBlockPress={this.onBlockPress}
          onRemoveUserPress={this.onRemoveUserPress}
        />
      </AppBackground>
    );
  }
}
const actions = {fetchUsersOfEvent, toggleBlockListUser, removeUserFromEvent};
function mapStateToProps({authReducer, appReducer}) {
  return {
    user: authReducer?.user,
    socket: appReducer?.socket,
  };
}
export default connect(mapStateToProps, actions)(Chat);
