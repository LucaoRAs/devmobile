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
import { alturaPesoSchema } from '../context/WizardContext';

export default function AlturaPesoScreen() {
  const navigation = useNavigation();
  const { state, dispatch, saveDraft } = useWizard();
  const alturaRef = useRef(null);

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm({
    resolver: zodResolver(alturaPesoSchema),
    defaultValues: {
      altura_m: state.data.altura_m || undefined,
      peso_kg: state.data.peso_kg || undefined,
    },
    mode: 'onChange',
  });

  const watchedValues = watch();

  useEffect(() => {
    dispatch({
      type: 'UPDATE_DATA',
      payload: watchedValues,
    });
  }, [watchedValues, dispatch]);

  const handleNext = async () => {
    try {
      await saveDraft();
      navigation.navigate('Almoco');
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
          title="Altura e Peso"
          subtitle="Informe sua altura em metros e peso em quilogramas"
          imageUri="https://picsum.photos/seed/altura-peso/800/400"
        />

        <ProgressBar currentStep={2} totalSteps={8} />

        <View style={styles.form}>
          <Controller
            control={control}
            name="altura_m"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextField
                ref={alturaRef}
                label="Altura (metros)"
                value={value?.toString() || ''}
                onChangeText={(text) => {
                  const numericValue = parseFloat(text.replace(',', '.'));
                  onChange(isNaN(numericValue) ? undefined : numericValue);
                }}
                onBlur={onBlur}
                error={errors.altura_m?.message}
                required
                placeholder="Ex: 1.75"
                keyboardType="decimal-pad"
                returnKeyType="next"
              />
            )}
          />

          <Controller
            control={control}
            name="peso_kg"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextField
                label="Peso (quilogramas)"
                value={value?.toString() || ''}
                onChangeText={(text) => {
                  const numericValue = parseFloat(text.replace(',', '.'));
                  onChange(isNaN(numericValue) ? undefined : numericValue);
                }}
                onBlur={onBlur}
                error={errors.peso_kg?.message}
                required
                placeholder="Ex: 70.5"
                keyboardType="decimal-pad"
                returnKeyType="done"
              />
            )}
          />
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
