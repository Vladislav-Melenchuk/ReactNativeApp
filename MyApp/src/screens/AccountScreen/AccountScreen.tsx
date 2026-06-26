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
import { EditableProfile, SessionUser } from '../../types/app';
import { validateProfile } from '../../utils/validation';

type AccountScreenProps = {
  onLogout: () => void;
  onSaveProfile: (profile: EditableProfile) => void;
  user: SessionUser;
};

export function AccountScreen({
  onLogout,
  onSaveProfile,
  user,
}: AccountScreenProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState<EditableProfile>({
    fullName: user.fullName,
    role: user.role,
    phone: user.phone,
    email: user.email,
    city: user.city,
    department: user.department,
    bio: user.bio,
  });
  const [savedModalVisible, setSavedModalVisible] = useState(false);

  const errors = useMemo(() => validateProfile(draft), [draft]);
  const isSaveDisabled =
    Object.keys(errors).length > 0 ||
    JSON.stringify(draft) ===
      JSON.stringify({
        fullName: user.fullName,
        role: user.role,
        phone: user.phone,
        email: user.email,
        city: user.city,
        department: user.department,
        bio: user.bio,
      });

  return (
    <>
      <ScrollView
        contentContainerStyle={accountStyles.content}
        keyboardShouldPersistTaps="handled"
      >
        <View style={accountStyles.profileHero}>
          <View style={accountStyles.avatar}>
            <Text style={accountStyles.avatarText}>
              {user.fullName
                .split(' ')
                .map(part => part[0])
                .join('')
                .slice(0, 2)}
            </Text>
          </View>
          <Text style={accountStyles.name}>{user.fullName}</Text>
          <Text style={accountStyles.role}>{user.role}</Text>
          <View style={accountStyles.heroActions}>
            <Pressable
              onPress={() => {
                if (isEditing) {
                  setDraft({
                    fullName: user.fullName,
                    role: user.role,
                    phone: user.phone,
                    email: user.email,
                    city: user.city,
                    department: user.department,
                    bio: user.bio,
                  });
                }
                setIsEditing(value => !value);
              }}
              style={accountStyles.secondaryButton}
            >
              <Text style={accountStyles.secondaryButtonText}>
                {isEditing ? 'Отмена' : 'Редактировать'}
              </Text>
            </Pressable>
            <Pressable onPress={onLogout} style={accountStyles.ghostButton}>
              <Text style={accountStyles.ghostButtonText}>Выйти</Text>
            </Pressable>
          </View>
        </View>

        <View style={accountStyles.card}>
          {isEditing ? (
            <View style={accountStyles.form}>
              <Field
                error={errors.fullName}
                label="Имя"
                onChangeText={value =>
                  setDraft(current => ({ ...current, fullName: value }))
                }
                value={draft.fullName}
              />
              <Field
                error={errors.role}
                label="Роль"
                onChangeText={value =>
                  setDraft(current => ({ ...current, role: value }))
                }
                value={draft.role}
              />
              <Field
                error={errors.phone}
                label="Телефон"
                onChangeText={value =>
                  setDraft(current => ({ ...current, phone: value }))
                }
                value={draft.phone}
              />
              <Field
                error={errors.email}
                label="Email"
                onChangeText={value =>
                  setDraft(current => ({ ...current, email: value }))
                }
                value={draft.email}
              />
              <Field
                error={errors.city}
                label="Город"
                onChangeText={value =>
                  setDraft(current => ({ ...current, city: value }))
                }
                value={draft.city}
              />
              <Field
                error={errors.department}
                label="Команда"
                onChangeText={value =>
                  setDraft(current => ({ ...current, department: value }))
                }
                value={draft.department}
              />
              <Field
                error={errors.bio}
                label="О себе"
                multiline
                onChangeText={value =>
                  setDraft(current => ({ ...current, bio: value }))
                }
                value={draft.bio}
              />

              <Pressable
                disabled={isSaveDisabled}
                onPress={() => {
                  onSaveProfile(draft);
                  setIsEditing(false);
                  setSavedModalVisible(true);
                }}
                style={[
                  accountStyles.saveButton,
                  isSaveDisabled ? accountStyles.saveButtonDisabled : null,
                ]}
              >
                <Text style={accountStyles.saveButtonText}>Сохранить</Text>
              </Pressable>
            </View>
          ) : (
            <View style={accountStyles.infoGrid}>
              <InfoCard label="Телефон" value={user.phone} />
              <InfoCard label="Email" value={user.email} />
              <InfoCard label="Город" value={user.city} />
              <InfoCard label="Команда" value={user.department} />
              <InfoCard label="О себе" value={user.bio} wide />
            </View>
          )}
        </View>
      </ScrollView>

      <AppModal
        actions={[
          {
            label: 'Отлично',
            onPress: () => setSavedModalVisible(false),
          },
        ]}
        message="Данные профиля сохранены."
        onRequestClose={() => setSavedModalVisible(false)}
        title="Готово"
        visible={savedModalVisible}
      />
    </>
  );
}

function Field({
  error,
  label,
  multiline,
  onChangeText,
  value,
}: {
  error?: string;
  label: string;
  multiline?: boolean;
  onChangeText: (value: string) => void;
  value: string;
}) {
  return (
    <View style={accountStyles.field}>
      <Text style={accountStyles.fieldLabel}>{label}</Text>
      <TextInput
        multiline={multiline}
        onChangeText={onChangeText}
        placeholderTextColor={colors.textMuted}
        style={[
          accountStyles.input,
          multiline ? accountStyles.inputMultiline : null,
          error ? accountStyles.inputError : null,
        ]}
        textAlignVertical={multiline ? 'top' : 'center'}
        value={value}
      />
      {error ? <Text style={accountStyles.error}>{error}</Text> : null}
    </View>
  );
}

function InfoCard({
  label,
  value,
  wide,
}: {
  label: string;
  value: string;
  wide?: boolean;
}) {
  return (
    <View style={[accountStyles.infoCard, wide ? accountStyles.infoCardWide : null]}>
      <Text style={accountStyles.infoLabel}>{label}</Text>
      <Text style={accountStyles.infoValue}>{value}</Text>
    </View>
  );
}

const accountStyles = StyleSheet.create({
  content: {
    gap: 18,
    paddingBottom: 8,
  },
  profileHero: {
    padding: 24,
    borderRadius: 28,
    backgroundColor: colors.surfaceStrong,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    alignItems: 'center',
  },
  avatar: {
    width: 82,
    height: 82,
    borderRadius: 28,
    backgroundColor: colors.tabActive,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
  },
  avatarText: {
    color: colors.textPrimary,
    fontSize: 28,
    fontWeight: '800',
  },
  name: {
    color: colors.textPrimary,
    fontSize: 26,
    fontWeight: '800',
    marginBottom: 4,
  },
  role: {
    color: colors.textSecondary,
    fontSize: 15,
    marginBottom: 18,
  },
  heroActions: {
    flexDirection: 'row',
    gap: 12,
  },
  card: {
    padding: 20,
    borderRadius: 24,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.cardBorder,
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
    borderRadius: 16,
    paddingHorizontal: 14,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    color: colors.textPrimary,
    fontSize: 15,
  },
  inputMultiline: {
    minHeight: 100,
    paddingTop: 14,
  },
  inputError: {
    borderColor: 'rgba(255,136,160,0.58)',
  },
  error: {
    color: '#FFB7C6',
    fontSize: 12,
  },
  infoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  infoCard: {
    width: '47%',
    padding: 16,
    borderRadius: 20,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  infoCardWide: {
    width: '100%',
  },
  infoLabel: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: '700',
    marginBottom: 6,
  },
  infoValue: {
    color: colors.textPrimary,
    fontSize: 15,
    lineHeight: 22,
    fontWeight: '600',
  },
  saveButton: {
    minHeight: 54,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.accentGreen,
  },
  saveButtonDisabled: {
    opacity: 0.45,
  },
  saveButtonText: {
    color: '#06241B',
    fontSize: 15,
    fontWeight: '800',
  },
  secondaryButton: {
    minWidth: 144,
    minHeight: 46,
    paddingHorizontal: 16,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.tabActive,
  },
  secondaryButtonText: {
    color: colors.textPrimary,
    fontSize: 14,
    fontWeight: '800',
  },
  ghostButton: {
    minWidth: 92,
    minHeight: 46,
    paddingHorizontal: 16,
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
});
