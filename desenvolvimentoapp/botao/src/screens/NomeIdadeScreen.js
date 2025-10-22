import React, { useRef, useEffect } from 'react';
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigation } from '@react-navigation/native';

import { Button } from '../components/Button';
import { TextField } from '../components/TextField';
import { StepHeader } from '../components/StepHeader';
import { ProgressBar } from '../components/ProgressBar';
import { useWizard } from '../context/WizardContext';
import { nomeIdadeSchema } from '../context/WizardContext';

export default function NomeIdadeScreen() {
  const navigation = useNavigation();
  const { state, dispatch, saveDraft } = useWizard();
  const nomeRef = useRef(null);

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm({
    resolver: zodResolver(nomeIdadeSchema),
    defaultValues: {
      nome: state.data.nome || '',
      idade: state.data.idade || undefined,
    },
    mode: 'onChange',
  });

  const watchedValues = watch();

  useEffect(() => {
    // Atualizar dados no contexto quando os valores mudarem
    dispatch({
      type: 'UPDATE_DATA',
      payload: watchedValues,
    });
  }, [watchedValues, dispatch]);

  const handleNext = async () => {
    try {
      await saveDraft();
      navigation.navigate('AlturaPeso');
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível salvar os dados. Tente novamente.');
    }
  };

  const handlePrevious = () => {
    // Primeira tela, não há anterior
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
          title="Informações Pessoais"
          subtitle="Vamos começar com suas informações básicas"
          imageUri="https://picsum.photos/seed/nome-idade/800/400"
        />

        <ProgressBar currentStep={1} totalSteps={8} />

        <View style={styles.form}>
          <Controller
            control={control}
            name="nome"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextField
                ref={nomeRef}
                label="Nome completo"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                error={errors.nome?.message}
                required
                placeholder="Digite seu nome completo"
                autoCapitalize="words"
                returnKeyType="next"
                onSubmitEditing={() => {
                  // Foco no próximo campo
                }}
              />
            )}
          />

          <Controller
            control={control}
            name="idade"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextField
                label="Idade"
                value={value?.toString() || ''}
                onChangeText={(text) => {
                  const numericValue = parseInt(text, 10);
                  onChange(isNaN(numericValue) ? undefined : numericValue);
                }}
                onBlur={onBlur}
                error={errors.idade?.message}
                required
                placeholder="Digite sua idade"
                keyboardType="numeric"
                returnKeyType="done"
                maxLength={3}
              />
            )}
          />
        </View>

        <View style={styles.buttons}>
          <Button
            title="Anterior"
            onPress={handlePrevious}
            variant="outline"
            disabled={true}
            style={styles.button}
          />
          <Button
            title="Próximo"
            onPress={handleSubmit(handleNext)}
            disabled={!isValid}
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
  form: {
    flex: 1,
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
