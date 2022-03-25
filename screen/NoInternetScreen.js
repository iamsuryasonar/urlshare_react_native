import React, {useState, useEffect} from 'react';
import {Modal,ActivityIndicator, Alert, Pressable, View, Text} from 'react-native';
function NoInternet() {
  return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#fff',
          paddingHorizontal: 16,
        }}>
        <ActivityIndicator size="large" color="#00ff00" />
        <Text
          style={{
            fontSize: 18,
            color: '#555',
            marginTop: 14,
            textAlign: 'center',
            marginBottom: 10,
          }}>
          Oops! Looks like your device is not connected to the Internet.
        </Text>
      </View>
  );
}
export default NoInternet;
