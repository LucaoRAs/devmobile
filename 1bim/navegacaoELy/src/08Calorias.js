import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {Button, TextInput} from 'react-native-paper';
import Icon from '@mdi/react';
import { mdiFinance } from '@mdi/js';

//adicione estilo e na Tela1 adicione um botão "Sair"
export default function(props){
    const [consumido, setConsumido] = useState();
    const [gasto, setGasto] = useState();
    const [saldo, setSaldo] = useState();

    useEffect(() => {
      let a = parseFloat(global.almoco);
      let j = parseFloat(global.jantar);
      let o = parseFloat(global.outros);
      let p = parseFloat(global.passos);
      let c = (a+j+o)*3;
      let g = 0.08 * p;
      setConsumido(c);
      setGasto(g);
      setSaldo(c-g);
    }, []);

    function anterior() {
         props.navigation.navigate('07IMC');
    }

    function proximo() {
        props.navigation.navigate('01NomeIdade');
    }

    return <View>
      <Icon path={mdiFinance} size={2} />
      <Text>Calorias Consumidas: {consumido}</Text>
      <Text>Calorias Gastas: {gasto}</Text>
      <Text>Saldo de Calorias: {saldo}</Text>
      <Button onPress={anterior}>Anterior</Button>
      <Button onPress={proximo}>Início</Button>
    </View>
}