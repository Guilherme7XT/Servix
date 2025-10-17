import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import api from '../services/api';

export default function ListaServicosScreen() {
  const [servicos, setServicos] = useState([]);

  useEffect(() => {
    api.get('/servicos')
      .then(res => setServicos(res.data))
      .catch(err => alert('Erro ao buscar serviços: ' + err.message));
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🛠️ Serviços Disponíveis</Text>
      <FlatList
        data={servicos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>{item.titulo}</Text>
            <Text style={styles.cardDescription}>{item.descricao}</Text>
            <Text style={styles.price}>R$ {parseFloat(item.preco).toFixed(2)}</Text>
          </View>
        )}
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyIcon}>🔍</Text>
            <Text style={styles.emptyText}>Nenhum serviço disponível no momento</Text>
          </View>
        )}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f9fa'
  },
  title: { 
    fontSize: 24, 
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333'
  },
  card: {
    backgroundColor: '#fff',
    padding: 20,
    marginBottom: 15,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#007AFF',
  },
  cardTitle: { 
    fontWeight: 'bold', 
    fontSize: 18,
    color: '#333',
    marginBottom: 8
  },
  cardDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
    lineHeight: 20,
  },
  price: { 
    color: '#2e8b57', 
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'right'
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 50,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 20,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: 10,
  }
});
