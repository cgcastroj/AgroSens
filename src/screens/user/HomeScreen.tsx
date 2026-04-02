import React, { useState } from 'react';
import { View, Text, Button, ScrollView, PermissionsAndroid, Platform, Alert } from 'react-native';
import RNBluetoothClassic from 'react-native-bluetooth-classic';

export default function HomeScreen() {
  const [data, setData] = useState('');
  const [device, setDevice] = useState(null);

  // 🔐 Pedir permisos
  const requestPermissions = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      ]);

      return Object.values(granted).every(
        (permission) => permission === PermissionsAndroid.RESULTS.GRANTED
      );
    }
    return true;
  };

  // 🔌 Conectar
  const connect = async () => {
    try {
      const hasPermissions = await requestPermissions();

      if (!hasPermissions) {
        Alert.alert('Permisos', 'Debes aceptar los permisos de Bluetooth');
        return;
      }

      const devices = await RNBluetoothClassic.getBondedDevices();
      console.log('Dispositivos:', devices);

      const agroDevice = devices.find(d => d.name === 'AgroSens_Navolato');

      if (!agroDevice) {
        Alert.alert('Error', 'Dispositivo no encontrado. Verifica que esté emparejado.');
        return;
      }

      const connected = await agroDevice.connect();

      if (!connected) {
        Alert.alert('Error', 'No se pudo conectar');
        return;
      }

      setDevice(agroDevice);
      console.log('Conectado');

      readData(agroDevice);

    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Fallo al conectar');
    }
  };

  // 📡 Leer datos
  const readData = async (device) => {
    try {
      while (true) {
        const message = await device.read();

        if (message) {
          setData(prev => prev + message + '\n');
        }
      }
    } catch (err) {
      console.log('Error leyendo', err);
    }
  };

  return (
    <View style={{ 
      flex: 1, 
      justifyContent: 'center', 
      alignItems: 'center', 
      padding: 20 
    }}>
      
      <Button title="Conectar a Arduino" onPress={connect} />

      {data !== '' && (
        <ScrollView style={{ marginTop: 20, width: '100%' }}>
          <Text>{data}</Text>
        </ScrollView>
      )}

    </View>
  );
}