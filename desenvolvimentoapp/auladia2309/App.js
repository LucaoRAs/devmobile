import { Text, ScrollView } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import React, { useState, useEffect } from 'react';

export default function App() {
  const [dados, setDados] = useState([]);
  const [nome, setNome] = useState('');

  // 🔹 Buscar dados (GET)
  useEffect(() => {
    fetch('')
      .then((response) => response.json())
      .then((responseJson) => {
        setDados(responseJson);
      })
      .catch((error) => console.error(error));
  }, []);

  // 🔹 Inserir dados (POST)
  function inserir() {
    fetch('https://crudcrud.com/Dashboard/4a98358e9e7b40d4bfd9c7083d1fdce1', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify({ name: nome })
    })
      .then(() => {
        // Atualiza a lista após inserir
        return fetch('https://crudcrud.com/Dashboard/4a98358e9e7b40d4bfd9c7083d1fdce1')
          .then((res) => res.json())
          .then((responseJson) => setDados(responseJson));
      })
      .catch((error) => console.error(error));
  }

  return (
    <ScrollView style={{ padding: 20 }}>
      <Text style={{ fontSize: 20, marginBottom: 10 }}>API Remota</Text>

      <TextInput
        label="Nome:"
        value={nome}
        onChangeText={setNome}
        style={{ marginBottom: 10 }}
      />

      <Button mode="contained" onPress={inserir}>
        Inserir
      </Button>

      {dados.map((l, i) => (
        <Text key={i} style={{ marginTop: 5 }}>
          {l.name}
        </Text>
      ))}
    </ScrollView>
  );
}