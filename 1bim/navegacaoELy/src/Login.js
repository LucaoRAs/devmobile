import React, {useState} from 'react';
import {Button, Text, View, StyleSheet} from 'react-native';
import {TextInput} from 'react-native-paper';
//adicione estilo e na Tela1 adicione um botão "Sair"
export default function(props){
    const [usuario, setUsuario] = useState();
    const [senha, setSenha] = useState();
    const [mensagem, setMensagem] = useState();

    function entrar() {
      if (senha=="123") {
         global.usuario = usuario;
         props.navigation.navigate('Tela1');
      } else {
         setMensagem("Usuário ou senha inválido");
      }props
    }
    return <View>
      <TextInput value={usuario} label="Usuário" onChangeText={setUsuario} mode="outlined"/>
      <TextInput value={senha} label="Senha" onChangeText={setSenha} mode="outlined"/>
      <Button title="Entrar" onPress={entrar}/>
      <Text>{mensagem}</Text>
    </View>
}