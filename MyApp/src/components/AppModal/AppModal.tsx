import React from 'react';
import {
  Modal,
  Pressable,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import { appModalStyles } from './AppModal.styles';

type AppModalAction = {
  label: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
};

type AppModalProps = {
  actions: AppModalAction[];
  details?: string[];
  message: string;
  onRequestClose: () => void;
  title: string;
  visible: boolean;
};

export function AppModal({
  actions,
  details,
  message,
  onRequestClose,
  title,
  visible,
}: AppModalProps) {
  const wrapButtons = actions.length > 3;

  return (
    <Modal
      animationType="fade"
      onRequestClose={onRequestClose}
      transparent
      visible={visible}
    >
      <TouchableWithoutFeedback onPress={onRequestClose}>
        <View style={appModalStyles.backdrop}>
          <TouchableWithoutFeedback>
            <View style={appModalStyles.card}>
              <Text style={appModalStyles.title}>{title}</Text>
              <Text style={appModalStyles.message}>{message}</Text>

              {details?.length ? (
                <View style={appModalStyles.details}>
                  {details.map(item => (
                    <Text key={item} style={appModalStyles.detailItem}>
                      • {item}
                    </Text>
                  ))}
                </View>
              ) : null}

              <View
                style={
                  wrapButtons
                    ? appModalStyles.actionsWrap
                    : appModalStyles.actionsRow
                }
              >
                {actions.map(action => {
                  const variant = action.variant ?? 'primary';

                  return (
                    <Pressable
                      key={action.label}
                      onPress={action.onPress}
                      style={[
                        appModalStyles.actionButton,
                        wrapButtons
                          ? appModalStyles.actionButtonWrapped
                          : appModalStyles.actionButtonInline,
                        variant === 'primary'
                          ? appModalStyles.actionPrimary
                          : null,
                        variant === 'secondary'
                          ? appModalStyles.actionSecondary
                          : null,
                        variant === 'danger'
                          ? appModalStyles.actionDanger
                          : null,
                        variant === 'ghost' ? appModalStyles.actionGhost : null,
                      ]}
                    >
                      <Text
                        style={[
                          appModalStyles.actionText,
                          variant === 'primary'
                            ? appModalStyles.actionTextPrimary
                            : null,
                          variant === 'secondary' || variant === 'ghost'
                            ? appModalStyles.actionTextSecondary
                            : null,
                          variant === 'danger'
                            ? appModalStyles.actionTextDanger
                            : null,
                        ]}
                      >
                        {action.label}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}
