import React, {Component} from 'react';
import {FlatList, View, ActivityIndicator} from 'react-native';
import EventList from '../../../../../components/EventList';
import NavService from '../../../../../helpers/NavService';
import ListEmptyComponent from '../../../../../components/ListEmptyComponent';
import {colors} from '../../../../../utils';
import styles from './styles';

class Properties extends Component {
  render() {
    const {allProperties, loadMore, paginationInfo, isSearching} = this?.props;
    const ListFooterComponent = () => {
      return (
        <View style={styles.footerText}>
          {paginationInfo?.moreLoading && (
            <ActivityIndicator size={'small'} color={colors.primary} />
          )}
          {paginationInfo?.isListEnd && (
            <Text>No more properties at the moment</Text>
          )}
        </View>
      );
    };
    return (
      <>
        {allProperties?.length > 0 ? (
          <FlatList
            contentContainerStyle={styles.flatListCont}
            data={allProperties}
            ItemSeparatorComponent={() => <View style={{height: 15}} />}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) => index?.toString()}
            renderItem={({item}) => {
              return (
                <EventList
                  onPress={() =>
                    NavService.navigate('PropertyDetail', {
                      screenName: 'Properties',
                      propertyInfo: item,
                    })
                  }
                  item={item}
                  screenName="Properties"
                />
              );
            }}
            onEndReachedThreshold={0.5}
            onEndReached={!isSearching && loadMore}
            ListFooterComponent={<ListFooterComponent />}
            ListEmptyComponent={
              <ListEmptyComponent
                title={'No property found'}
                viewStyle={styles.noMessageView}
                titleStyle={styles.noMessageTitle}
              />
            }
          />
        ) : (
          <ListEmptyComponent
            title={'No property found'}
            viewStyle={styles.noMessageView}
            titleStyle={styles.noMessageTitle}
          />
        )}
      </>
    );
  }
}

export default Properties;
