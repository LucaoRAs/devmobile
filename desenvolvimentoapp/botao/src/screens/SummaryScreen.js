import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { Button } from '../components/Button';
import { StepHeader } from '../components/StepHeader';
import { useWizard } from '../context/WizardContext';
import {
  calculateIMC,
  getIMCClassification,
  calculateCaloriesIngested,
  calculateCaloriesBurned,
  calculateCalorieBalance,
  formatNumber,
  formatCalories,
} from '../utils/format';

export default function SummaryScreen() {
  const navigation = useNavigation();
  const { state, clearDraft } = useWizard();

  const { nome, idade, altura_m, peso_kg, almoco_g, jantar_g, outros_g, passos } = state.data;

  const imc = calculateIMC(peso_kg || 0, altura_m || 0);
  const classification = getIMCClassification(imc);
  const caloriasIngeridas = calculateCaloriesIngested(
    almoco_g || 0,
    jantar_g || 0,
    outros_g || 0
  );
  const caloriasGastas = calculateCaloriesBurned(passos || 0);
  const saldo = calculateCalorieBalance(caloriasIngeridas, caloriasGastas);

  const handleRestart = async () => {
    Alert.alert(
      'Reiniciar',
      'Tem certeza que deseja reiniciar o assistente? Todos os dados serão perdidos.',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Reiniciar',
          style: 'destructive',
          onPress: async () => {
            await clearDraft();
            navigation.navigate('NomeIdade');
          },
        },
      ]
    );
  };

  const handleEdit = () => {
    navigation.navigate('NomeIdade');
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      <StepHeader
        title="Resumo Completo"
        subtitle="Todos os seus dados coletados"
        imageUri="https://picsum.photos/seed/summary/800/400"
      />

      <View style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Informações Pessoais</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Nome:</Text>
            <Text style={styles.value}>{nome}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Idade:</Text>
            <Text style={styles.value}>{idade} anos</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Medidas Corporais</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Altura:</Text>
            <Text style={styles.value}>{formatNumber(altura_m || 0, 2)} m</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Peso:</Text>
            <Text style={styles.value}>{formatNumber(peso_kg || 0, 1)} kg</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>IMC:</Text>
            <Text style={styles.value}>{formatNumber(imc, 2)} ({classification})</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Consumo Alimentar</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Almoço:</Text>
            <Text style={styles.value}>{almoco_g}g</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Jantar:</Text>
            <Text style={styles.value}>{jantar_g}g</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Outros:</Text>
            <Text style={styles.value}>{outros_g}g</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Atividade Física</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Passos:</Text>
            <Text style={styles.value}>{passos?.toLocaleString()}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Balanço Calórico</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Calorias Ingeridas:</Text>
            <Text style={styles.value}>{formatCalories(caloriasIngeridas)}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Calorias Gastas:</Text>
            <Text style={styles.value}>{formatCalories(caloriasGastas)}</Text>
          </View>
          <View style={[styles.row, styles.saldoRow]}>
            <Text style={styles.saldoLabel}>Saldo:</Text>
            <Text style={[
              styles.saldoValue,
              { color: saldo >= 0 ? '#34C759' : '#FF3B30' }
            ]}>
              {saldo >= 0 ? '+' : ''}{formatCalories(saldo)}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.buttons}>
        <Button
          title="Reiniciar"
          onPress={handleRestart}
          variant="outline"
          style={styles.button}
        />
        <Button
          title="Editar"
          onPress={handleEdit}
          style={styles.button}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  scrollContent: {
    flexGrow: 1,
    padding: 16,
  },
  content: {
    flex: 1,
  },
  section: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 12,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F2F2F7',
  },
  saldoRow: {
    borderBottomWidth: 0,
    marginTop: 8,
    paddingTop: 12,
    borderTopWidth: 2,
    borderTopColor: '#F2F2F7',
  },
  label: {
    fontSize: 16,
    color: '#6D6D70',
    flex: 1,
  },
  value: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    textAlign: 'right',
  },
  saldoLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    flex: 1,
  },
  saldoValue: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'right',
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
    gap: 16,
  },
  button: {
    flex: 1,
  },
});
