import React, { useState } from "react";
import { Button, Text, StyleSheet, View } from "react-native";
import {TextInput} from 'react-native-paper';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';



export default function Login(props) {
    const [usuario, setUsuario] = useState("");
    const [senha, setSenha] = useState("");
    const [mensagem, setMensagem] = useState("");

    function entrar(){
        // Lógica de autenticação
        if (senha === "123") {
            global.usuario = usuario;
            props.navigation.navigate("Tela1");
        } else {
            setMensagem("Usuário ou senha inválidos.");
        }
    }

    return (
        <View style={styles.container}>
            <Text>Português (Brasil) <Icon name="chevron-down" size={16} /></Text>

            <TextInput 
                value={usuario} 
                placeholder='Usuário' 
                onChangeText={setUsuario}
                style={styles.input}
            />
            <TextInput 
                value={senha} 
                right={<TextInput.Icon icon="eye" />}
                placeholder='Senha' 
                onChangeText={setSenha} 
                secureTextEntry 
                style={styles.input}
            />
            <Button title="Entrar" onPress={entrar} />
            <Text style={styles.mensagem}>{mensagem}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    lingua: {
        color: "#999",
        textAlign: "center",
        fontSize: 9,

    }
    

    
});