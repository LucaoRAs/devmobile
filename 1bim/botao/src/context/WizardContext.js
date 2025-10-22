import React, { createContext, useContext, useReducer, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { z } from 'zod';

// Schemas de validação
export const nomeIdadeSchema = z.object({
  nome: z.string().min(1, 'Nome é obrigatório'),
  idade: z.number().min(10, 'Idade deve ser pelo menos 10').max(120, 'Idade deve ser no máximo 120'),
});

export const alturaPesoSchema = z.object({
  altura_m: z.number().min(1.2, 'Altura deve ser pelo menos 1.2m').max(2.3, 'Altura deve ser no máximo 2.3m'),
  peso_kg: z.number().min(25, 'Peso deve ser pelo menos 25kg').max(300, 'Peso deve ser no máximo 300kg'),
});

export const almocoSchema = z.object({
  almoco_g: z.number().min(0, 'Valor deve ser maior ou igual a 0'),
});

export const jantarSchema = z.object({
  jantar_g: z.number().min(0, 'Valor deve ser maior ou igual a 0'),
});

export const outrosSchema = z.object({
  outros_g: z.number().min(0, 'Valor deve ser maior ou igual a 0'),
});

export const passosSchema = z.object({
  passos: z.number().min(0, 'Valor deve ser maior ou igual a 0'),
});

const initialState = {
  currentStep: 'NomeIdade',
  data: {},
  isLoading: false,
  hasDraft: false,
};

function wizardReducer(state, action) {
  switch (action.type) {
    case 'SET_STEP':
      return { ...state, currentStep: action.payload };
    case 'UPDATE_DATA':
      return { ...state, data: { ...state.data, ...action.payload } };
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_HAS_DRAFT':
      return { ...state, hasDraft: action.payload };
    case 'RESET_WIZARD':
      return { ...initialState };
    default:
      return state;
  }
}

const WizardContext = createContext(null);

const DRAFT_KEY = '@wizard_draft';

export function WizardProvider({ children }) {
  const [state, dispatch] = useReducer(wizardReducer, initialState);

  const saveDraft = useCallback(async () => {
    try {
      await AsyncStorage.setItem(DRAFT_KEY, JSON.stringify(state.data));
    } catch (error) {
      console.error('Erro ao salvar rascunho:', error);
    }
  }, [state.data]);

  const loadDraft = useCallback(async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const draft = await AsyncStorage.getItem(DRAFT_KEY);
      if (draft) {
        const data = JSON.parse(draft);
        dispatch({ type: 'UPDATE_DATA', payload: data });
        dispatch({ type: 'SET_HAS_DRAFT', payload: true });
      }
    } catch (error) {
      console.error('Erro ao carregar rascunho:', error);
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }, []);

  const clearDraft = useCallback(async () => {
    try {
      await AsyncStorage.removeItem(DRAFT_KEY);
      dispatch({ type: 'RESET_WIZARD' });
    } catch (error) {
      console.error('Erro ao limpar rascunho:', error);
    }
  }, []);

  useEffect(() => {
    loadDraft();
  }, [loadDraft]);

  return (
    <WizardContext.Provider value={{ state, dispatch, saveDraft, loadDraft, clearDraft }}>
      {children}
    </WizardContext.Provider>
  );
}

export function useWizard() {
  const context = useContext(WizardContext);
  if (!context) {
    throw new Error('useWizard deve ser usado dentro de WizardProvider');
  }
  return context;
}
