import React, {Component} from 'react';
import {FlatList, Keyboard, Text, View} from 'react-native';
import {connect} from 'react-redux';
import AppBackground from '../../../components/AppBackground';
import Search from '../../../components/Search';
import MessageList from '../../../components/MessageList';
import {getChatList} from '../../../redux/actions/appAction';
import styles from './styles';

class Message extends Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
      chatList: [],
      searchList: [],
    };
  }
  componentDidMount() {
    this.focusListener = this.props.navigation.addListener('focus', () => {
      this.fetchChatList();
    });
  }
  componentWillUnmount() {
    this.focusListener();
  }
  fetchChatList = () => {
    this.props.getChatList(data => {
      console.log('data,data', data);
      if (data?.length > 0) {
        this.setState({chatList: data});
      } else {
        this.setState({chatList: []});
      }
    });
  };
  render() {
    const {searchList, chatList, searchText} = this.state;

    const ListEmptyComponent = () => {
      return (
        <View style={styles.noMessageView}>
          <Text style={styles.noMessageTitle}>No message Found</Text>
        </View>
      );
    };

    const SearchData = async text => {
      Keyboard.dismiss();
      this.setState({searchText: text});
      console.log(text);
      this.setState({searchList: []});
    };
    return (
      <AppBackground back title={'Messages'} marginHorizontal={false}>
        <View style={styles.mainCont}>
          {/* <Search
            searcIcon
            marginHorizontal={true}
            SearchData={text => SearchData(text)}
          /> */}
          <FlatList
            contentContainerStyle={styles.flatListCont}
            data={searchText ? searchList : chatList}
            ListEmptyComponent={<ListEmptyComponent />}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => <MessageList item={item} />}
          />
        </View>
      </AppBackground>
    );
  }
}
const actions = {getChatList};
function mapStateToProps({authReducer}) {
  return {
    user: authReducer?.user,
  };
}
export default connect(mapStateToProps, actions)(Message);
