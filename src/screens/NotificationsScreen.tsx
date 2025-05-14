import React from 'react';
import {View, StyleSheet, SafeAreaView} from 'react-native';
import {NotificationList} from '../components/NotificationList';
import {Notification} from '../services/notificationService';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../navigation/types';

type NotificationsScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Notifications'
>;

export const NotificationsScreen: React.FC = () => {
  const navigation = useNavigation<NotificationsScreenNavigationProp>();

  const handleNotificationPress = (notification: Notification) => {
    switch (notification.type) {
      case 'appointment':
        if (notification.data?.appointmentId) {
          navigation.navigate('AppointmentDetails', {
            appointmentId: notification.data.appointmentId,
          });
        }
        break;
      case 'payment':
        if (notification.data?.paymentId) {
          navigation.navigate('PaymentDetails', {
            paymentId: notification.data.paymentId,
          });
        }
        break;
      case 'review':
        if (notification.data?.reviewId) {
          navigation.navigate('ReviewDetails', {
            reviewId: notification.data.reviewId,
          });
        }
        break;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <NotificationList onNotificationPress={handleNotificationPress} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
