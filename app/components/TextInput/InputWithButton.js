import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableHighlight, TextInput, Animated } from 'react-native';
import color from 'color';

import styles from './styles';

class InputWithButton extends Component {
  static propTypes = {
    onPress: PropTypes.func,
    buttonText: PropTypes.string,
    editable: PropTypes.bool,
    textColor: PropTypes.string,
    value: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.backgroundColor = new Animated.Value(0);
  }

  componentDidUpdate(prevProps, prevState) {
    if (parseFloat(this.props.value)) {
      Animated.sequence([
        Animated.timing(this.backgroundColor, {
          toValue: 1,
        }),
        Animated.timing(this.backgroundColor, {
          toValue: 0,
        }),
      ]).start();
    }
  }

  render() {
    const { buttonText, onPress, editable = true } = this.props;
    const containerStyles = [styles.container];
    const underlayColor = color(styles.$buttonBackgroundColorBase).darken(styles.$buttonBackgroundColorModifier);

    if (editable === false) {
      // containerStyles.push(styles.containerDisabled);
      containerStyles.push({
        backgroundColor: this.backgroundColor.interpolate({
          inputRange: [0, 1],
          outputRange: [styles.$inputBackgroundBase, styles.$inputBackgroundAlt],
        }),
      });
    }

    const buttonTextStyles = [styles.buttonText];
    if (this.props.textColor) {
      buttonTextStyles.push({ color: this.props.textColor });
    }
    return (
      <Animated.View style={containerStyles}>
        <TouchableHighlight
          style={styles.buttonContainer}
          onPress={onPress}
          underlayColor={underlayColor}
        >
          <Text style={buttonTextStyles}>{buttonText}</Text>
        </TouchableHighlight>
        <View style={styles.border} />
        <TextInput
          style={styles.input}
          editable={editable}
          underlineColorAndroid="transparent"
          {...this.props}
        />
      </Animated.View>
    );
  }
}

export default InputWithButton;
