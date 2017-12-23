import React from 'react';
import PropTypes from 'prop-types';
import { Image, ImageBackground, View, Text } from 'react-native';

import styles from './styles';

const Logo = ({ tintColor }) => {
  const imageStyles = [styles.image, tintColor ? { tintColor } : null];
  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.containerImage}
        source={require('./images/background.png')}
        resizeMode="contain"
      >
        <Image style={imageStyles} source={require('./images/logo.png')} resizeMode="contain" />
      </ImageBackground>
      <Text style={styles.text}>Currency Converter</Text>
    </View>
  );
};

Logo.propTypes = {
  tintColor: PropTypes.string,
};

export default Logo;
