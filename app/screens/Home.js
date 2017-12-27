import React, { Component } from 'react';
import { StatusBar, KeyboardAvoidingView, NetInfo } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { connectAlert } from '../components/Alert';

import { Container } from '../components/Container';
import { Logo } from '../components/Logo';
import { InputWithButton } from '../components/TextInput';
import { ClearButton } from '../components/Buttons';
import { LastConverted } from '../components/Text';
import { Header } from '../components/Header';
import { AnimateIn } from '../components/Animations';

import { swapCurrency, changeCurrencyAmount, getInitialConversion } from '../actions/currencies';
import { changeNetworkStatus } from '../actions/network';

class Home extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    dispatch: PropTypes.func,
    baseCurrency: PropTypes.string,
    quoteCurrency: PropTypes.string,
    amount: PropTypes.number,
    conversionRate: PropTypes.number,
    isFetching: PropTypes.bool,
    lastConvertedDate: PropTypes.object,
    primaryColor: PropTypes.string,
    alertWithType: PropTypes.func,
    currencyError: PropTypes.string,
    isConnected: PropTypes.bool,
  };

  componentWillMount() {
    this.props.dispatch(getInitialConversion());
    NetInfo.addEventListener('connectionChange', this.handleNetworkChange);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.currencyError && nextProps.currencyError !== this.props.currencyError) {
      this.props.alertWithType('error', 'Error', nextProps.currencyError);
    }
  }

  componentWillUnmount() {
    NetInfo.removeEventListener('connectionChange', this.handleNetworkChange);
  }

  handleNetworkChange = (info) => {
    this.props.dispatch(changeNetworkStatus(info.type));
  };

  handlePressBaseCurrency = () => {
    this.props.navigation.navigate('CurrencyList', {
      title: 'Base Currency',
      type: 'base',
    });
  };

  handlePressQuoteCurrency = () => {
    this.props.navigation.navigate('CurrencyList', {
      title: 'Quote Currency',
      type: 'quote',
    });
  };

  handleTextChange = (text) => {
    this.props.dispatch(changeCurrencyAmount(text));
  };

  handleSwapCurrency = () => {
    this.props.dispatch(swapCurrency());
  };

  handleOptionsPress = () => {
    this.props.navigation.navigate('Options');
  };

  handleDisconnectedPress = () => {
    this.props.alertWithType(
      'warn',
      'Not connected to the Internet',
      "Just a heads up that you're not connecred to the internet - some features may not work",
    );
  };

  render() {
    let quotePrice = (this.props.amount * this.props.conversionRate).toFixed(2);
    if (this.props.isFetching) {
      quotePrice = '...';
    }
    return (
      <Container backgroundColor={this.props.primaryColor}>
        <StatusBar translucent={false} barStyle="light-content" />
        <Header
          onPress={this.handleOptionsPress}
          isConnected={this.props.isConnected}
          onWarningPress={this.handleDisconnectedPress}
        />
        <KeyboardAvoidingView behavior="padding">
          <AnimateIn type="fromTop">
            <Logo tintColor={this.props.primaryColor} />
          </AnimateIn>
          <AnimateIn type="fadeIn" delay={500}>
            <InputWithButton
              buttonText={this.props.baseCurrency}
              onPress={this.handlePressBaseCurrency}
              defaultValue={this.props.amount.toString()}
              keyboardType="numeric"
              onChangeText={this.handleTextChange}
              textColor={this.props.primaryColor}
            />
            <InputWithButton
              buttonText={this.props.quoteCurrency}
              onPress={this.handlePressQuoteCurrency}
              value={quotePrice}
              editable={false}
              textColor={this.props.primaryColor}
            />
          </AnimateIn>
          <AnimateIn type="fromBottom" delay={750}>
            <LastConverted
              base={this.props.baseCurrency}
              quote={this.props.quoteCurrency}
              date={this.props.lastConvertedDate}
              conversionRate={this.props.conversionRate}
            />
            <ClearButton text="Reverse Currencies" onPress={this.handleSwapCurrency} />
          </AnimateIn>
        </KeyboardAvoidingView>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  const { baseCurrency, quoteCurrency, amount } = state.currencies;
  const conversionSelector = state.currencies.conversions[baseCurrency] || {};
  const rates = conversionSelector.rates || {};

  return {
    baseCurrency,
    quoteCurrency,
    amount,
    conversionRate: rates[quoteCurrency] || 0,
    isFetching: conversionSelector.isFetching,
    lastConvertedDate: conversionSelector.date ? new Date(conversionSelector.date) : new Date(),
    primaryColor: state.theme.primaryColor,
    currencyError: state.currencies.error,
    isConnected: state.network.connected,
  };
};

export default connect(mapStateToProps)(connectAlert(Home));
