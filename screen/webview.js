import React, {useState, useEffect, useRef} from 'react';
import NetInfo from '@react-native-community/netinfo';
import {BackHandler, Platform, ToastAndroid} from 'react-native';
import {WebView} from 'react-native-webview';
import SplashScreen from './SplashScreen';
import NoInternetScreen from './NoInternetScreen';
import {
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  Alert,
  View,
} from 'react-native';

export default function Webview() {
  const webView = useRef(null);
  // cangoback tracks if go-back is available in the webview
  const [canGoBack, setCanGoBack] = useState(false);
  const [isOffline, setOfflineStatus] = useState(false);

  useEffect(() => {
    const unsubscribeNetInfo = NetInfo.addEventListener(state => {
      const offline = !(state?.isConnected && state?.isInternetReachable);
      setOfflineStatus(offline);
      if (offline === false) {
        webView.current.reload();
      }
    });
    return () => unsubscribeNetInfo();
  }, []);

  useEffect(() => {
    const backAction = () => {
      if (canGoBack && webView?.current) {
        webView?.current?.goBack(); //go back a single webview page
        return true; //returning true disables default back action
      } else {
        Alert.alert(
          'Hold on!',
          'Are you sure you want to go back?',
          [
            {
              text: 'Cancel',
              onPress: () => null,
              style: 'cancel',
            },
            {text: 'YES', onPress: () => BackHandler.exitApp()},
          ],
          {cancelable: true},
        );
        return true; //returning true disables default back action
      }
    };
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
    return () => backHandler.remove();
  }, [canGoBack]);

  return (
    <SafeAreaView style={{flex: 1}}>
      {isOffline ? (
        <NoInternetScreen />
      ) : (
        <WebView
          onError={() => {
            //do nothing
          }}
          ref={webView}
          source={{
            uri: 'https://urlshare.netlify.app',
          }}
          renderLoading={() => <SplashScreen />}
          startInLoadingState={true}
          onLoadProgress={event => setCanGoBack(event?.nativeEvent?.canGoBack)}
        />
      )}
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({});
