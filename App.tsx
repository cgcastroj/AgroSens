import React, { useEffect, useState, useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import * as SplashScreenNative from 'expo-splash-screen';
import { useFonts, Inter_400Regular, Inter_600SemiBold, Inter_700Bold } from '@expo-google-fonts/inter';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// Importaciones de navegación y contexto
import AppNavigator from './src/navigation/AppNavigator';
import { AuthProvider } from './src/hooks/useAuth';
import SplashScreen from './src/components/SplashScreen';

// Importación del servicio de base de datos
import { dbService } from './src/services/dbService';

SplashScreenNative.preventAutoHideAsync();

export default function App() {
  const [appReady, setAppReady] = useState(false);

  const [fontsLoaded] = useFonts({
    'Inter-Regular': Inter_400Regular,
    'Inter-SemiBold': Inter_600SemiBold,
    'Inter-Bold': Inter_700Bold,
  });

  useEffect(() => {
    async function prepare() {
      try {
        // Inicializamos la base de datos SQLite (Creación de tablas)
        dbService.setupDatabase();
        
        // Simulación de carga de otros recursos (opcional)
        await new Promise(resolve => setTimeout(resolve, 2000));
      } catch (e) {
        console.error("Error al preparar la aplicación:", e);
      } finally {
        setAppReady(true);
      }
    }
    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded && appReady) {
      await SplashScreenNative.hideAsync();
    }
  }, [fontsLoaded, appReady]);

  if (!fontsLoaded || !appReady) {
    return <SplashScreen onLayoutRootView={onLayoutRootView} />;
  }

  return (
    <SafeAreaProvider>
      <View style={styles.container} onLayout={onLayoutRootView}>
        <AuthProvider>
          <AppNavigator />
        </AuthProvider>
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});