import React from 'react';
import {Text, View, Button} from 'react-native';

export default function(props) {
  function abrir() {
    props.navigation.navigate('Tela1');
  }

  return <View>
    <Text>Segunda Tela</Text>
    <Button title="voltar" onPress={abrir}/>
  </View>
}