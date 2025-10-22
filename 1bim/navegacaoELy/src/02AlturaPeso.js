import React, {useState} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {Button, TextInput} from 'react-native-paper';
import Icon from '@mdi/react';
import { mdiScaleUnbalanced } from '@mdi/js';

//adicione estilo e na Tela1 adicione um botão "Sair"
export default function(props){
    const [altura, setAltura] = useState();
    const [peso, setPeso] = useState();
   

    function anterior() {
         props.navigation.navigate('01NomeIdade');
    }

    function proximo() {
        global.altura = altura;
        global.peso = peso;
        props.navigation.navigate('03Almoco');
    }

    return <View>
      <Icon path={mdiScaleUnbalanced} size={2} />    
      <TextInput value={altura} label="Altura" onChangeText={setAltura} mode="outlined"/>
      <TextInput value={peso} label="Peso" onChangeText={setPeso} mode="outlined"/>
      <Button onPress={anterior}>Anterior</Button>
      <Button onPress={proximo}>Proximo</Button>
    </View>
}