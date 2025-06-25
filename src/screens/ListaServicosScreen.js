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
      <Text style={styles.title}>Serviços Disponíveis</Text>
      <FlatList
        data={servicos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>{item.titulo}</Text>
            <Text>{item.descricao}</Text>
            <Text style={styles.price}>R$ {item.preco.toFixed(2)}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 20, marginBottom: 10 },
  card: {
    backgroundColor: '#f4f4f4',
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
  },
  cardTitle: { fontWeight: 'bold', fontSize: 16 },
  price: { color: '#2e8b57', marginTop: 5 },
});
