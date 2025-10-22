import React, {useState} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {Button, TextInput} from 'react-native-paper';
import Icon from '@mdi/react';
import { mdiNoodles } from '@mdi/js';

//adicione estilo e na Tela1 adicione um botão "Sair"
export default function(props){
    const [jantar, setJantar] = useState();

    function anterior() {
         props.navigation.navigate('03Almoco');
    }

    function proximo() {
        global.jantar = jantar;
        props.navigation.navigate('05Outros');
    }

    return <View>
      <Icon path={mdiNoodles} size={2} />
      <TextInput value={jantar} label="Peso do Jantar" onChangeText={setJantar} mode="outlined"/>
      <Button onPress={anterior}>Anterior</Button>
      <Button onPress={proximo}>Proximo</Button>
    </View>
}