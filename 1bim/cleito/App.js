import React, { useState } from "react";
import { View, TextInput, Button, Text, StyleSheet } from "react-native";

export default function Bhaskara() {
  const [a, setA] = useState("");
  const [b, setB] = useState("");
  const [c, setC] = useState("");
  const [delta, setDelta] = useState("");
  const [x1, setX1] = useState("");
  const [x2, setX2] = useState("");

  const toNum = (v) => Number(String(v).replace(",", "."));

  function calcular() {
    const na = toNum(a);
    const nb = toNum(b);
    const nc = toNum(c);

    // validações básicas
    if (Number.isNaN(na) || Number.isNaN(nb) || Number.isNaN(nc)) {
      setDelta("—");
      setX1("Preencha a, b e c com números.");
      setX2("");
      return;
    }

    if (na === 0) {
      setDelta("—");
      setX1("Não é equação do 2º grau (a não pode ser 0).");
      setX2("");
      return;
    }

    const d = nb * nb - 4 * na * nc;
    setDelta(d.toFixed(2));

    if (d < 0) {
      setX1("Não possui raízes reais.");
      setX2("");
      return;
    }

    if (d === 0) {
      const raiz = (-nb) / (2 * na);
      setX1(raiz.toFixed(2));
      setX2("(raiz dupla)");
      return;
    }

    // d > 0
    const sqrtD = Math.sqrt(d);
    const r1 = (-nb + sqrtD) / (2 * na);
    const r2 = (-nb - sqrtD) / (2 * na);
    setX1(r1.toFixed(2));
    setX2(r2.toFixed(2));
  }

  return (
    <View style={styles.container}>
      <TextInput
        value={a}
        onChangeText={setA}
        style={styles.input}
        keyboardType="numeric"
        placeholder="a"
      />
      <TextInput
        value={b}
        onChangeText={setB}
        style={styles.input}
        keyboardType="numeric"
        placeholder="b"
      />
      <TextInput
        value={c}
        onChangeText={setC}
        style={styles.input}
        keyboardType="numeric"
        placeholder="c"
      />
      <Button title="Calcular" onPress={calcular} />

      <Text style={styles.result}>Delta: {delta}</Text>
      <Text style={styles.result}>X1: {x1}</Text>
      <Text style={styles.result}>X2: {x2}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
    gap: 8,
  },
  input: {
    height: 44,
    borderColor: "gray",
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 6,
  },
  result: {
    marginTop: 8,
    fontSize: 16,
  },
});
