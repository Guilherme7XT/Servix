import React, { useEffect, useState, useContext } from 'react';
import { View, Text, FlatList, StyleSheet, Alert } from 'react-native';
import api from '../services/api';
import { AuthContext } from '../contexts/AuthContext';

export default function HomeScreen({ navigation }) {
  const { usuario } = useContext(AuthContext);
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!usuario) {
      navigation.replace('Login');
      return;
    }
    
    carregarUsuarios();
  }, [usuario, navigation]);

  const carregarUsuarios = async () => {
    try {
      setLoading(true);
      const response = await api.get('/usuarios');
      setUsuarios(response.data);
    } catch (error) {
      Alert.alert('Erro', 'Erro ao carregar usuários: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Carregando...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Usuários Cadastrados</Text>
      <FlatList
        data={usuarios}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.userItem}>
            <Text style={styles.userName}>{item.nome}</Text>
            <Text style={styles.userEmail}>{item.email}</Text>
          </View>
        )}
        ListEmptyComponent={() => (
          <Text style={styles.emptyText}>Nenhum usuário encontrado</Text>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333'
  },
  userItem: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5
  },
  userEmail: {
    fontSize: 14,
    color: '#666'
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#666',
    marginTop: 50
  }
});