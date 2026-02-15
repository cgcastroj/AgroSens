import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {Animated, Dimensions } from 'react-native';
import AuthNavigator from '../../navigation/AuthNavigator';

const { width } = Dimensions.get('window');
const PADDING = 4;
// 60 es el padding horizontal total (30 de cada lado)
const TAB_WIDTH = (width - 60 - (PADDING * 2)) / 2;

/** Componentes pequeños y reutilizables */
const TabSwitcher = ({ activeTab, onChange, navigation }) => (
  <View style={styles.tabContainer}>
    {['Iniciar sesión', 'Registrarse'].map((tab) => (
      <TouchableOpacity
        key={tab}
        style={activeTab === tab ? styles.activeTab : styles.inactiveTab}
        onPress={() => {
          onChange(tab);
          if (tab === 'Registrarse') {
            navigation.navigate('Register'); // llama a la pantalla de registro
          }
        }}
        activeOpacity={0.7}
      >
        <Text style={activeTab === tab ? styles.activeTabText : styles.inactiveTabText}>
          {tab}
        </Text>
      </TouchableOpacity>
    ))}
  </View>
);


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
            activeOpacity={0.7}
          >
            <Ionicons name={secureMode ? 'eye-off-outline' : 'eye-outline'} size={22} color="#8E8E93" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const SocialLoginButtons = () => {
  return (
    <View style={styles.socialIconsContainer}>
      {/* Google desde imagen */}
      <TouchableOpacity style={styles.iconButton} activeOpacity={0.6}>
        <Image
          source={require('../../../assets/ic_google.webp')}
          style={{ width: 24, height: 24, resizeMode: 'contain' }}
        />
      </TouchableOpacity>

      {/* Facebook desde imagen */}
      <TouchableOpacity style={styles.iconButton} activeOpacity={0.6}>
        <Image
          source={require('../../../assets/ic_facebook.webp')}
          style={{ width: 24, height: 24, resizeMode: 'contain' }}
        />
      </TouchableOpacity>

      {/* Apple desde Ionicons */}
      <TouchableOpacity style={styles.iconButton} activeOpacity={0.6}>
        <Ionicons name="logo-apple" size={24} color="#1A1A1A" />
      </TouchableOpacity>

      {/* Celular desde Ionicons */}
      <TouchableOpacity style={styles.iconButton} activeOpacity={0.6}>
        <Ionicons name="phone-portrait-outline" size={24} color="#1A1A1A" />
      </TouchableOpacity>
    </View>
  );
};

/** Pantalla principal */
export default function LoginScreen({ navigation }) {
  const [activeTab, setActiveTab] = useState('Iniciar sesión');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Image source={require('../../../assets/logo.webp')} style={styles.logoIcon} />
          <Text style={styles.brandName}>
            Agro<Text style={styles.brandGreen}>Sens</Text>
          </Text>
        </View>

      <TabSwitcher
        activeTab={activeTab}
        onChange={setActiveTab}
        navigation={navigation} // <-- pasamos navigation
      />

      <View style={styles.form}>
        <InputField
          label="Correo electrónico"
          placeholder=""
          secure={false}
          value={email}
          onChange={setEmail}
        />
        <InputField
          label="Contraseña"
          placeholder=""
          secure={true}
          value={password}
          onChange={setPassword}
        />

        <TouchableOpacity activeOpacity={0.7}>
          <Text style={styles.forgotPassword}>Olvidé mi contraseña</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.loginButton} activeOpacity={0.85}>
          <Text style={styles.loginButtonText}>Iniciar sesión</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.socialDivider}>
        <View style={styles.line} />
        <Text style={styles.socialText}>O iniciar sesión con</Text>
        <View style={styles.line} />
      </View>

      <SocialLoginButtons />
    </View>
  </SafeAreaView>
);

}

/** Estilos */
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FBFC' },
  content: { paddingHorizontal: 30, alignItems: 'center' },
  header: { marginTop: 80, alignItems: 'center' },
  logoIcon: { width: 60, height: 60, marginBottom: 10 },
  brandName: { fontSize: 32, fontFamily: 'Inter-Bold', color: '#1A1A1A' },
  brandGreen: { color: '#27AE60', fontFamily: 'Inter-Bold' },
  tabContainer: { flexDirection: 'row', backgroundColor: '#E5E5EA', borderRadius: 7, marginTop: 30, padding: 4, width: '100%', height: 42 },
  activeTab: { flex: 1, backgroundColor: '#FFFFFF', borderRadius: 6, paddingVertical: 7, alignItems: 'center', elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1 },
  inactiveTab: { flex: 1, paddingVertical: 7, alignItems: 'center' },
  activeTabText: { fontFamily: 'Inter-SemiBold', color: '#1A1A1A' },
  inactiveTabText: { fontFamily: 'Inter-Regular', color: '#6C7278' },
  form: { width: '100%', marginTop: 30 },
  label: { fontSize: 14, fontFamily: 'Inter-Regular', color: '#6C7278', marginBottom: 8 },
  input: { height: 48, borderWidth: 1, borderColor: '#E5E5EA', borderRadius: 10, paddingHorizontal: 15, marginBottom: 0, fontSize: 14, fontFamily: 'Inter-Regular', color: '#1A1A1A' },
  passwordContainer: { flexDirection: 'row', height: 48, borderWidth: 1, borderColor: '#E5E5EA', borderRadius: 10, paddingHorizontal: 15, alignItems: 'center' },
  inputPassword: { flex: 1, height: '100%', fontSize: 14, fontFamily: 'Inter-Regular', color: '#1A1A1A' },
  eyeIcon: { padding: 5, justifyContent: 'center', alignItems: 'center'},
  forgotPassword: { color: '#27AE60', textAlign: 'right', fontFamily: 'Inter-SemiBold' },
  loginButton: { backgroundColor: '#27AE60', borderRadius: 12, height: 52, justifyContent: 'center', alignItems: 'center', marginTop: 30 },
  loginButtonText: { color: '#FFFFFF', fontSize: 16, fontFamily: 'Inter-SemiBold' },
  socialDivider: { flexDirection: 'row', alignItems: 'center', marginTop: 40, width: '100%' },
  line: { flex: 1, height: 1, backgroundColor: '#E5E5EA' },
  socialText: { marginHorizontal: 10, color: '#6C7278', fontSize: 14, fontFamily: 'Inter-Regular' },
  socialIconsContainer: { flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginTop: 30 },
  iconButton: { width: 65, height: 60, borderWidth: 1, borderColor: '#F2F2F7', borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
});
