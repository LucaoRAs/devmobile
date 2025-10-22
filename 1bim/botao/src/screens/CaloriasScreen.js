import React from 'react';
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
  Text,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { Button } from '../components/Button';
import { StepHeader } from '../components/StepHeader';
import { ProgressBar } from '../components/ProgressBar';
import { useWizard } from '../context/WizardContext';
import {
  calculateCaloriesIngested,
  calculateCaloriesBurned,
  calculateCalorieBalance,
  formatCalories,
} from '../utils/format';

export default function CaloriasScreen() {
  const navigation = useNavigation();
  const { state, saveDraft } = useWizard();

  const { almoco_g, jantar_g, outros_g, passos } = state.data;

  const caloriasIngeridas = calculateCaloriesIngested(
    almoco_g || 0,
    jantar_g || 0,
    outros_g || 0
  );
  const caloriasGastas = calculateCaloriesBurned(passos || 0);
  const saldo = calculateCalorieBalance(caloriasIngeridas, caloriasGastas);

  const handleFinish = async () => {
    try {
      await saveDraft();
      navigation.navigate('Summary');
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível salvar os dados. Tente novamente.');
    }
  };

  const handlePrevious = () => {
    navigation.goBack();
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <StepHeader
          title="Balanço Calórico"
          subtitle="Resumo do seu dia"
          imageUri="https://picsum.photos/seed/calorias/800/400"
        />

        <ProgressBar currentStep={8} totalSteps={8} />

        <View style={styles.content}>
          <View style={styles.summaryContainer}>
            <Text style={styles.summaryTitle}>Resumo do Dia</Text>
            
            <View style={styles.calorieRow}>
              <Text style={styles.calorieLabel}>Calorias Ingeridas:</Text>
              <Text style={styles.calorieValue}>{formatCalories(caloriasIngeridas)}</Text>
            </View>

            <View style={styles.calorieRow}>
              <Text style={styles.calorieLabel}>Calorias Gastas:</Text>
              <Text style={styles.calorieValue}>{formatCalories(caloriasGastas)}</Text>
            </View>

            <View style={[styles.calorieRow, styles.saldoRow]}>
              <Text style={styles.saldoLabel}>Saldo:</Text>
              <Text style={[
                styles.saldoValue,
                { color: saldo >= 0 ? '#34C759' : '#FF3B30' }
              ]}>
                {saldo >= 0 ? '+' : ''}{formatCalories(saldo)}
              </Text>
            </View>
          </View>

          <View style={styles.messageContainer}>
            <Text style={styles.message}>
              {saldo > 0 
                ? 'Você consumiu mais calorias do que gastou. Considere aumentar a atividade física.'
                : saldo < 0
                ? 'Você gastou mais calorias do que consumiu. Parabéns pelo dia ativo!'
                : 'Você manteve um equilíbrio perfeito entre calorias consumidas e gastas!'
              }
            </Text>
          </View>
        </View>

        <View style={styles.buttons}>
          <Button
            title="Anterior"
            onPress={handlePrevious}
            variant="outline"
            style={styles.button}
          />
          <Button
            title="Finalizar"
            onPress={handleFinish}
            style={styles.button}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
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
  summaryContainer: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
  },
  summaryTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    marginBottom: 20,
  },
  calorieRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F2F2F7',
  },
  saldoRow: {
    borderBottomWidth: 0,
    marginTop: 8,
    paddingTop: 16,
    borderTopWidth: 2,
    borderTopColor: '#F2F2F7',
  },
  calorieLabel: {
    fontSize: 16,
    color: '#6D6D70',
  },
  calorieValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  saldoLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  saldoValue: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  messageContainer: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 12,
    marginHorizontal: 0,
  },
  message: {
    fontSize: 16,
    lineHeight: 24,
    color: '#000',
    textAlign: 'center',
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
