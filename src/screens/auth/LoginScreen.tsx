import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from '../../models/AuthStyles';
import { dbService } from '../../services/dbService';
import { useAuth } from '../../hooks/useAuth'; // ✅ IMPORTANTE

const InputField = ({ label, placeholder, secure, value, onChange }) => {
  const [secureMode, setSecureMode] = useState(secure);

  return (
    <View style={{ marginBottom: 20 }}>
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
          <TouchableOpacity
            style={styles.eyeIcon}
            onPress={() => setSecureMode(!secureMode)}
          >
            <Ionicons
              name={secureMode ? 'eye-off-outline' : 'eye-outline'}
              size={22}
              color="#8E8E93"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const SocialLoginButtons = ({ onGoogle, onFacebook, onApple, onPhone }) => (
  <View style={styles.socialIconsContainer}>
    <TouchableOpacity style={styles.iconButton} onPress={onGoogle}>
      <Image
        source={require('../../../assets/ic_google.webp')}
        style={{ width: 24, height: 24, resizeMode: 'contain' }}
      />
    </TouchableOpacity>

    <TouchableOpacity style={styles.iconButton} onPress={onFacebook}>
      <Image
        source={require('../../../assets/ic_facebook.webp')}
        style={{ width: 24, height: 24, resizeMode: 'contain' }}
      />
    </TouchableOpacity>

    <TouchableOpacity style={styles.iconButton} onPress={onApple}>
      <Ionicons name="logo-apple" size={28} color="#1A1A1A" />
    </TouchableOpacity>

    <TouchableOpacity style={styles.iconButton} onPress={onPhone}>
      <Ionicons name="phone-portrait-outline" size={26} color="#1A1A1A" />
    </TouchableOpacity>
  </View>
);

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signIn } = useAuth(); // ✅ usamos el contexto

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert('Atención', 'Por favor ingresa tu correo y contraseña');
      return;
    }

    try {
      const user = dbService.getUserByEmail(email.toLowerCase().trim());

      if (user && user.password === password) {
        signIn(user.email); 
      } else {
        Alert.alert('Error', 'Correo electrónico o contraseña incorrectos');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Hubo un problema al intentar iniciar sesión');
    }
  };

  return (
    <View style={styles.form}>
      <InputField 
        label="Correo electrónico" 
        placeholder="ejemplo@gmail.com"
        value={email}
        onChange={setEmail}
        secure={false}
      />

      <InputField 
        label="Contraseña"
        placeholder="••••••••"
        value={password}
        onChange={setPassword}
        secure={true}
      />

      <TouchableOpacity activeOpacity={0.7}>
        <Text style={styles.forgotPassword}>Olvidé mi contraseña</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.loginButton}
        activeOpacity={0.85}
        onPress={handleLogin}
      >
        <Text style={styles.loginButtonText}>Iniciar sesión</Text>
      </TouchableOpacity>

      <View style={styles.socialDivider}>
        <View style={styles.line} />
        <Text style={styles.socialText}>O iniciar sesión con</Text>
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