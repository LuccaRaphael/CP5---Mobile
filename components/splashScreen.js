import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SplashScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('SignIn');
    }, 5000); 
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Image source={require('../assets/Logo.png')} style={styles.icon} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>HOPE FOR</Text>
        <Text style={styles.boldTitle}>HUMANITY</Text>
      </View>
      <View style={styles.welcomeContainer}>
        <Text style={styles.welcomeText}>Welcome to</Text>
        <Text style={styles.welcomeText}>hope for humanity</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'green',
  },
  icon: {
    width: 100, 
    height: 100, 
    resizeMode: 'contain',
  },
  textContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  title: {
    fontSize: 24,
    color: 'white',
    fontFamily: 'Poppins-Regular', 
  },
  boldTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    fontFamily: 'Poppins-Bold', 
  },
  welcomeContainer: {
    marginTop: 50, 
    alignItems: 'center', 
  },
  welcomeText: {
    fontSize: 30, 
    color: 'black', 
    textAlign: 'center',
    fontFamily: 'Poppins-Regular', 
  },
});

export default SplashScreen;
