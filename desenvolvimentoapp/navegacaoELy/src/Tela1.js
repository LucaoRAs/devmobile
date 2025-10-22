import React from 'react';
import {Text, View, Button} from 'react-native';

export default function (props) {
  function abrir() {
    props.navigation.navigate('Tela2');
  }

  return <View>
    <Text>Primeira Tela</Text>
    <Text>Seja bem vindo {global.usuario}</Text>
    <Button title="abrir" onPress={abrir}/>
  </View>
}