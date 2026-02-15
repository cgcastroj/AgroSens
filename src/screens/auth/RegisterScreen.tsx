import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from '../../models/AuthStyles';
import { dbService } from '../../services/dbService';

interface RegisterScreenProps {
  navigation: any;
  onRegisterSuccess: () => void;
}

const InputField = ({ label, placeholder, secure, value, onChange, customStyle = {} }) => {
  const [secureMode, setSecureMode] = useState(secure);
  return (
    <View style={[{ marginBottom: 20 }, customStyle]}>
      <Text style={styles.label}>{label}</Text>
      <View style={secure ? styles.passwordContainer : null}>
        <TextInput
          style={secure ? styles.inputPassword : styles.input}
          placeholder={placeholder}
          secureTextEntry={secureMode}
          placeholderTextColor="#6C7278"
          value={value}
          onChangeText={onChange}
        />
        {secure && (
          <TouchableOpacity style={styles.eyeIcon} onPress={() => setSecureMode(!secureMode)}>
            <Ionicons name={secureMode ? 'eye-off-outline' : 'eye-outline'} size={22} color="#8E8E93" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const SocialLoginButtons = ({ onGoogle, onFacebook, onApple, onPhone }) => (
    <View style={styles.socialIconsContainer}>
      <TouchableOpacity style={styles.iconButton} onPress={onGoogle}>
        <Image source={require('../../../assets/ic_google.webp')} style={{ width: 24, height: 24, resizeMode: 'contain' }} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconButton} onPress={onFacebook}>
        <Image source={require('../../../assets/ic_facebook.webp')} style={{ width: 24, height: 24, resizeMode: 'contain' }} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconButton} onPress={onApple}>
        <Ionicons name="logo-apple" size={28} color="#1A1A1A" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconButton} onPress={onPhone}>
        <Ionicons name="phone-portrait-outline" size={26} color="#1A1A1A" />
      </TouchableOpacity>
    </View>
);

export default function RegisterScreen({ navigation, onRegisterSuccess }: RegisterScreenProps) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = () => {
    if (!firstName || !lastName || !email || !password) {
      Alert.alert('Error', 'Todos los campos son obligatorios');
      return;
    }

    try {
      dbService.createUser({
        firstName,
        lastName,
        email: email.toLowerCase().trim(),
        password
      });

      // Mensaje simple y redirección automática al cerrar
      Alert.alert(
        'Registro exitoso', 
        'Tu cuenta ha sido creada. Ya puedes iniciar sesión.',
        [
          { 
            text: 'OK', 
            onPress: () => onRegisterSuccess() 
          }
        ],
        { cancelable: false }
      );
      
      setFirstName('');
      setLastName('');
      setEmail('');
      setPassword('');

    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'El correo ya está registrado o hubo un fallo en la base de datos');
    }
  };

  return (
    <View style={styles.form}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <InputField 
          label="Nombre(s)" 
          placeholder="Carlos" 
          value={firstName} 
          onChange={setFirstName} 
          secure={false}
          customStyle={{ flex: 1, marginRight: 10 }}
        />
        <InputField 
          label="Apellidos" 
          placeholder="Soto Estrada" 
          value={lastName} 
          onChange={setLastName} 
          secure={false}
          customStyle={{ flex: 1 }}
        />
      </View>

      <InputField 
        label="Correo electrónico" 
        placeholder="ejemplo@gmail.com" 
        value={email} 
        onChange={setEmail} 
        secure={false} 
      />

      <InputField 
        label="Contraseña" 
        placeholder={"••••••••"} 
        value={password} 
        onChange={setPassword} 
        secure={true} 
      />

      <TouchableOpacity 
        style={styles.loginButton} 
        activeOpacity={0.85} 
        onPress={handleRegister}
      >
        <Text style={styles.loginButtonText}>Registrarse</Text>
      </TouchableOpacity>

      <View style={styles.socialDivider}>
        <View style={styles.line} />
        <Text style={styles.socialText}>O registrarse con</Text>
        <View style={styles.line} />
      </View>

      <SocialLoginButtons 
        onGoogle={() => console.log('Google')}
        onFacebook={() => console.log('Facebook')}
        onApple={() => console.log('Apple')}
        onPhone={() => console.log('Phone')}
      />
    </View>
  );
}