import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import api from '../services/api';
import { AuthContext } from '../contexts/AuthContext';

export default function ServicoCreateScreen({ navigation }) {
  const { usuario } = useContext(AuthContext);
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [preco, setPreco] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCadastrarServico = async () => {
    if (!titulo.trim() || !descricao.trim() || !preco.trim()) {
      Alert.alert('Erro', 'Todos os campos são obrigatórios');
      return;
    }

    if (isNaN(parseFloat(preco)) || parseFloat(preco) <= 0) {
      Alert.alert('Erro', 'Preço deve ser um valor válido maior que zero');
      return;
    }

    try {
      setLoading(true);
      await api.post('/servicos', {
        titulo: titulo.trim(),
        descricao: descricao.trim(),
        preco: parseFloat(preco),
        prestadorId: usuario?.uid || 1, // Usa ID do Firebase se disponível
      });
      Alert.alert('Sucesso', 'Serviço cadastrado com sucesso!');
      navigation.navigate('ListaServicos');
    } catch (err) {
      Alert.alert('Erro', 'Erro ao cadastrar serviço: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastrar Novo Serviço</Text>
      <TextInput
        style={styles.input}
        placeholder="Título"
        value={titulo}
        onChangeText={setTitulo}
      />
      <TextInput
        style={styles.input}
        placeholder="Descrição"
        value={descricao}
        onChangeText={setDescricao}
      />
      <TextInput
        style={styles.input}
        placeholder="Preço (R$)"
        value={preco}
        onChangeText={setPreco}
        keyboardType="numeric"
      />
      <Button 
        title={loading ? "Cadastrando..." : "Cadastrar"} 
        onPress={handleCadastrarServico}
        disabled={loading}
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
  input: {
    borderWidth: 2,
    borderColor: '#e1e5e9',
    padding: 16,
    marginBottom: 18,
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
    marginTop: 10,
    shadowColor: '#007AFF',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
});
