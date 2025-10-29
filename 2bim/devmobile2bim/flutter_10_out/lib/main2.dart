import 'package:flutter/material.dart';

void main() {
  runApp(const MeuApp());
}

class MeuApp extends StatefulWidget {
  const MeuApp({super.key});

  @override
  State<MeuApp> createState() => _MeuAppState();
}

class _MeuAppState extends State<MeuApp> {
  @override
  Widget build(BuildContext context) {
    return const MaterialApp(home: MeuFormulario());
  }
}

class MeuFormulario extends StatefulWidget {
  const MeuFormulario({super.key});

  @override
  State<MeuFormulario> createState() => _MeuFormularioState();
}

class _MeuFormularioState extends State<MeuFormulario> {
  final _formKey = GlobalKey<FormState>();
  final _scaffoldMsgKey = GlobalKey<ScaffoldMessengerState>();

  final TextEditingController nomeController = TextEditingController();
  final TextEditingController emailController = TextEditingController();

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      scaffoldMessengerKey: _scaffoldMsgKey,
      home: Scaffold(
        appBar: AppBar(title: const Text("Exemplo de Formulário")),
        body: Padding(
          padding: const EdgeInsets.all(16.0),
          child: Form(
            key: _formKey,
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                TextFormField(
                  controller: nomeController,
                  decoration: const InputDecoration(labelText: "Nome"),
                  validator: (value) {
                    if (value == null || value.isEmpty) {
                      return "Por favor, insira seu nome";
                    }
                    return null;
                  },
                ),
                TextFormField(
                  controller: emailController,
                  decoration: const InputDecoration(labelText: "Email"),
                  validator: (value) {
                    if (value == null || value.isEmpty) {
                      return "Por favor, insira seu email";
                    }
                    if (!value.contains('@')) {
                      return "Email inválido";
                    }
                    return null;
                  },
                ),
                const SizedBox(height: 20),
                Center(
                  child: ElevatedButton(
                    onPressed: () {
                      if (_formKey.currentState!.validate()) {
                        _scaffoldMsgKey.currentState!.showSnackBar(
                          const SnackBar(
                            content: Text("Formulário enviado com sucesso!"),
                          ),
                        );
                      }
                    },
                    child: const Text("Enviar"),
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}