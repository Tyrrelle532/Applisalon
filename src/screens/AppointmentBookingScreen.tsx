import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  TextInput,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import type {RootStackParamList} from '../navigation/MainNavigator';
import {appointmentService} from '../services/appointmentService';
import Toast from '../components/Toast';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const services = [
  {id: '1', name: 'Haircut & Styling', duration: 60, price: 50},
  {id: '2', name: 'Hair Coloring', duration: 120, price: 100},
  {id: '3', name: 'Hair Treatment', duration: 90, price: 75},
  {id: '4', name: 'Hair Spa', duration: 60, price: 60},
  {id: '5', name: 'Facial', duration: 45, price: 40},
  {id: '6', name: 'Makeup', duration: 60, price: 55},
];

const specialists = [
  {
    id: '1',
    name: 'John Doe',
    rating: 4.8,
    image: require('../assets/images/specialist1.jpg'),
  },
  {
    id: '2',
    name: 'Lucy Smith',
    rating: 4.7,
    image: require('../assets/images/specialist2.jpg'),
  },
  {
    id: '3',
    name: 'Laila Johnson',
    rating: 4.9,
    image: require('../assets/images/specialist3.jpg'),
  },
];

const timeSlots = [
  '9:00 AM',
  '10:00 AM',
  '11:00 AM',
  '12:00 PM',
  '1:00 PM',
  '2:00 PM',
  '3:00 PM',
  '4:00 PM',
  '5:00 PM',
];

const AppointmentBookingScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const [selectedService, setSelectedService] = useState('');
  const [selectedSpecialist, setSelectedSpecialist] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [notes, setNotes] = useState('');
  const [toast, setToast] = useState({
    visible: false,
    message: '',
    type: 'error' as const,
  });

  const handleBookAppointment = async () => {
    if (
      !selectedService ||
      !selectedSpecialist ||
      !selectedDate ||
      !selectedTime
    ) {
      setToast({
        visible: true,
        message: 'Please select all required fields',
        type: 'error',
      });
      return;
    }

    try {
      const bookingData = {
        serviceId: selectedService,
        specialistId: selectedSpecialist,
        date: selectedDate,
        time: selectedTime,
        notes,
      };

      await appointmentService.createAppointment(bookingData);
      navigation.navigate('Payment');
    } catch (error) {
      setToast({
        visible: true,
        message: 'Failed to book appointment. Please try again.',
        type: 'error',
      });
      console.error('Error booking appointment:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Toast
        visible={toast.visible}
        message={toast.message}
        type={toast.type}
        onHide={() => setToast(prev => ({...prev, visible: false}))}
      />
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Book Appointment</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content}>
        <Text style={styles.sectionTitle}>Select Service</Text>
        <View style={styles.servicesContainer}>
          {services.map(service => (
            <TouchableOpacity
              key={service.id}
              style={[
                styles.serviceCard,
                selectedService === service.id && styles.selectedService,
              ]}
              onPress={() => setSelectedService(service.id)}>
              <Text
                style={[
                  styles.serviceName,
                  selectedService === service.id && styles.selectedServiceText,
                ]}>
                {service.name}
              </Text>
              <Text
                style={[
                  styles.servicePrice,
                  selectedService === service.id && styles.selectedServiceText,
                ]}>
                ${service.price}
              </Text>
              <Text
                style={[
                  styles.serviceDuration,
                  selectedService === service.id && styles.selectedServiceText,
                ]}>
                {service.duration} min
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.sectionTitle}>Select Specialist</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.specialistsContainer}>
          {specialists.map(specialist => (
            <TouchableOpacity
              key={specialist.id}
              style={[
                styles.specialistCard,
                selectedSpecialist === specialist.id &&
                  styles.selectedSpecialist,
              ]}
              onPress={() => setSelectedSpecialist(specialist.id)}>
              <Image source={specialist.image} style={styles.specialistImage} />
              <Text style={styles.specialistName}>{specialist.name}</Text>
              <View style={styles.ratingContainer}>
                <Icon name="star" size={14} color="#FFD700" />
                <Text style={styles.ratingText}>{specialist.rating}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <Text style={styles.sectionTitle}>Select Date & Time</Text>
        <View style={styles.dateTimeContainer}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.datesContainer}>
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(
              (day, index) => (
                <TouchableOpacity
                  key={day}
                  style={[
                    styles.dateCard,
                    selectedDate === day && styles.selectedDate,
                  ]}
                  onPress={() => setSelectedDate(day)}>
                  <Text
                    style={[
                      styles.dateText,
                      selectedDate === day && styles.selectedDateText,
                    ]}>
                    {day}
                  </Text>
                  <Text
                    style={[
                      styles.dateNumber,
                      selectedDate === day && styles.selectedDateText,
                    ]}>
                    {index + 15}
                  </Text>
                </TouchableOpacity>
              ),
            )}
          </ScrollView>

          <View style={styles.timeSlotsContainer}>
            {timeSlots.map(time => (
              <TouchableOpacity
                key={time}
                style={[
                  styles.timeSlot,
                  selectedTime === time && styles.selectedTimeSlot,
                ]}
                onPress={() => setSelectedTime(time)}>
                <Text
                  style={[
                    styles.timeSlotText,
                    selectedTime === time && styles.selectedTimeSlotText,
                  ]}>
                  {time}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <Text style={styles.sectionTitle}>Additional Notes</Text>
        <TextInput
          style={styles.notesInput}
          placeholder="Add any special requests or notes..."
          value={notes}
          onChangeText={setNotes}
          multiline
          numberOfLines={4}
        />

        <TouchableOpacity
          style={styles.bookButton}
          onPress={handleBookAppointment}>
          <Text style={styles.bookButtonText}>Proceed to Payment</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF0F0',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  servicesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  serviceCard: {
    width: '48%',
    backgroundColor: '#FFF',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    alignItems: 'center',
  },
  selectedService: {
    backgroundColor: '#FF6B6B',
  },
  serviceName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 5,
  },
  servicePrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF6B6B',
    marginBottom: 5,
  },
  serviceDuration: {
    fontSize: 14,
    color: '#666',
  },
  selectedServiceText: {
    color: '#FFF',
  },
  specialistsContainer: {
    marginBottom: 20,
  },
  specialistCard: {
    width: 120,
    marginRight: 15,
    backgroundColor: '#FFF',
    borderRadius: 15,
    overflow: 'hidden',
  },
  selectedSpecialist: {
    borderWidth: 2,
    borderColor: '#FF6B6B',
  },
  specialistImage: {
    width: '100%',
    height: 120,
  },
  specialistName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    padding: 10,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  ratingText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 5,
  },
  dateTimeContainer: {
    marginBottom: 20,
  },
  datesContainer: {
    marginBottom: 15,
  },
  dateCard: {
    width: 60,
    height: 80,
    backgroundColor: '#FFF',
    borderRadius: 15,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedDate: {
    backgroundColor: '#FF6B6B',
  },
  dateText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  dateNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  selectedDateText: {
    color: '#FFF',
  },
  timeSlotsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  timeSlot: {
    width: '30%',
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    alignItems: 'center',
  },
  selectedTimeSlot: {
    backgroundColor: '#FF6B6B',
  },
  timeSlotText: {
    fontSize: 14,
    color: '#333',
  },
  selectedTimeSlotText: {
    color: '#FFF',
  },
  notesInput: {
    backgroundColor: '#FFF',
    borderRadius: 15,
    padding: 15,
    marginBottom: 20,
    height: 100,
    textAlignVertical: 'top',
  },
  bookButton: {
    backgroundColor: '#FF6B6B',
    borderRadius: 25,
    padding: 15,
    alignItems: 'center',
    marginBottom: 20,
  },
  bookButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AppointmentBookingScreen;
