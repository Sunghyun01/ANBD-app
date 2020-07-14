import React,{Component} from 'react';
import { StyleSheet, View,TouchableHighlight,AntDesign,BackHandler,ToastAndroid  } from 'react-native';
import { WebView } from 'react-native-webview';
import { getStatusBarHeight } from 'react-native-status-bar-height';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      height: 0
    }
    this.WEBVIEW_REF = React.createRef();
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }

  handleBackButton = ()=>{
    console.log(this.WEBVIEW_REF.current.startUrl);
    if(this.WEBVIEW_REF.current.startUrl != "https://jsh2.innoi.kr/home/"){
      this.WEBVIEW_REF.current.goBack()
    }else{
      if (this.exitApp == undefined || !this.exitApp) {
        ToastAndroid.show('한번 더 누르시면 종료됩니다.', ToastAndroid.SHORT);
        this.exitApp = true;

        this.timeout = setTimeout(
            () => {
                this.exitApp = false;
            },
            2000    // 2초
        );
    } else {
        clearTimeout(this.timeout);

        BackHandler.exitApp();  // 앱 종료
    }
    }
    return true;
  }

  onNavigationStateChange(navState) {
    this.setState({
      canGoBack: navState.canGoBack
    });
  }

  onBack = () => {
    console.log(this.state.canGoBack);
    if (this.state.canGoBack){
      this.refs[WEBVIEW_REF].goBack();
    }else{
      BackHandler.exitApp();
    }
     
  }

  render(){
    var scripts = "setContent('<h1>Yay!</h1>');fireEvent('resize', '300')";
    return (
      <WebView
        source={{ uri: "https://jsh2.innoi.kr/home/" }}
        ref={this.WEBVIEW_REF}
        injectedJavaScript= { scripts }
        scalesPageToFit={ false }
        onNavigationStateChange={this.onNavigationStateChange.bind(this)}
        style= {{ marginTop:getStatusBarHeight() }}
      />
    )
  }
}
