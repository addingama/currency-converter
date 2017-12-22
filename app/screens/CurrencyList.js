import React, { Component } from 'react';
import { FlatList, Text, View, StatusBar } from 'react-native';

import { ListItem, Separator } from '../components/List';
import currencies from '../data/Currencies';

const TEMP_CURRENT_CURRENTCY = 'CAD';

class CurrencyList extends Component {
  state = {};

  handlePress = () => {
    console.log('row pressed');
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar barStyle="default" translucent={false} />
        <FlatList
          data={currencies}
          renderItem={({ item }) => (
            <ListItem
              text={item}
              selected={item === TEMP_CURRENT_CURRENTCY}
              onPress={this.handlePress}
              checkmark
              visible
            />
          )}
          keyExtractor={item => item}
          ItemSeparatorComponent={Separator}
        />
      </View>
    );
  }
}

export default CurrencyList;
