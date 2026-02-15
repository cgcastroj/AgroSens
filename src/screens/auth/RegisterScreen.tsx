import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../navigation/AuthNavigator';

type RegisterScreenProp = NativeStackNavigationProp<AuthStackParamList, 'Register'>;

export default function RegisterScreen() {
  const navigation = useNavigation<RegisterScreenProp>();

  const goToLogin = () => navigation.navigate('Login');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registrarse</Text>
      {/* Aquí luego agregarás Inputs y lógica de registro */}
      <Button title="Ir a Login" onPress={goToLogin} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24, 
    marginBottom: 20,
  },
});
