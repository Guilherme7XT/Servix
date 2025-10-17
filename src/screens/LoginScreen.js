import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Alert } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, senha);
      Alert.alert('Sucesso', 'Login realizado com sucesso!');
      navigation.navigate('Home');
    } catch (error) {
      Alert.alert('Erro', 'Erro no login: ' + error.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.logo}>
        <Text style={styles.logoText}>🚀 Servix</Text>
        <Text style={styles.subtitle}>Sistema de Agendamento</Text>
      </View>
      
      <Text style={styles.title}>Login</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
      />
      <Button title="Entrar" onPress={handleLogin} />
      <Text 
        style={styles.link} 
        onPress={() => navigation.navigate('Register')}
      >
        Não tem conta? Cadastre-se
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    justifyContent: 'center', 
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  logo: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logoText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  title: {
    fontSize: 28, 
    fontWeight: 'bold', 
    marginBottom: 30, 
    textAlign: 'center',
    color: '#333',
  },
  input: {
    borderWidth: 2, 
    borderColor: '#e1e5e9', 
    padding: 16, 
    marginBottom: 20, 
    borderRadius: 12,
    backgroundColor: '#fff',
    fontSize: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 16,
    borderRadius: 12,
    marginBottom: 20,
    shadowColor: '#007AFF',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  link: {
    color: '#007AFF',
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    fontWeight: '500',
  }
});