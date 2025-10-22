import React, {useState} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {Button, TextInput} from 'react-native-paper';
import Icon from '@mdi/react';
import { mdiAccount } from '@mdi/js';

//adicione estilo e na Tela1 adicione um botão "Sair"
export default function(props){
    const [nome, setNome] = useState();
    const [idade, setIdade] = useState();

    function proximo() {
        global.nome = nome;
        global.idade = idade;
        props.navigation.navigate('02AlturaPeso');
    }
    return <View>
    <Icon path={mdiAccount} size={2} />
      <TextInput value={nome} label="Nome" onChangeText={setNome} mode="outlined"/>
      <TextInput value={idade} label="Idade" onChangeText={setIdade} mode="outlined"/>
      <Button onPress={proximo}>Proximo</Button>
    </View>
}