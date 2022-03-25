import React from 'react';
import {Dimensions, StyleSheet, Modal, Image} from 'react-native';

function SplashScreen(prop) {
  return (
    <Modal
      visible={prop.isVisible}
      animationType={'fade'}
      style={styles.container}>
      <Image
        style={styles.logoimage}
        source={require('../assets/splashimage.png')}
      />
    </Modal>
  );
}
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
  },
  logoimage: {
    width: '100%',
    height: '100%',
  },
});
export default SplashScreen;
