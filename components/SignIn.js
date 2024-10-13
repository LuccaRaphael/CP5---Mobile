import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CryptoJS from 'crypto-js'; 
import { useNavigation } from '@react-navigation/native';

import GoogleIcon from '../assets/google.png';
import TwitterIcon from '../assets/Twitter.png';
import FacebookIcon from '../assets/facebook.png';

const SignIn = () => {
  const navigation = useNavigation();
  const [credentials, setCredentials] = useState({ email: '', password: '' });

  const retrieveEncryptedData = async () => {
    try {
      const encryptedData = await AsyncStorage.getItem('userData');
      console.log('Tentando recuperar dados criptografados...');
      if (encryptedData) {
        console.log('Dados criptografados recuperados:', encryptedData);
        const decryptedData = decryptData(encryptedData);
        return JSON.parse(decryptedData); // Decrypt e parseia os dados
      } else {
        console.log('Nenhum dado encontrado no AsyncStorage.');
      }
    } catch (error) {
      console.error('Erro ao recuperar dados criptografados:', error);
    }
  };

  const updateField = (field, value) => {
    setCredentials(prev => ({ ...prev, [field]: value }));
  };

  const validateCredentials = async () => {
    console.log('Validando credenciais...');
    
    const userData = await retrieveEncryptedData(); // Recupera os dados do usuário

    if (!userData) {
      Alert.alert('Erro', 'Nenhum dado de usuário armazenado.');
      return;
    }

    const { email, password } = credentials;

    console.log('Dados do usuário recuperados:', userData);

    // Verifica se o email existe
    if (userData.email !== email) {
      Alert.alert('Erro', 'Email ou senha inválidos!');
      return;
    }

    // Verifica se a senha informada é igual à senha armazenada
    if (userData.password === password) {
      Alert.alert('Sucesso', 'Você está logado!');
      console.log('Logado');
    } else {
      Alert.alert('Erro', 'Email ou senha inválidos!');
      console.log('Senha Incorreta');
    }
  };

  const decryptData = (encryptedData) => {
    const bytes = CryptoJS.AES.decrypt(encryptedData, 'chavecp5'); // A mesma chave usada na criptografia
    const originalData = bytes.toString(CryptoJS.enc.Utf8);
    return originalData;
  };

  const signInWithSocial = (platform) => {
    Alert.alert('Sucesso', `Você está logado com ${platform}!`);
  };

  const socialIcons = {
    Google: GoogleIcon,
    Twitter: TwitterIcon,
    Facebook: FacebookIcon,
  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/logo-pagina.png')} style={styles.logo} />
      <Text style={styles.header}>Sign in to your account</Text>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="ex: jon.smith@email.com"
          keyboardType="email-address"
          value={credentials.email}
          onChangeText={(text) => updateField('email', text)}
        />
      </View>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="********"
          secureTextEntry
          value={credentials.password}
          onChangeText={(text) => updateField('password', text)}
        />
      </View>
      <TouchableOpacity style={styles.signInButton} onPress={validateCredentials}>
        <Text style={styles.buttonText}>SIGN IN</Text>
      </TouchableOpacity>
      <Text style={styles.orText}>or sign in with</Text>
      <View style={styles.socialButtonsContainer}>
        {Object.keys(socialIcons).map(platform => (
          <TouchableOpacity key={platform} style={styles.socialButton} onPress={() => signInWithSocial(platform)}>
            <Image source={socialIcons[platform]} style={styles.socialIcon} />
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
        <Text style={styles.signupPrompt}>
          Don't have an account? <Text style={styles.signupLink}>Sign up</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  logo: {
    fontSize: 48,
    color: 'green',
    marginBottom: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputGroup: {
    width: '100%',
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  signInButton: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
    marginVertical: 20,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  orText: {
    marginVertical: 20,
  },
  socialButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginBottom: 20,
  },
  socialButton: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    width: '30%',
    alignItems: 'center',
  },
  socialIcon: {
    width: 24,
    height: 24,
  },
  signupPrompt: {
    color: 'black',
  },
  signupLink: {
    color: 'green',
  },
});

export default SignIn;
