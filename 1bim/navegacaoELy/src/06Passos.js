import React, {useState} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {Button, TextInput} from 'react-native-paper';
import Icon from '@mdi/react';
import { mdiWalk } from '@mdi/js';

//adicione estilo e na Tela1 adicione um botão "Sair"
export default function(props){
    const [passos, setPassos] = useState();

    function anterior() {
         props.navigation.navigate('05Outros');
    }

    function proximo() {
        global.passos = passos;
        props.navigation.navigate('07IMC');
    }

    return <View>
      <Icon path={mdiWalk} size={1} />
      <TextInput value={passos} label="Quantos passos deu no dia" onChangeText={setPassos} mode="outlined"/>
      <Button onPress={anterior}>Anterior</Button>
      <Button onPress={proximo}>Proximo</Button>
    </View>
}