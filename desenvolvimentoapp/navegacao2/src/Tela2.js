import React from "react";
import {Text, View, Button} from "react-native";

export default function Tela(props){
    function abrir(){
      props.navigation.navigate('Tela1');
    }
    
    return<View>
        <Text>Segunda tela</Text>
        <Button title="Voltar" onPress={abrir}/>
    </View>
}