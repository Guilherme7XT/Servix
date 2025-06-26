import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import api from '../services/api';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { useEffect } from 'react';

useEffect(() => {
  if (!usuario) {
    navigation.replace('Login');
  }
}, []);


export default function HomeScreen() {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    api.get('/usuarios').then(res => setUsuarios(res.data));
  }, []);

  return (
    <View style={styles.container}>
      <Text>Usuários Cadastrados:</Text>
      <FlatList
        data={usuarios}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Text>{item.nome} - {item.email}</Text>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
});