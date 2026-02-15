import React, { useEffect, useRef } from 'react';
import { View, Text, Image, StyleSheet, Animated, LayoutChangeEvent } from 'react-native';

// Definición de la interfaz para las props
interface SplashProps {
  onLayoutRootView: (event: LayoutChangeEvent) => Promise<void> | void;
}

export default function SplashScreen({ onLayoutRootView }: SplashProps) {
  const scaleAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 5,
      useNativeDriver: true,
    }).start();
  }, [scaleAnim]);

  return (
    <View style={styles.splash} onLayout={onLayoutRootView}>
      <Animated.Image
        source={require('../../assets/logo.webp')}
        style={[styles.logo, { transform: [{ scale: scaleAnim }] }]}
      />
      <Text style={styles.splashText}>AgroSens v.1.0</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  splash: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F9FBFC',
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 20,
    resizeMode: 'contain',
  },
  splashText: {
    fontFamily: 'Inter-Regular',
    color: '#fff',
    fontSize: 14,
  },
});