import 'package:flutter/material.dart';

void main() {
  runApp(const PrecoCombustivel());
}

class PrecoCombustivel extends StatefulWidget {
  const PrecoCombustivel({super.key});

  @override
  State<PrecoCombustivel> createState() => _PrecoCombustivelState();
}

class _PrecoCombustivelState extends State<PrecoCombustivel> {
  final TextEditingController gasolinaController = TextEditingController();
  final TextEditingController alcoolController = TextEditingController();
  final TextEditingController distanciaController = TextEditingController();

  String resultado = '';

  void calcular() {
    double? precoGasolina = double.tryParse(gasolinaController.text);
    double? precoAlcool = double.tryParse(alcoolController.text);
    double? distancia = double.tryParse(distanciaController.text);

    if (precoGasolina == null || precoAlcool == null || distancia == null) {
      setState(() {
        resultado = 'Preencha todos os campos corretamente!';
      });
      return;
    }

    double gastoGasolina = (distancia / 12) * precoGasolina;
    double gastoAlcool = (distancia / 9) * precoAlcool;

    String melhor = gastoGasolina < gastoAlcool ? 'Gasolina' : 'Álcool';

    setState(() {
      resultado =
          'Gasto com Gasolina: R\$ ${gastoGasolina.toStringAsFixed(2)}\n'
          'Gasto com Álcool: R\$ ${gastoAlcool.toStringAsFixed(2)}\n'
          'Mais vantajoso: $melhor';
    });
  }

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        appBar: AppBar(
          title: const Text('Gasolina ou Álcool?'),
          backgroundColor: Colors.orange,
          centerTitle: true,
        ),
        body: Padding(
          padding: const EdgeInsets.all(16.0),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.start,
            children: [
              const Icon(Icons.directions_car, size: 100, color: Colors.red),
              const SizedBox(height: 20),

              TextField(
                controller: gasolinaController,
                keyboardType: TextInputType.number,
                decoration: const InputDecoration(
                  labelText: 'Preço da Gasolina',
                  border: OutlineInputBorder(),
                ),
              ),
              const SizedBox(height: 10),

              TextField(
                controller: alcoolController,
                keyboardType: TextInputType.number,
                decoration: const InputDecoration(
                  labelText: 'Preço do Álcool',
                  border: OutlineInputBorder(),
                ),
              ),
              const SizedBox(height: 10),

              TextField(
                controller: distanciaController,
                keyboardType: TextInputType.number,
                decoration: const InputDecoration(
                  labelText: 'Distância a percorrer (km)',
                  border: OutlineInputBorder(),
                ),
              ),
              const SizedBox(height: 20),

              ElevatedButton(
                onPressed: calcular,
                style: ElevatedButton.styleFrom(
                  backgroundColor: Colors.orange,
                  padding: const EdgeInsets.symmetric(
                    horizontal: 40,
                    vertical: 15,
                  ),
                ),
                child: const Text(
                  'Calcular',
                  style: TextStyle(fontSize: 18, color: Colors.white),
                ),
              ),
              const SizedBox(height: 20),

              Text(
                resultado,
                textAlign: TextAlign.center,
                style: const TextStyle(
                  fontSize: 18,
                  fontWeight: FontWeight.bold,
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}