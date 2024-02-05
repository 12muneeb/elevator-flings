import React, {Component} from 'react';
import {View, FlatList, ActivityIndicator} from 'react-native';
import CustomButton from '../../../../../components/CustomButton';
import EventList from '../../../../../components/EventList';
import NavService from '../../../../../helpers/NavService';
import ListEmptyComponent from '../../../../../components/ListEmptyComponent';
import {colors} from '../../../../../utils';
import styles from './styles';
class EventPosted extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {allEvents, loadMore, paginationInfo, isSearching} = this?.props;
    const ListFooterComponent = () => {
      return (
        <View style={styles.footerText}>
          {paginationInfo?.moreLoading && (
            <ActivityIndicator size={'small'} color={colors.primary} />
          )}
          {paginationInfo?.isListEnd && (
            <Text>No more events at the moment</Text>
          )}
        </View>
      );
    };
    return (
      <View style={styles.mainCont}>
        <CustomButton
          title="Past Events"
          onPress={() => NavService.navigate('PastEvents')}
          buttonStyle={styles.buttonStyle}
          textStyle={styles.btnTitle}
        />
        {allEvents?.length > 0 ? (
          <FlatList
            contentContainerStyle={styles.flatListCont}
            data={allEvents}
            ItemSeparatorComponent={() => <View style={{height: 15}} />}
            ListEmptyComponent={
              <ListEmptyComponent
                title={'No event found'}
                viewStyle={styles.noMessageView}
                titleStyle={styles.noMessageTitle}
              />
            }
            ListFooterComponent={<ListFooterComponent />}
            onEndReachedThreshold={0.5}
            onEndReached={!isSearching && loadMore}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) => index?.toString()}
            renderItem={({item}) => {
              return (
                <EventList
                  item={item}
                  onPress={() =>
                    NavService.navigate('EventDetail', {
                      screenName: 'EventPosted',
                      eventInfo: item,
                    })
                  }
                  screenName="EventPosted"
                />
              );
            }}
          />
        ) : (
          <ListEmptyComponent
            title={'No event found'}
            viewStyle={styles.noMessageView}
            titleStyle={styles.noMessageTitle}
          />
        )}
      </View>
    );
  }
}

export default EventPosted;
