import React from 'react';
import {StyleSheet, TouchableOpacity, View, FlatList} from 'react-native';
import CustomModal from '../../../components/CustomModal';
import {colors} from '../../../utils';
import Img from '../../../components/Img';
import {appIcons} from '../../../assets';
import CustomText from '../../../components/CustomText';
import UserList from '../../../components/UserList';
import appStyles from '../../../screens/appStyles';
import ListEmptyComponent from '../../../components/ListEmptyComponent';

function UserListModal({
  isModalVisible = false,
  currentFocus,
  onSubmit = () => {},
  togglePopup = () => {},
  Title,
  users,
  screenName,
  onBlockPress,
  unBlockPress,
  onRemoveUserPress,
}) {
  return (
    <CustomModal visible={isModalVisible} togglePopup={togglePopup}>
      <View style={styles.modalView}>
        <View style={[styles.subCont]}>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={togglePopup}
            style={styles.closeBtn}>
            <Img
              local
              src={appIcons.close}
              style={styles.closeIcon}
              tintColor={colors.primary}
              resizeMode={'contain'}
            />
          </TouchableOpacity>
          <CustomText text={Title} style={styles.requestTitle} />
          <FlatList
            contentContainerStyle={styles.flatListCont}
            data={users}
            showsVerticalScrollIndicator={false}
            renderItem={({item}) => {
              return (
                <UserList
                  item={item}
                  screenName={screenName}
                  unBlockPress={() => {
                    togglePopup();
                    setTimeout(() => {
                      unBlockPress(item);
                    }, 500);
                  }}
                  onBlockPress={blockType => {
                    togglePopup();
                    setTimeout(() => {
                      onBlockPress(item, blockType);
                    }, 500);
                  }}
                  onRemoveUserPress={() => {
                    togglePopup();
                    setTimeout(() => {
                      onRemoveUserPress(item);
                    }, 500);
                  }}
                />
              );
            }}
            ListEmptyComponent={
              <ListEmptyComponent
                title={
                  screenName == 'Blocked Profiles'
                    ? 'No blocked users found'
                    : 'No group members found'
                }
                viewStyle={styles.noMessageView}
                titleStyle={styles.noMessageTitle}
              />
            }
          />
        </View>
      </View>
    </CustomModal>
  );
}

const styles = StyleSheet.create({
  modalView: {
    ...appStyles.w100,
    borderRadius: 10,
    backgroundColor: colors.white,
  },

  closeIcon: {
    width: 13,
    height: 13,
    alignSelf: 'flex-end',
    marginRight: 20,
  },

  flexRow: {
    ...appStyles.directionRow,
    ...appStyles.alignCenter,
  },

  subCont: {
    ...appStyles.w100,
    ...appStyles.alignCenter,
    backgroundColor: colors.white,
    paddingHorizontal: 10,
    borderRadius: 10,
    paddingVertical: 15,
  },

  Title: {
    ...appStyles.font14,
    ...appStyles.family_SofiaPro_Medium,
    color: colors.black,
  },

  closeBtn: {
    alignSelf: 'flex-end',
  },

  closeIcon: {
    width: 10,
    height: 10,
  },

  requestTitle: {
    color: colors.black,
    ...appStyles.family_SofiaPro_Medium,
    ...appStyles.font16,
    textAlign: 'center',
    marginVertical: 6,
    marginBottom: 5,
  },

  flatListCont: {
    marginTop: 3,
  },
  noMessageView: {
    ...appStyles.mainContainer,
    ...appStyles.justifyCenter,
    ...appStyles.alignCenter,
    ...appStyles.marginVertical2Percent,
  },

  noMessageTitle: {
    ...appStyles.family_SofiaPro_Black,
    color: colors.black,
  },
});

export default UserListModal;
