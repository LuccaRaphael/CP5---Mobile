import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native'; 
import AsyncStorage from '@react-native-async-storage/async-storage';
import CryptoJS from 'crypto-js'; 

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const navigation = useNavigation(); 

  const encryptData = (data) => {
    const encryptedData = CryptoJS.AES.encrypt(data, 'chavecp5').toString();
    return encryptedData;
  };

  const decryptData = (encryptedData) => {
    const bytes = CryptoJS.AES.decrypt(encryptedData, 'chavecp5');
    const originalData = bytes.toString(CryptoJS.enc.Utf8);
    return originalData;
  };

  const handleSignUp = async () => {
    if (!name || !email || !password || !confirmPassword) {
      Alert.alert('Erro', 'Todos os campos são necessários.');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Erro', 'As senhas precisam ser iguais.');
      return;
    }
    if (!isChecked) {
      Alert.alert('Erro', 'É necessário aceitar os termos e condições!');
      return;
    }
  
    // Criar objeto para armazenamento
    const userData = {
      name: name,
      email: email,
      password: password,
    };
  
    // Criptografar todo o objeto
    const encryptedUserData = encryptData(JSON.stringify(userData));
    console.log('Dados do usuário criptografados:', encryptedUserData);
  
    // Armazenar os dados criptografados
    try {
      await AsyncStorage.setItem('userData', encryptedUserData);
      Alert.alert('Sucesso', 'Você está registrado com dados criptografados!');
      navigation.navigate('SignIn'); 
    } catch (error) {
      Alert.alert('Erro', 'Ocorreu um erro ao salvar os dados.');
      console.error(error);
    }
  };

  const handleSocialLogin = (platform) => {
    Alert.alert('Sucesso', `Você está logado com ${platform}`);
  };
  
  return (
    <View style={styles.container}>
      <Image source={require('../assets/logo-pagina.png')} style={styles.logo} />
      <View style={styles.formContainer}>
        <Text style={styles.title}>Create your account</Text>
        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          placeholder="ex: jon smith"
          value={name}
          onChangeText={setName}
        />
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="ex: jon.smith@email.com"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="********"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <Text style={styles.label}>Confirm password</Text>
        <TextInput
          style={styles.input}
          placeholder="********"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
        <View style={styles.checkboxContainer}>
          <TouchableOpacity onPress={() => setIsChecked(!isChecked)} style={styles.checkbox}>
            {isChecked && <View style={styles.checkboxChecked} />}
          </TouchableOpacity>
          <Text style={styles.checkboxLabel}>
            I understood the <Text style={styles.termsText}>terms & policy</Text>.
          </Text>
        </View>
        <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
          <Text style={styles.signUpButtonText}>SIGN UP</Text>
        </TouchableOpacity>
        <Text style={styles.or}>or sign up with</Text>
        <View style={styles.socialButtons}>
          <TouchableOpacity style={styles.socialButton} onPress={() => handleSocialLogin('Google')}>
            <Image source={require('../assets/google.png')} style={styles.socialIcon} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialButton} onPress={() => handleSocialLogin('Twitter')}>
            <Image source={require('../assets/Twitter.png')} style={styles.socialIcon} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialButton} onPress={() => handleSocialLogin('Facebook')}>
            <Image source={require('../assets/facebook.png')} style={styles.socialIcon} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
          <Text style={styles.signupText}>
            Have an account? <Text style={styles.signupLink}>Sign in</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  logo: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 50, 
    height: 50, 
    resizeMode: 'contain',
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50, 
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  label: {
    alignSelf: 'flex-start',
    marginLeft: 20,
    marginBottom: 5,
    fontSize: 16,
  },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 20,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 3,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  checkboxChecked: {
    width: 14,
    height: 14,
    backgroundColor: 'green',
    borderRadius: 2,
  },
  checkboxLabel: {
    fontSize: 16,
  },
  termsText: {
    color: 'green', 
  },
  signUpButton: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
    width: '100%',
    alignItems: 'center',
  },
  signUpButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  or: {
    marginVertical: 20,
  },
  socialButtons: {
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
  signupText: {
    color: 'black',
  },
  signupLink: {
    color: 'green',
  },
});

export default SignUp;
