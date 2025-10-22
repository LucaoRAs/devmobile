import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { theme } from '../theme';

export function StepHeader({
  title,
  subtitle,
  imageUri,
  containerStyle,
  titleStyle,
  subtitleStyle,
}) {
  return (
    <View style={[styles.container, containerStyle]}>
      <Image source={{ uri: imageUri }} style={styles.image} />
      <Text style={[styles.title, titleStyle]}>{title}</Text>
      {subtitle && (
        <Text style={[styles.subtitle, subtitleStyle]}>{subtitle}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: theme.spacing.xl,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: theme.borderRadius.lg,
    marginBottom: theme.spacing.lg,
  },
  title: {
    fontSize: theme.fontSize.xxl,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.text,
    textAlign: 'center',
    marginBottom: theme.spacing.sm,
  },
  subtitle: {
    fontSize: theme.fontSize.md,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
  },
});
