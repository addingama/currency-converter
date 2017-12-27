import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Animated, Dimensions } from 'react-native';

const WINDOW_DIMENSION = Dimensions.get('window');

class AnimateIn extends Component {
  static propTypes = {
    children: PropTypes.any,
    type: PropTypes.oneOf(['fromBottom', 'fromTop', 'fadeIn']),
    delay: PropTypes.number,
    duration: PropTypes.number,
  };

  constructor(props) {
    super(props);
    this.animatedValue = new Animated.Value(0);
  }

  componentDidMount() {
    Animated.timing(this.animatedValue, {
      toValue: 1,
      delay: this.props.delay || 0,
      duration: this.props.duration || 500,
    }).start();
  }

  render() {
    let styles = {};
    const { type } = this.props;
    if (type === 'fromTop') {
      styles = {
        opacity: this.animatedValue,
        transform: [
          {
            translateY: this.animatedValue.interpolate({
              inputRange: [0, 1],
              outputRange: [-WINDOW_DIMENSION.height, 0],
            }),
          },
        ],
      };
    } else if (type === 'fadeIn') {
      styles = {
        opacity: this.animatedValue,
        transform: [
          {
            scale: this.animatedValue,
          },
        ],
      };
    } else if (type === 'fromBottom') {
      styles = {
        opacity: this.animatedValue,
        transform: [
          {
            translateY: this.animatedValue.interpolate({
              inputRange: [0, 1],
              outputRange: [WINDOW_DIMENSION.height, 0],
            }),
          },
        ],
      };
    }
    return (
      <Animated.View
        delay={this.props.delay}
        style={[{ width: '100%', alignSelf: 'center' }, styles]}
      >
        {this.props.children}
      </Animated.View>
    );
  }
}

export default AnimateIn;
