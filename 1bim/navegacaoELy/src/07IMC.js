import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {Button, TextInput} from 'react-native-paper';
import Icon from '@mdi/react';
import { mdiCalculatorVariantOutline } from '@mdi/js';

//adicione estilo e na Tela1 adicione um botão "Sair"
export default function(props){
    const [imc, setIMC] = useState();
    const [classificacao, setClassificacao] = useState();

    useEffect(() => {
      let p = parseFloat(global.peso);
      let a = parseFloat(global.altura);
      let i = p / (a * a);
      setIMC(i);
      if ((i) < 24) {
        setClassificacao("Abaixo do peso");
      } else if ((i) <= 26) {
        setClassificacao("Peso ideal");
      } else {
        setClassificacao("Acima do peso");
      } 
    }, []);  


    function anterior() {
         props.navigation.navigate('06Passos');
    }

    function proximo() {
        props.navigation.navigate('08Calorias');
    }

    return <View>
      <Icon path={mdiCalculatorVariantOutline} size={2} />
      <Text>IMC: {imc}</Text>
      <Text>Classificação: {classificacao}</Text>
      <Button onPress={anterior}>Anterior</Button>
      <Button onPress={proximo}>Proximo</Button>
    </View>
}