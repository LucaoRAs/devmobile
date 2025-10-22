# App React Native - Assistente de Saúde

Um aplicativo React Native desenvolvido com Expo + JavaScript que funciona como um assistente/wizard para coleta de dados de saúde e bem-estar.

##  Funcionalidades

- **8 telas de coleta de dados** com validação em tempo real
- **Barra de progresso** visual para acompanhar o andamento
- **Persistência de dados** com AsyncStorage (rascunho automático)
- **Cálculos automáticos** de IMC e balanço calórico
- **Interface acessível** com labels e navegação por teclado
- **Validação robusta** com React Hook Form + Zod
- **Tema em português brasileiro**

##  Telas

1. **Nome e Idade** - Informações pessoais básicas
2. **Altura e Peso** - Medidas corporais para cálculo de IMC
3. **Almoço** - Quantidade de comida consumida no almoço
4. **Jantar** - Quantidade de comida consumida no jantar
5. **Outras Refeições** - Café da manhã, lanches, etc.
6. **Passos** - Atividade física diária
7. **IMC** - Cálculo e classificação do Índice de Massa Corporal
8. **Calorias** - Balanço calórico do dia
9. **Resumo** - Visualização completa dos dados coletados

##  Tecnologias

- **React Native** com Expo
- **JavaScript** puro (sem TypeScript)
- **React Navigation** para navegação entre telas
- **React Hook Form** + **Zod** para validação de formulários
- **AsyncStorage** para persistência de dados
- **Context API** para gerenciamento de estado
- **Jest** para testes unitários

##  Instalação

1. Clone o repositório:
```bash
git clone <url-do-repositorio>
cd botao
```

2. Instale as dependências:
```bash
npm install --legacy-peer-deps
```

3. Inicie o projeto:
```bash
npx expo start
```

4. Execute os testes:
```bash
npm test
```

##  Estrutura do Projeto

```
src/
 components/          # Componentes reutilizáveis
    Button.js
    TextField.js
    StepHeader.js
    ProgressBar.js
 context/            # Context API para estado global
    WizardContext.js
 navigation/         # Configuração de navegação
    RootStack.js
 screens/           # Telas do aplicativo
    NomeIdadeScreen.js
    AlturaPesoScreen.js
    AlmocoScreen.js
    JantarScreen.js
    OutrosScreen.js
    PassosScreen.js
    IMCScreen.js
    CaloriasScreen.js
    SummaryScreen.js
 utils/             # Funções utilitárias
    format.js
 theme.js           # Configuração de tema
```

##  Testes

O projeto inclui testes unitários para as funções de cálculo:

```bash
npm test
```

Os testes cobrem:
- Cálculo de IMC
- Classificação de IMC
- Cálculo de calorias ingeridas
- Cálculo de calorias gastas
- Cálculo de saldo calórico

##  Design

- **Tema consistente** com cores e tipografia padronizadas
- **Componentes reutilizáveis** para manter consistência visual
- **Imagens ilustrativas** usando Picsum Photos
- **Interface responsiva** com KeyboardAvoidingView
- **Acessibilidade** com labels e navegação por teclado

##  Cálculos

### IMC (Índice de Massa Corporal)
```
IMC = peso_kg / (altura_m * altura_m)
```

### Classificação de IMC
- **Abaixo do peso**: IMC < 24
- **Peso ideal**: 24  IMC  26
- **Acima do peso**: IMC > 26

### Balanço Calórico
```
Calorias Ingeridas = (almoço_g + jantar_g + outros_g) * 3
Calorias Gastas = passos * 0.08
Saldo = Calorias Ingeridas - Calorias Gastas
```

##  Scripts Disponíveis

- `npm start` - Inicia o servidor de desenvolvimento
- `npm run android` - Executa no Android
- `npm run ios` - Executa no iOS
- `npm run web` - Executa no navegador
- `npm test` - Executa os testes

##  Compatibilidade

- **iOS**: 11.0+
- **Android**: API 21+
- **Expo**: ~53.0.22
- **React Native**: 0.79.6

##  Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

##  Licença

Este projeto está sob a licença 0BSD. Veja o arquivo `LICENSE` para mais detalhes.
