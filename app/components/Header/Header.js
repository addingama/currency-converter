import React from 'react';
import PropTypes from 'prop-types';
import { View, Image, TouchableOpacity } from 'react-native';

import styles from './styles';

const Header = ({ onPress, onWarningPress, isConnected }) => (
  <View style={styles.container}>
    {!isConnected ? (
      <TouchableOpacity style={styles.button} onPress={onWarningPress}>
        <Image style={styles.icon} resizeMode="contain" source={require('./images/warning.png')} />
      </TouchableOpacity>
    ) : null}
    <TouchableOpacity style={[styles.button, styles.buttonRight]} onPress={onPress}>
      <Image style={styles.icon} resizeMode="contain" source={require('./images/gear.png')} />
    </TouchableOpacity>
  </View>
);

Header.propTypes = {
  onPress: PropTypes.func,
  onWarningPress: PropTypes.func,
  isConnected: PropTypes.bool,
};

export default Header;
