import React, { Component } from 'react';
import { WebView } from 'react-native-webview';

class PaymentScreen extends Component {
  // webview = null;
  constructor(props){
    super(props);
    // const {domain} = this.props.route;
    console.log(this.props.route)
    this.handleWebViewNavigationStateChange = this.handleWebViewNavigationStateChange.bind(this);
  }

  //  Navigate_To_Next_Page = () => {
  //   this.props.navigation.reset({
  //       index: 0,
  //       routes: [{ name: 'Payment', }],
  //     });
  // }

  handleWebViewNavigationStateChange = newNavState => {
    const { url } = newNavState;
    if (!url) return;
    // redirect somewhere else
    if (url.includes('http://67.222.135.25:4724/MobilePaymentResponse.aspx')) {
      console.log('This is the URL', url);
      this.props.navigation.reset({
        index: 0,
        routes: [{ name: 'History', }],
      })
    }
  };

  render() {
    return (
      <WebView
        // ref={ref => (this.webview = ref)}
        style={{ marginTop: 20, backgroundColor: '#fff' }}
        source={{ uri: this.props.route.params.domain }}
        onNavigationStateChange={this.handleWebViewNavigationStateChange}
      />
    );
  }
}

export default PaymentScreen;