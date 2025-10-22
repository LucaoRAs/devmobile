import React from "react";
import {Text, View, Button} from "react-native";

export default function Tela(props){
    function abrir(){
      props.navigation.navigate('Tela2');
    }
    
    return<View>
        <Text>Primeira tela</Text>
        <Button title="Abrir" onPress={abrir}/>
    </View>
}