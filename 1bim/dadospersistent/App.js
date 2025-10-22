import React, { useState, useEffect } from "react";
import { Text, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TextInput, Button } from "react-native-paper";

export default function App() {
  const [nome, setNome] = useState("");
  const [dados, setDados] = useState("");

  useEffect(() => {
    const ler = async () => {
      try {
        const valor = await AsyncStorage.getItem("dados");
        if (valor !== null) {
          setDados(valor);
        }
      } catch (e) {
        console.log("Erro ao ler:", e);
      }
    };
    ler();
  }, []);

  async function adicionar() {
    const n = nome.trim();
    if (!n) return;

    let d = dados;
    if (d) {
      d += ", ";
    }
    d += n;

    setDados(d);
    setNome("");

    try {
      await AsyncStorage.setItem("dados", d);
    } catch (e) {
      console.log("Erro ao salvar:", e);
    }
  }

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 18, marginBottom: 10 }}>
        Persistência de dados locais
      </Text>

      <TextInput
        value={nome}
        label="Nome"
        onChangeText={setNome}
        mode="outlined"
      />

      <Button style={{ marginTop: 10 }} mode="contained" onPress={adicionar}>
        Adicionar
      </Button>

      <Text style={{ marginTop: 20, fontWeight: "bold" }}>Resultado:</Text>
      <Text>{dados || "—"}</Text>
    </View>
  );
}
