import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import api from '../services/api';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

const { usuario } = useContext(AuthContext);

await api.post('/servicos', {
  titulo,
  descricao,
  preco: parseFloat(preco),
  prestadorId: usuario.uid, // usando ID real do Firebase
});


export default function ServicoCreateScreen({ navigation }) {
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [preco, setPreco] = useState('');

  const handleCadastrarServico = async () => {
    try {
      await api.post('/servicos', {
        titulo,
        descricao,
        preco: parseFloat(preco),
        prestadorId: 1, // ID fixo temporário (ex: logado via contexto futuramente)
      });
      alert('Serviço cadastrado com sucesso!');
      navigation.navigate('ListaServicos');
    } catch (err) {
      alert('Erro ao cadastrar serviço: ' + err.message);
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
      <Button title="Cadastrar" onPress={handleCadastrarServico} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 20, marginBottom: 10 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginBottom: 10,
    borderRadius: 4,
  },
});
