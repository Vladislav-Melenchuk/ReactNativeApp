import { EditableProfile, RegistrationFormValues } from '../types/app';

export const PHONE_REGEX = /^\+\d{12}$/;
export const EMAIL_REGEX =
  /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

export function validateRegistration(values: RegistrationFormValues) {
  const errors: Partial<Record<keyof RegistrationFormValues, string>> = {};

  if (!values.fullName.trim()) {
    errors.fullName = 'Вкажіть імʼя та прізвище.';
  }

  if (!PHONE_REGEX.test(values.phone.trim())) {
    errors.phone = 'Телефон має бути у форматі + і 12 цифр.';
  }

  if (!EMAIL_REGEX.test(values.email.trim())) {
    errors.email = 'Вкажіть коректний email.';
  }

  if (values.password.length < 8) {
    errors.password = 'Пароль має містити щонайменше 8 символів.';
  }

  if (values.confirmPassword !== values.password) {
    errors.confirmPassword = 'Паролі не співпадають.';
  }

  return errors;
}

export function validateProfile(values: EditableProfile) {
  const errors: Partial<Record<keyof EditableProfile, string>> = {};

  if (!values.fullName.trim()) {
    errors.fullName = 'Імʼя не може бути порожнім.';
  }

  if (!values.role.trim()) {
    errors.role = 'Вкажіть роль користувача.';
  }

  if (!PHONE_REGEX.test(values.phone.trim())) {
    errors.phone = 'Формат телефону: + та 12 цифр.';
  }

  if (!EMAIL_REGEX.test(values.email.trim())) {
    errors.email = 'Email має бути валідним.';
  }

  if (!values.city.trim()) {
    errors.city = 'Місто обовʼязкове.';
  }

  if (!values.department.trim()) {
    errors.department = 'Вкажіть відділ або напрям.';
  }

  if (values.bio.trim().length < 12) {
    errors.bio = 'Опис має містити хоча б 12 символів.';
  }

  return errors;
}
