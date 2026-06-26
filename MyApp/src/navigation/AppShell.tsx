import React, { useMemo, useState } from 'react';
import { View } from 'react-native';

import { NavigationBar } from '../components/NavigationBar/NavigationBar';
import { AccountScreen } from '../screens/AccountScreen/AccountScreen';
import { AnimationScreen } from '../screens/AnimationScreen/AnimationScreen';
import { AuthScreen } from '../screens/AuthScreen/AuthScreen';
import { FinanceScreen } from '../screens/FinanceScreen/FinanceScreen';
import { GestureScreen } from '../screens/GestureScreen/GestureScreen';
import { HomeScreen } from '../screens/HomeScreen/HomeScreen';
import { EditableProfile, LoginFormValues, SessionUser, TabKey } from '../types/app';
import '../utils/date';
import { appShellStyles } from './AppShell.styles';

const DEFAULT_USER: SessionUser = {
  fullName: 'Владислав Меленчук',
  role: 'Mobile Product Designer',
  phone: '+380501234567',
  email: 'v.melenchuk@example.com',
  password: 'Secure123',
  city: 'Київ',
  department: 'Nova Mobile Team',
  bio: 'Стежить за якістю інтерфейсів, любить чисту навігацію та виразні анімації.',
  registeredAt: new Date().toSqlDateTime(),
};

const NAV_ITEMS = [
  { key: 'home', label: 'Home', icon: '⌂' },
  { key: 'gestures', label: 'Swipe', icon: '↗' },
  { key: 'animation', label: 'Motion', icon: '◎' },
  { key: 'finance', label: 'Rates', icon: '₴' },
  { key: 'account', label: 'Profile', icon: '☺' },
] as const satisfies { icon: string; key: TabKey; label: string }[];

export function AppShell() {
  const [activeTab, setActiveTab] = useState<TabKey>('home');
  const [users, setUsers] = useState<SessionUser[]>([DEFAULT_USER]);
  const [currentUser, setCurrentUser] = useState<SessionUser | null>(null);

  const handleLogin = ({ email, password }: LoginFormValues) => {
    const matchedUser = users.find(
      user => user.email === email.trim() && user.password === password,
    );

    if (!matchedUser) {
      return false;
    }

    setCurrentUser(matchedUser);
    return true;
  };

  const handleRegister = (user: SessionUser) => {
    setUsers(current => [...current, user]);
    setCurrentUser(user);
  };

  const handleSaveProfile = (profile: EditableProfile) => {
    setCurrentUser(current => {
      if (!current) {
        return current;
      }

      return { ...current, ...profile };
    });

    setUsers(current =>
      current.map(user =>
        currentUser && user.email === currentUser.email ? { ...user, ...profile } : user,
      ),
    );
  };

  const page = useMemo(() => {
    if (!currentUser) {
      return <AuthScreen onLogin={handleLogin} onRegister={handleRegister} />;
    }

    switch (activeTab) {
      case 'gestures':
        return <GestureScreen />;
      case 'animation':
        return <AnimationScreen />;
      case 'finance':
        return <FinanceScreen />;
      case 'account':
        return (
          <AccountScreen
            onLogout={() => setCurrentUser(null)}
            onSaveProfile={handleSaveProfile}
            user={currentUser}
          />
        );
      case 'home':
      default:
        return <HomeScreen onSelectTab={setActiveTab} />;
    }
  }, [activeTab, currentUser, users]);

  return (
    <View style={appShellStyles.screen}>
      <View style={appShellStyles.content}>
        <View style={appShellStyles.page}>{page}</View>
        {currentUser ? (
          <NavigationBar
            activeTab={activeTab}
            items={NAV_ITEMS.map(item => ({ ...item }))}
            onChangeTab={setActiveTab}
          />
        ) : null}
      </View>
    </View>
  );
}
