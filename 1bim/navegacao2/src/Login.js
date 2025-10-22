import React, { useState } from "react";
import { Button, Text, TextInput, View, StyleSheet } from "react-native";

export default function Login({ navigation }) {
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const [mensagem, setMensagem] = useState("");

  function entrar() {
    if (usuario === "admin" && senha === "123") {
      setMensagem("");
      navigation.navigate("Tela1");
    } else {
      setMensagem("Usuário ou senha inválidos");
    }
  }

  return (
    <View style={styles.container}>
      <TextInput
        value={usuario}
        onChangeText={setUsuario}
        placeholder="Usuário"
        autoCapitalize="none"
        autoCorrect={false}
        style={styles.input}
      />
      <TextInput
        value={senha}
        onChangeText={setSenha}
        placeholder="Senha"
        secureTextEntry
        style={styles.input}
        onSubmitEditing={entrar}
      />
      <Button title="Entrar" onPress={entrar} />
      {!!mensagem && <Text style={styles.msg}>{mensagem}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, justifyContent: "center", gap: 12 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 44,
  },
  msg: { marginTop: 12, color: "crimson", fontWeight: "600" },
});
