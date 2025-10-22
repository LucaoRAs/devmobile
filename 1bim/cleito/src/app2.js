 function calcular(){
    let d = parseFloat(b) * parseFloat(b) - (4 * parseFloat(a) * parseFloat(c));
    setDelta(d);
    if (d > 0) {
      setX1("Não possue raizes")
      setX2("");

    } else{
      setX1(((-parseFloat(b) + Math.sqrt(d)) / (2 * parseFloat(a))).toFixed(1));
      setX2(((-parseFloat(b) - Math.sqrt(d)) / (2 * parseFloat(a))).toFixed(1));
    }
}
  return(
    <View style={styles.container}>
      <TextInput
        value = {a}
        onChangeText={setA}
        style={styles.TextInput}
        keyboardType='numeric'
      />
      <TextInput
        value = {b}
        onChangeText={setB}
        style={styles.TextInput}
        keyboardType='numeric'
      />
      <TextInput
        value = {c}
        onChangeText={setC}
        style={styles.TextInput}
        keyboardType='numeric'
      />
      <Button title='Calcular' onPress={calcular} />
      <Text>Delta: {delta}</Text>
      <Text>X1: {x1}</Text>
      <Text>X2: {x2}</Text>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  TextInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
});