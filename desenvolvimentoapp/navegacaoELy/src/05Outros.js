import React, {useState} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {Button, TextInput} from 'react-native-paper';
import Icon from '@mdi/react';
import { mdiFood } from '@mdi/js';

//adicione estilo e na Tela1 adicione um botão "Sair"
export default function(props){
    const [outros, setOutros] = useState();

    function anterior() {
         props.navigation.navigate('04Jantar');
    }

    function proximo() {
        global.outros = outros;
        props.navigation.navigate('06Passos');
    }

    return <View>
      <Icon path={mdiFood} size={2} />
      <TextInput value={outros} label="Peso das outroas refeições" onChangeText={setOutros} mode="outlined"/>
      <Button onPress={anterior}>Anterior</Button>
      <Button onPress={proximo}>Proximo</Button>
    </View>
}