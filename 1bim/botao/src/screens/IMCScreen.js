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
import { calculateIMC, getIMCClassification, formatNumber } from '../utils/format';

export default function IMCScreen() {
  const navigation = useNavigation();
  const { state, saveDraft } = useWizard();

  const { peso_kg, altura_m, nome } = state.data;

  const imc = calculateIMC(peso_kg || 0, altura_m || 0);
  const classification = getIMCClassification(imc);

  const handleNext = async () => {
    try {
      await saveDraft();
      navigation.navigate('Calorias');
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
          title="Seu IMC"
          subtitle="Índice de Massa Corporal calculado"
          imageUri="https://picsum.photos/seed/imc/800/400"
        />

        <ProgressBar currentStep={7} totalSteps={8} />

        <View style={styles.content}>
          <View style={styles.imcContainer}>
            <Text style={styles.imcValue}>{formatNumber(imc, 2)}</Text>
            <Text style={styles.imcLabel}>IMC</Text>
          </View>

          <View style={styles.classificationContainer}>
            <Text style={styles.classificationTitle}>Classificação:</Text>
            <Text style={styles.classificationValue}>{classification}</Text>
          </View>

          <View style={styles.messageContainer}>
            <Text style={styles.message}>
              Olá {nome}! Seu IMC está classificado como "{classification}".
              {classification === 'Peso ideal' 
                ? ' Parabéns! Continue mantendo seus hábitos saudáveis.'
                : classification === 'Abaixo do peso'
                ? ' Considere consultar um nutricionista para uma dieta balanceada.'
                : ' Considere incluir mais atividades físicas e uma dieta equilibrada.'
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
            title="Próximo"
            onPress={handleNext}
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  imcContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  imcValue: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  imcLabel: {
    fontSize: 18,
    color: '#6D6D70',
    marginTop: 8,
  },
  classificationContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  classificationTitle: {
    fontSize: 16,
    color: '#6D6D70',
    marginBottom: 8,
  },
  classificationValue: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000',
  },
  messageContainer: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 12,
    marginHorizontal: 16,
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
