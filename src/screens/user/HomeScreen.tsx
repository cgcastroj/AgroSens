import React, { useEffect, useState } from 'react';
import { View, Text, Button, ScrollView } from 'react-native';
import RNBluetoothClassic from 'react-native-bluetooth-classic';

export default function HomeScreen() {
  const [data, setData] = useState('');
  const [device, setDevice] = useState(null);

  const connect = async () => {
    try {
      const devices = await RNBluetoothClassic.getBondedDevices();
      const agroDevice = devices.find(d => d.name === 'AgroSens_Navolato');

      if (!agroDevice) {
        console.log('No encontrado');
        return;
      }

      const connected = await agroDevice.connect();
      setDevice(agroDevice);

      console.log('Conectado:', connected);
      readData(agroDevice);

    } catch (error) {
      console.error(error);
    }
  };

  const readData = async (device) => {
    while (true) {
      try {
        const message = await device.read();
        if (message) {
          setData(prev => prev + message + '\n');
        }
      } catch (err) {
        console.log('Error leyendo', err);
        break;
      }
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