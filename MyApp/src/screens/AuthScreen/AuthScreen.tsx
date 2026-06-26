import React, { useMemo, useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import { AppModal } from '../../components/AppModal/AppModal';
import { colors } from '../../theme/colors';
import {
  LoginFormValues,
  RegistrationFormValues,
  SessionUser,
} from '../../types/app';
import '../../utils/date';
import { EMAIL_REGEX, validateRegistration } from '../../utils/validation';

type AuthScreenProps = {
  onLogin: (credentials: LoginFormValues) => boolean;
  onRegister: (user: SessionUser) => void;
};

const EMPTY_LOGIN: LoginFormValues = {
  email: '',
  password: '',
};

const EMPTY_REGISTRATION: RegistrationFormValues = {
  fullName: '',
  phone: '',
  email: '',
  password: '',
  confirmPassword: '',
};

export function AuthScreen({ onLogin, onRegister }: AuthScreenProps) {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [loginValues, setLoginValues] = useState<LoginFormValues>(EMPTY_LOGIN);
  const [registerValues, setRegisterValues] =
    useState<RegistrationFormValues>(EMPTY_REGISTRATION);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalMessage, setModalMessage] = useState('');
  const [modalDetails, setModalDetails] = useState<string[]>([]);

  const registerErrors = useMemo(
    () => Object.values(validateRegistration(registerValues)),
    [registerValues],
  );

  const loginErrors = useMemo(() => {
    const errors: string[] = [];

    if (!EMAIL_REGEX.test(loginValues.email.trim())) {
      errors.push('Введіть коректний email.');
    }

    if (loginValues.password.length < 8) {
      errors.push('Пароль має містити щонайменше 8 символів.');
    }

    return errors;
  }, [loginValues]);

  const openModal = (title: string, message: string, details: string[] = []) => {
    setModalTitle(title);
    setModalMessage(message);
    setModalDetails(details);
    setModalVisible(true);
  };

  const fillDemo = () => {
    if (mode === 'login') {
      setLoginValues({
        email: 'v.melenchuk@example.com',
        password: 'Secure123',
      });
      return;
    }

    setRegisterValues({
      fullName: 'Олена Бондар',
      phone: '+380671112233',
      email: 'olena.bondar@example.com',
      password: 'Secure123',
      confirmPassword: 'Secure123',
    });
  };

  const submitLogin = () => {
    if (loginErrors.length > 0) {
      openModal('Не вдалося увійти', 'Перевірте форму авторизації.', loginErrors);
      return;
    }

    if (!onLogin(loginValues)) {
      openModal('Невірні дані', 'Email або пароль не збігаються.', [
        'Спробуйте демо-акаунт: v.melenchuk@example.com / Secure123',
      ]);
    }
  };

  const submitRegistration = () => {
    if (registerErrors.length > 0) {
      openModal(
        'Форма заповнена некоректно',
        'Виправте поля та повторіть спробу.',
        registerErrors,
      );
      return;
    }

    onRegister({
      fullName: registerValues.fullName,
      phone: registerValues.phone,
      email: registerValues.email,
      password: registerValues.password,
      role: 'New Member',
      city: 'Київ',
      department: 'Mobile Team',
      bio: 'Новий користувач мобільного застосунку.',
      registeredAt: new Date().toSqlDateTime(),
    });
  };

  return (
    <>
      <ScrollView
        contentContainerStyle={authStyles.content}
        keyboardShouldPersistTaps="handled"
      >
        <View style={authStyles.shell}>
          <View style={authStyles.header}>
            <Text style={authStyles.brand}>Nova App</Text>
            <Text style={authStyles.title}>
              {mode === 'login' ? 'Вхід в акаунт' : 'Створення акаунта'}
            </Text>
            <Text style={authStyles.subtitle}>
              {mode === 'login'
                ? 'Повертаємось до робочого простору.'
                : 'Створи профіль і переходь у застосунок.'}
            </Text>
          </View>

          <View style={authStyles.segmented}>
            <Pressable
              onPress={() => setMode('login')}
              style={[
                authStyles.segmentButton,
                mode === 'login' ? authStyles.segmentButtonActive : null,
              ]}
            >
              <Text
                style={[
                  authStyles.segmentText,
                  mode === 'login' ? authStyles.segmentTextActive : null,
                ]}
              >
                Вхід
              </Text>
            </Pressable>
            <Pressable
              onPress={() => setMode('register')}
              style={[
                authStyles.segmentButton,
                mode === 'register' ? authStyles.segmentButtonActive : null,
              ]}
            >
              <Text
                style={[
                  authStyles.segmentText,
                  mode === 'register' ? authStyles.segmentTextActive : null,
                ]}
              >
                Реєстрація
              </Text>
            </Pressable>
          </View>

          <View style={authStyles.formCard}>
            {mode === 'login' ? (
              <View style={authStyles.form}>
                <Field
                  label="Email"
                  onChangeText={value =>
                    setLoginValues(current => ({ ...current, email: value }))
                  }
                  value={loginValues.email}
                />
                <Field
                  label="Пароль"
                  onChangeText={value =>
                    setLoginValues(current => ({ ...current, password: value }))
                  }
                  secureTextEntry
                  value={loginValues.password}
                />
              </View>
            ) : (
              <View style={authStyles.form}>
                <Field
                  label="Ім'я та прізвище"
                  onChangeText={value =>
                    setRegisterValues(current => ({ ...current, fullName: value }))
                  }
                  value={registerValues.fullName}
                />
                <Field
                  label="Телефон"
                  onChangeText={value =>
                    setRegisterValues(current => ({ ...current, phone: value }))
                  }
                  placeholder="+380501234567"
                  value={registerValues.phone}
                />
                <Field
                  label="Email"
                  onChangeText={value =>
                    setRegisterValues(current => ({ ...current, email: value }))
                  }
                  value={registerValues.email}
                />
                <Field
                  label="Пароль"
                  onChangeText={value =>
                    setRegisterValues(current => ({ ...current, password: value }))
                  }
                  secureTextEntry
                  value={registerValues.password}
                />
                <Field
                  label="Повторити пароль"
                  onChangeText={value =>
                    setRegisterValues(current => ({
                      ...current,
                      confirmPassword: value,
                    }))
                  }
                  secureTextEntry
                  value={registerValues.confirmPassword}
                />
              </View>
            )}

            <View style={authStyles.actions}>
              <Pressable onPress={fillDemo} style={authStyles.ghostButton}>
                <Text style={authStyles.ghostButtonText}>Демо</Text>
              </Pressable>
              <Pressable
                onPress={mode === 'login' ? submitLogin : submitRegistration}
                style={authStyles.primaryButton}
              >
                <Text style={authStyles.primaryButtonText}>
                  {mode === 'login' ? 'Увійти' : 'Створити акаунт'}
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </ScrollView>

      <AppModal
        actions={[
          {
            label: 'Добре',
            onPress: () => setModalVisible(false),
          },
        ]}
        details={modalDetails}
        message={modalMessage}
        onRequestClose={() => setModalVisible(false)}
        title={modalTitle}
        visible={modalVisible}
      />
    </>
  );
}

function Field({
  label,
  onChangeText,
  placeholder,
  secureTextEntry,
  value,
}: {
  label: string;
  onChangeText: (value: string) => void;
  placeholder?: string;
  secureTextEntry?: boolean;
  value: string;
}) {
  return (
    <View style={authStyles.field}>
      <Text style={authStyles.fieldLabel}>{label}</Text>
      <TextInput
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.textMuted}
        secureTextEntry={secureTextEntry}
        style={authStyles.input}
        value={value}
      />
    </View>
  );
}

const authStyles = StyleSheet.create({
  content: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  shell: {
    gap: 18,
  },
  header: {
    paddingHorizontal: 4,
    gap: 8,
  },
  brand: {
    color: colors.accentAmber,
    fontSize: 14,
    fontWeight: '700',
  },
  title: {
    color: colors.textPrimary,
    fontSize: 30,
    fontWeight: '800',
  },
  subtitle: {
    color: colors.textSecondary,
    fontSize: 15,
    lineHeight: 22,
  },
  segmented: {
    flexDirection: 'row',
    padding: 6,
    borderRadius: 20,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  segmentButton: {
    flex: 1,
    minHeight: 44,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  segmentButtonActive: {
    backgroundColor: colors.tabActive,
  },
  segmentText: {
    color: colors.textMuted,
    fontSize: 14,
    fontWeight: '700',
  },
  segmentTextActive: {
    color: colors.textPrimary,
  },
  formCard: {
    padding: 20,
    borderRadius: 28,
    backgroundColor: colors.surfaceStrong,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    gap: 18,
  },
  form: {
    gap: 14,
  },
  field: {
    gap: 6,
  },
  fieldLabel: {
    color: colors.textSecondary,
    fontSize: 13,
    fontWeight: '700',
  },
  input: {
    minHeight: 52,
    paddingHorizontal: 14,
    borderRadius: 16,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    color: colors.textPrimary,
    fontSize: 15,
  },
  actions: {
    flexDirection: 'row',
    gap: 12,
  },
  ghostButton: {
    width: 82,
    minHeight: 52,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.tabIdle,
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  ghostButtonText: {
    color: colors.textSecondary,
    fontSize: 14,
    fontWeight: '700',
  },
  primaryButton: {
    flex: 1,
    minHeight: 52,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.tabActive,
  },
  primaryButtonText: {
    color: colors.textPrimary,
    fontSize: 15,
    fontWeight: '800',
  },
});
