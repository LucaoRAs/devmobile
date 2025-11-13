import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

void main() => runApp(MaterialApp(home: ProdutoApp()));

class Produto {
  String? id;
  final String descricao;
  final String marca;
  final double preco;

  Produto({
    this.id,
    required this.descricao,
    required this.marca,
    required this.preco,
  });

  factory Produto.fromJson(Map<String, dynamic> json) {
    final precoBruto = json['preco'];
    double precoConvertido;
    if (precoBruto is num) {
      precoConvertido = precoBruto.toDouble();
    } else {
      precoConvertido =
          double.tryParse(precoBruto?.toString() ?? '') ?? 0.0;
    }

    return Produto(
      id: json['_id'],
      descricao: json['descricao'] ?? '',
      marca: json['marca'] ?? '',
      preco: precoConvertido,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'descricao': descricao,
      'marca': marca,
      'preco': preco,
    };
  }
}

class ProdutoApp extends StatefulWidget {
  @override
  State<ProdutoApp> createState() => _ProdutoAppState();
}

class _ProdutoAppState extends State<ProdutoApp> {
  // Substitua pelo endpoint gerado em https://crudcrud.com
  final String baseUrl =
      'https://crudcrud.com/api/cb476ce9950049a2862dcd7a9c7bb9fe/produtos';

  List<Produto> produtos = [];
  final _formKey = GlobalKey<FormState>();
  final _descricaoController = TextEditingController();
  final _marcaController = TextEditingController();
  final _precoController = TextEditingController();
  String? editandoId;

  @override
  void initState() {
    super.initState();
    carregarProdutos();
  }

  @override
  void dispose() {
    _descricaoController.dispose();
    _marcaController.dispose();
    _precoController.dispose();
    super.dispose();
  }

  Future<void> carregarProdutos() async {
    final response = await http.get(Uri.parse(baseUrl));
    if (response.statusCode == 200) {
      final List<dynamic> data = jsonDecode(response.body);
      setState(() {
        produtos = data.map((e) => Produto.fromJson(e)).toList();
      });
    }
  }

  Future<void> salvarProduto() async {
    if (_formKey.currentState!.validate()) {
      final produto = Produto(
        descricao: _descricaoController.text,
        marca: _marcaController.text,
        preco: double.parse(
          _precoController.text.replaceAll(',', '.'),
        ),
      );

      if (editandoId == null) {
        await http.post(
          Uri.parse(baseUrl),
          headers: {'Content-Type': 'application/json'},
          body: jsonEncode(produto.toJson()),
        );
      } else {
        await http.put(
          Uri.parse('$baseUrl/$editandoId'),
          headers: {'Content-Type': 'application/json'},
          body: jsonEncode(produto.toJson()),
        );
        editandoId = null;
      }

      _descricaoController.clear();
      _marcaController.clear();
      _precoController.clear();
      await carregarProdutos();
    }
  }

  Future<void> deletarProduto(String id) async {
    await http.delete(Uri.parse('$baseUrl/$id'));
    await carregarProdutos();
  }

  void editarProduto(Produto produto) {
    setState(() {
      editandoId = produto.id;
      _descricaoController.text = produto.descricao;
      _marcaController.text = produto.marca;
      _precoController.text = produto.preco.toStringAsFixed(2);
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('CRUD de Produtos')),
      body: Padding(
        padding: EdgeInsets.all(16),
        child: Column(
          children: [
            Form(
              key: _formKey,
              child: Column(
                children: [
                  TextFormField(
                    controller: _descricaoController,
                    decoration: InputDecoration(labelText: 'Descrição'),
                    validator: (v) =>
                        v == null || v.isEmpty ? 'Informe a descrição' : null,
                  ),
                  TextFormField(
                    controller: _marcaController,
                    decoration: InputDecoration(labelText: 'Marca'),
                    validator: (v) =>
                        v == null || v.isEmpty ? 'Informe a marca' : null,
                  ),
                  TextFormField(
                    controller: _precoController,
                    decoration: InputDecoration(labelText: 'Preço'),
                    keyboardType:
                        TextInputType.numberWithOptions(decimal: true),
                    validator: (v) {
                      if (v == null || v.isEmpty) {
                        return 'Informe o preço';
                      }
                      final numero =
                          double.tryParse(v.replaceAll(',', '.'));
                      if (numero == null) {
                        return 'Preço inválido';
                      }
                      if (numero <= 0) {
                        return 'Preço deve ser maior que zero';
                      }
                      return null;
                    },
                  ),
                  SizedBox(height: 16),
                  ElevatedButton(
                    onPressed: salvarProduto,
                    child: Text(editandoId == null ? 'Adicionar' : 'Salvar'),
                  ),
                ],
              ),
            ),
            SizedBox(height: 20),
            Expanded(
              child: produtos.isEmpty
                  ? Center(child: Text('Nenhum produto cadastrado.'))
                  : ListView.builder(
                      itemCount: produtos.length,
                      itemBuilder: (context, index) {
                        final produto = produtos[index];
                        return Card(
                          child: ListTile(
                            title: Text(produto.descricao),
                            subtitle: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Text('Marca: ${produto.marca}'),
                                Text(
                                  'Preço: R\$ ${produto.preco.toStringAsFixed(2)}',
                                ),
                              ],
                            ),
                            isThreeLine: true,
                            trailing: Row(
                              mainAxisSize: MainAxisSize.min,
                              children: [
                                IconButton(
                                  icon: Icon(Icons.edit, color: Colors.orange),
                                  onPressed: () => editarProduto(produto),
                                ),
                                IconButton(
                                  icon: Icon(Icons.delete, color: Colors.red),
                                  onPressed: () =>
                                      deletarProduto(produto.id!),
                                ),
                              ],
                            ),
                          ),
                        );
                      },
                    ),
            ),
          ],
        ),
      ),
    );
  }
}
