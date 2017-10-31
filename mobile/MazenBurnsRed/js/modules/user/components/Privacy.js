// import react things
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

// import react-native components
import Dimensions from 'Dimensions';
import Image from 'Image';
import ListView from 'ListView';
import Platform from 'Platform';
import ScrollView from 'ScrollView';
import StyleSheet from 'StyleSheet';
import Text from 'Text';
import TouchableOpacity from 'TouchableOpacity';
import View from 'View';
import WebView from 'WebView';

// import global components
import Base from '../../../global/components/BaseComponent';
import ScrollContainer from '../../../global/components/ScrollContainer';
import YTButton from '../../../global/components/YTButton';
import YTCard from '../../../global/components/YTCard';
import YTHeader from '../../../global/components/YTHeader';
import YTTouchable from '../../../global/components/YTTouchable';

// import libraries
import moment from 'moment';

// import styles
import YTColors from '../../../global/styles/YTColors';

var styles = StyleSheet.create({
  btnWrapper: {
    borderTopWidth: 1
    , borderColor: YTColors.listSeparator
  }
  , container: {
      flex: 1
      , backgroundColor: YTColors.lightBackground
    }
  , instructions: {
      textAlign: 'center'
      , color: '#222'
      , marginBottom: 5
    }
});

class Privacy extends Base {
  constructor(props){
    super(props);
    this._bind(
      '_onNavigationStateChange'
      , '_goBack'
    )
  }

  _onNavigationStateChange() {
    console.log("_onNavigationStateChange");
  }

  _goBack() {
    this.props.navigator.pop();
  }

  render() {
    const { user } = this.props;
    const headerStyle = {
      background: {
        backgroundColor: 'transparent'
      },
      title: {
        color: YTColors.darkText
      },
      itemsColor: YTColors.darkText
    }
    const leftItem = {
      title: 'Close',
      onPress: () => this._goBack(),
    };

    return(
      <View style={[styles.container ]} >
        <YTHeader
          navigator={navigator}
          leftItem={leftItem}
          title="Privacy"
          headerStyle={headerStyle}
        />
        <WebView
          ref="webview"
          automaticallyAdjustContentInsets={false}
          style={styles.webView}
          source={{uri: "http://www.propatient.com/privacy-policy.html"}}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          decelerationRate="normal"
          onNavigationStateChange={this._onNavigationStateChange}
          onShouldStartLoadWithRequest={() => true}
          startInLoadingState={true}
          scalesPageToFit={true}
        />
      </View>
    )
  }
}

const mapStoreToProps = (store) => {
  return {
    user: store.user.current,
    isFetching: store.user.isFetching,
  }
}

export default connect(mapStoreToProps)(Privacy);
