import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../theme';

export function ProgressBar({
  currentStep,
  totalSteps,
  containerStyle,
  barStyle,
  textStyle,
}) {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={[styles.text, textStyle]}>
        Passo {currentStep} de {totalSteps}
      </Text>
      <View style={[styles.bar, barStyle]}>
        <View
          style={[
            styles.progress,
            { width: `${progress}%` },
          ]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: theme.spacing.lg,
  },
  text: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    marginBottom: theme.spacing.sm,
  },
  bar: {
    height: 4,
    backgroundColor: theme.colors.border,
    borderRadius: 2,
    overflow: 'hidden',
  },
  progress: {
    height: '100%',
    backgroundColor: theme.colors.primary,
    borderRadius: 2,
  },
});
