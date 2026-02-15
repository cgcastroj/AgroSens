import React, { useState, useEffect, useRef } from 'react';
import { 
  SafeAreaView, View, Text, Image, TouchableOpacity, 
  ScrollView, Animated, Dimensions 
} from 'react-native';
import LoginScreen from './LoginScreen'; 
import RegisterScreen from './RegisterScreen'; 
import AuthStyles from '../../models/AuthStyles'; 

const { width } = Dimensions.get('window');
// Calculamos el ancho del contenedor restando los márgenes (aprox 40)
const TAB_CONTAINER_WIDTH = width - 40; 
const TAB_WIDTH = TAB_CONTAINER_WIDTH / 2;

const TabSwitcher = ({ activeTab, onChange }) => {
  const translateX = useRef(new Animated.Value(0)).current;
  const [containerWidth, setContainerWidth] = useState(0);

  // Calculamos el ancho de cada mitad restando los paddings del contenedor
  const tabWidth = (containerWidth - 8) / 2; 

  useEffect(() => {
    if (containerWidth > 0) {
      Animated.spring(translateX, {
        toValue: activeTab === 'Iniciar sesión' ? 0 : tabWidth,
        stiffness: 150,
        damping: 20,
        useNativeDriver: true,
      }).start();
    }
  }, [activeTab, containerWidth]);

  return (
    <View 
      style={AuthStyles.tabContainer}
      onLayout={(e) => setContainerWidth(e.nativeEvent.layout.width)}
    >
      {containerWidth > 0 && (
        <Animated.View 
          style={[
            AuthStyles.animatedSlider, 
            { 
              width: tabWidth,
              transform: [{ translateX }] 
            }
          ]} 
        />
      )}
      
      {['Iniciar sesión', 'Registrarse'].map((tab) => (
        <TouchableOpacity
          key={tab}
          style={AuthStyles.tabButton}
          onPress={() => onChange(tab)}
          activeOpacity={1}
        >
          <Text style={activeTab === tab ? AuthStyles.activeTabText : AuthStyles.inactiveTabText}>
            {tab}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default function AuthScreen({ navigation, route }) {
  const [activeTab, setActiveTab] = useState('Iniciar sesión');

  useEffect(() => {
    if (route.params?.initialTab) {
      setActiveTab(route.params.initialTab);
    }
  }, [route.params?.initialTab]);

  return (
    <SafeAreaView style={AuthStyles.container}>
      <ScrollView 
        contentContainerStyle={AuthStyles.content} 
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={AuthStyles.header}>
          <Image source={require('../../../assets/logo.webp')} style={AuthStyles.logoIcon} />
          <Text style={AuthStyles.brandName}>
            Agro<Text style={AuthStyles.brandGreen}>Sens</Text>
          </Text>
        </View>

        <TabSwitcher activeTab={activeTab} onChange={setActiveTab} />

        <View style={{ width: '100%', marginTop: 20 }}>
  {activeTab === 'Iniciar sesión' ? (
    <LoginScreen navigation={navigation} />
  ) : (
    <RegisterScreen 
      navigation={navigation} 
      onRegisterSuccess={() => setActiveTab('Iniciar sesión')} 
    />
  )}
</View>
      </ScrollView>
    </SafeAreaView>
  );
}