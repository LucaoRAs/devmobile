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
import { passosSchema } from '../context/WizardContext';

export default function PassosScreen() {
  const navigation = useNavigation();
  const { state, dispatch, saveDraft } = useWizard();
  const passosRef = useRef(null);

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm({
    resolver: zodResolver(passosSchema),
    defaultValues: {
      passos: state.data.passos || undefined,
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
      navigation.navigate('IMC');
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
          title="Atividade Física"
          subtitle="Quantos passos você deu hoje?"
          imageUri="https://picsum.photos/seed/passos/800/400"
        />

        <ProgressBar currentStep={6} totalSteps={8} />

        <View style={styles.form}>
          <Controller
            control={control}
            name="passos"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextField
                ref={passosRef}
                label="Número de passos"
                value={value?.toString() || ''}
                onChangeText={(text) => {
                  const numericValue = parseInt(text, 10);
                  onChange(isNaN(numericValue) ? undefined : numericValue);
                }}
                onBlur={onBlur}
                error={errors.passos?.message}
                required
                placeholder="Ex: 8500"
                keyboardType="numeric"
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
