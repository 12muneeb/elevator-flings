import React, {Component} from 'react';
import {
  FlatList,
  View,
  TouchableOpacity,
  RefreshControl,
  ScrollView,
  Text,
} from 'react-native';
import {connect} from 'react-redux';
import moment from 'moment';
import AppBackground from '../../../components/AppBackground';
import ListEmptyComponent from '../../../components/ListEmptyComponent';
import CarouselComponent from '../../../components/CarouselComponent';
import Img from '../../../components/Img';
import {appIcons} from '../../../assets';
import CustomText from '../../../components/CustomText';
import GroupImages from '../../../components/GroupImages';
import UserList from '../../../components/UserList';
import NavService from '../../../helpers/NavService';
import {
  toggleBlockListUser,
  removeUserFromEvent,
} from '../../../redux/actions/appAction';
import appStyles from '../../appStyles';
import styles from './styles';

class EventUsersList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userList: this.props.route.params.coming_users,
    };
  }
  onBlockPress = (user, blockType) => {
    console.log('user', user);
    let payload = {block_user_id: user?.id, type: blockType};
    console.log('payload', payload);
    this.props.toggleBlockListUser(payload, response => {
      if (response?.status == 1) {
        if (blockType == 'block') {
            const currentUsers = this.state.userList;
            const currentUser = currentUsers?.filter(
              (userInfo, index) => userInfo?.id == user?.id,
            );
            const getUserPlacementIndex = currentUsers?.findIndex(
              (userInfo, index) => userInfo?.id == user?.id,
            );
            currentUser[0]['status'] = 'Block';
            currentUsers?.splice(getUserPlacementIndex, 1, currentUser[0]);
            this.setState({userList: currentUsers});
        } else {
          const currentUsers = this.state.userList;
          const currentUser = currentUsers?.filter(
            (userInfo, index) => userInfo?.id == user?.id,
          );
          const getUserPlacementIndex = currentUsers?.findIndex(
            (userInfo, index) => userInfo?.id == user?.id,
          );
          currentUser[0]['status'] = 'unBlock';
          currentUsers?.splice(getUserPlacementIndex, 1, currentUser[0]);
          this.setState({userList: currentUsers});
        }
      }
    });
  };
  onRemoveUserPress = user => {
    console.log('user', user, 'user');
    const event_id = this?.props?.route?.params?.event_id;
    let payload = {
      event_id: event_id,
      user_id: user?.id,
    };
    console.log('payload', payload);
    this.props.removeUserFromEvent(payload, response => {
      if (response?.status == 1) {
        const currentUsers = this.state.userList;
        const remainingUsers = currentUsers?.filter(
          (userInfo, index) => userInfo?.id !== user?.id,
        );
        this.setState({userList: remainingUsers});
      }
    });
  };
  render() {
    const {userList} = this.state;
    return (
      <AppBackground title={'Users List'} back marginHorizontal={false}>
        <FlatList
          contentContainerStyle={styles.flatListCont}
          data={userList}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => {
            return (
              <UserList
                item={item}
                screenName={'event List'}
                containerStyles={{...appStyles.w_90}}
                unBlockPress={() => {
                  //   togglePopup();
                  //   setTimeout(() => {
                  //     unBlockPress(item);
                  //   }, 500);
                }}
                onBlockPress={blockType => {
                  //   togglePopup();
                  setTimeout(() => {
                    this.onBlockPress(item, blockType);
                  }, 500);
                }}
                onRemoveUserPress={() => {
                  //   togglePopup();
                  setTimeout(() => {
                    this.onRemoveUserPress(item);
                  }, 500);
                }}
              />
            );
          }}
          ListEmptyComponent={
            <ListEmptyComponent
              title={'No event members found'}
              viewStyle={styles.noMessageView}
              titleStyle={styles.noMessageTitle}
            />
          }
        />
      </AppBackground>
    );
  }
}

const actions = {toggleBlockListUser, removeUserFromEvent};
export default connect(null, actions)(EventUsersList);
