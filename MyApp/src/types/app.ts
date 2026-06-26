export type TabKey =
  | 'home'
  | 'gestures'
  | 'animation'
  | 'finance'
  | 'account';

export type RegistrationFormValues = {
  fullName: string;
  phone: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type UserProfile = {
  fullName: string;
  role: string;
  phone: string;
  email: string;
  city: string;
  department: string;
  bio: string;
  registeredAt: string;
};

export type EditableProfile = Omit<UserProfile, 'registeredAt'>;

export type SessionUser = UserProfile & {
  password: string;
};

export type LoginFormValues = {
  email: string;
  password: string;
};
