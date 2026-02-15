import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#F9FBFC' 
  },
  content: { 
    paddingHorizontal: 30, 
    alignItems: 'center' 
  },
  header: { 
    marginTop: 80, 
    alignItems: 'center' 
  },
  logoIcon: { 
    width: 60, 
    height: 60, 
    marginBottom: 10 
  },
  brandName: { 
    fontSize: 32, 
    fontFamily: 'Inter-Bold', 
    color: '#1A1A1A' 
  },
  brandGreen: { 
    color: '#27AE60', 
    fontFamily: 'Inter-Bold' 
  },

  // SECCIÓN DEL SWITCH ANIMADO
  tabContainer: { 
    flexDirection: 'row', 
    backgroundColor: '#E5E5EA', 
    borderRadius: 10, 
    marginTop: 30, 
    padding: 4, 
    width: '100%', 
    height: 50, // Aumentado ligeramente para mejor manejo visual
    position: 'relative' 
  },
  animatedSlider: {
    position: 'absolute',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    height: 42, // Altura del tabContainer menos el padding total
    top: 4,
    left: 4,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  tabButton: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center',
    zIndex: 1 
  },
  activeTabText: { 
    fontFamily: 'Inter-SemiBold', 
    color: '#1A1A1A' 
  },
  inactiveTabText: { 
    fontFamily: 'Inter-Regular', 
    color: '#6C7278' 
  },

  // SECCIÓN DEL FORMULARIO
  form: { 
    width: '100%', 
    marginTop: 30 
  },
  label: { 
    fontSize: 14, 
    fontFamily: 'Inter-Regular', 
    color: '#6C7278', 
    marginBottom: 8 
  },
  input: { 
    height: 48, 
    borderWidth: 1, 
    borderColor: '#E5E5EA', 
    borderRadius: 10, 
    paddingHorizontal: 15, 
    fontSize: 14, 
    fontFamily: 'Inter-Regular', 
    color: '#1A1A1A' 
  },
  passwordContainer: { 
    flexDirection: 'row', 
    height: 48, 
    borderWidth: 1, 
    borderColor: '#E5E5EA', 
    borderRadius: 10, 
    paddingHorizontal: 15, 
    alignItems: 'center' 
  },
  inputPassword: { 
    flex: 1, 
    height: '100%', 
    fontSize: 14, 
    fontFamily: 'Inter-Regular', 
    color: '#1A1A1A' 
  },
  eyeIcon: { 
    padding: 5, 
    justifyContent: 'center', 
    alignItems: 'center'
  },
  forgotPassword: { 
    color: '#27AE60', 
    textAlign: 'right', 
    fontFamily: 'Inter-SemiBold',
    marginTop: 10 
  },
  loginButton: { 
    backgroundColor: '#27AE60', 
    borderRadius: 12, 
    height: 52, 
    justifyContent: 'center', 
    alignItems: 'center', 
    marginTop: 30 
  },
  loginButtonText: { 
    color: '#FFFFFF', 
    fontSize: 16, 
    fontFamily: 'Inter-SemiBold' 
  },

  // SECCIÓN SOCIAL
  socialDivider: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginTop: 40, 
    width: '100%' 
  },
  line: { 
    flex: 1, 
    height: 1, 
    backgroundColor: '#E5E5EA' 
  },
  socialText: { 
    marginHorizontal: 10, 
    color: '#6C7278', 
    fontSize: 14, 
    fontFamily: 'Inter-Regular' 
  },
  socialIconsContainer: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    width: '100%', 
    marginTop: 30 
  },
  iconButton: { 
    width: 65, 
    height: 60, 
    borderWidth: 1, 
    borderColor: '#F2F2F7', 
    borderRadius: 12, 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
});

export default styles;