import 'dart:math' as math;
import 'package:flutter/material.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Emprestimo',
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.indigo),
        useMaterial3: true,
      ),
      home: const LoanPage(),
    );
  }
}

class LoanPage extends StatefulWidget {
  const LoanPage({super.key});

  @override
  State<LoanPage> createState() => _LoanPageState();
}

class _LoanPageState extends State<LoanPage> {
  final _valorController = TextEditingController();
  final _mesesController = TextEditingController();

  double? _totalCalculado;
  String? _erro;

  static const double _taxaMensal = 0.052; // 5.2% ao mes
  static const double _limite = 10000.0; // Limite maximo permitido

  @override
  void dispose() {
    _valorController.dispose();
    _mesesController.dispose();
    super.dispose();
  }

  double? _parseValor(String input) {
    final s = input.trim().replaceAll('.', '').replaceAll(',', '.');
    return double.tryParse(s);
  }

  void _calcular() {
    setState(() {
      _erro = null;
      _totalCalculado = null;
    });

    final valor = _parseValor(_valorController.text);
    final meses = int.tryParse(_mesesController.text.trim());

    if (valor == null || valor <= 0) {
      setState(() => _erro = 'Informe um valor de emprestimo valido.');
      return;
    }
    if (meses == null || meses <= 0) {
      setState(() => _erro = 'Informe a quantidade de meses (inteiro > 0).');
      return;
    }

    if (valor > _limite) {
      Navigator.of(context).push(
        MaterialPageRoute(
          builder: (_) => const SemLimitePage(),
        ),
      );
      return;
    }

    final montante = valor * math.pow(1 + _taxaMensal, meses);
    setState(() => _totalCalculado = montante);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Simulador de Emprestimo')),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            TextField(
              controller: _valorController,
              keyboardType: const TextInputType.numberWithOptions(decimal: true),
              decoration: const InputDecoration(
                labelText: 'Valor do emprestimo (R\$)',
                hintText: 'Ex: 10.000,00',
                border: OutlineInputBorder(),
              ),
            ),
            const SizedBox(height: 12),
            TextField(
              controller: _mesesController,
              keyboardType: TextInputType.number,
              decoration: const InputDecoration(
                labelText: 'Quantidade de meses',
                hintText: 'Ex: 12',
                border: OutlineInputBorder(),
              ),
            ),
            const SizedBox(height: 16),
            ElevatedButton(
              onPressed: _calcular,
              child: const Text('Calcular'),
            ),
            const SizedBox(height: 16),
            if (_erro != null)
              Text(
                _erro!,
                style: const TextStyle(color: Colors.red),
              ),
            if (_totalCalculado != null) ...[
              const Divider(height: 24),
              Text(
                'Total a pagar:',
                style: Theme.of(context).textTheme.titleMedium,
              ),
              Text(
                'R\$ ${_totalCalculado!.toStringAsFixed(2)}',
                style: Theme.of(context)
                    .textTheme
                    .headlineSmall
                    ?.copyWith(fontWeight: FontWeight.bold),
              ),
              const SizedBox(height: 8),
              const Text('Taxa de juros: 5,2% ao mes (juros compostos).'),
            ],
          ],
        ),
      ),
    );
  }
}

class SemLimitePage extends StatelessWidget {
  const SemLimitePage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Limite indisponivel')),
      body: Center(
        child: Padding(
          padding: const EdgeInsets.all(16.0),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              const Icon(Icons.block, size: 72, color: Colors.redAccent),
              const SizedBox(height: 12),
              const Text(
                'Voce nao possui limite disponivel para este valor.',
                textAlign: TextAlign.center,
              ),
              const SizedBox(height: 8),
              const Text(
                'Tente um valor de ate R\$ 10.000,00.',
                textAlign: TextAlign.center,
              ),
              const SizedBox(height: 16),
              ElevatedButton(
                onPressed: () => Navigator.of(context).pop(),
                child: const Text('Voltar'),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

