import React, { Component } from 'react';
import { Alert, Button, Text, TextInput, View, StyleSheet } from 'react-native';


export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            numero1: "",
            numero2: "",
            soma: ""
        };
    }


    onCalcular() {
        const { numero1, numero2 } = this.state;
        var soma = parseInt(numero1) + parseInt(numero2);
        this.setState({ soma: soma });
    }

    render() {
        return (
            <View style={styles.container}>
                <TextInput value={this.state.numero1} onChangeText={(numero1) => this.setState({ numero1 })} placeholder={"numero 1"} style={styles.input} />



                <TextInput value={this.state.numero2} onChangeText={(numero2) => this.setState({ numero2 })} placeholder={"numero 2"} style={styles.input} />

                <Button title="Calcular" onPress={this.onCalcular.bind(this)} />

                <Text style={styles.resultado}>Resultado: {this.state.soma}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ecf0f1'
    },
    input: {
        height: 44,
        borderColor: 'black',
        borderWidth: 1,
        marginBottom: 10,
        width: '200'
    },
    resultado: {
        fontSize: 42,
        padding: 10
    }
});