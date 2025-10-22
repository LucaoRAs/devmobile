import React, {useState} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {Button, TextInput} from 'react-native-paper';
import Icon from '@mdi/react';
import { mdiFoodTurkey } from '@mdi/js';

//adicione estilo e na Tela1 adicione um botão "Sair"
export default function(props){
    const [almoco, setAlmoco] = useState();

    function anterior() {
         props.navigation.navigate('02AlturaPeso');
    }

    function proximo() {
        global.almoco = almoco;
        props.navigation.navigate('04Jantar');
    }

    return <View>
      <Icon path={mdiFoodTurkey} size={2} />
      <TextInput value={almoco} label="Peso do Almoço" onChangeText={setAlmoco} mode="outlined"/>
      <Button onPress={anterior}>Anterior</Button>
      <Button onPress={proximo}>Proximo</Button>
    </View>
}