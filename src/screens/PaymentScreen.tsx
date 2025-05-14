import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import type {RootStackParamList} from '../navigation/MainNavigator';
import Toast from '../components/Toast';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface PaymentMethod {
  id: string;
  type: 'card';
  last4: string;
  expiry: string;
  isDefault: boolean;
}

const PaymentScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
    {
      id: '1',
      type: 'card',
      last4: '4242',
      expiry: '12/24',
      isDefault: true,
    },
    {
      id: '2',
      type: 'card',
      last4: '5678',
      expiry: '09/25',
      isDefault: false,
    },
  ]);

  const [showAddCard, setShowAddCard] = useState(false);
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [toast, setToast] = useState({
    visible: false,
    message: '',
    type: 'error' as const,
  });

  const handleAddCard = () => {
    if (!cardNumber || !expiryDate || !cvv) {
      setToast({
        visible: true,
        message: 'Please fill in all card details',
        type: 'error',
      });
      return;
    }

    const newCard: PaymentMethod = {
      id: Math.random().toString(36).substr(2, 9),
      type: 'card',
      last4: cardNumber.slice(-4),
      expiry: expiryDate,
      isDefault: paymentMethods.length === 0,
    };

    setPaymentMethods([...paymentMethods, newCard]);
    setShowAddCard(false);
    setCardNumber('');
    setExpiryDate('');
    setCvv('');
  };

  const handleSetDefault = (id: string) => {
    setPaymentMethods(
      paymentMethods.map(method => ({
        ...method,
        isDefault: method.id === id,
      })),
    );
  };

  const handleDeleteCard = (id: string) => {
    setPaymentMethods(paymentMethods.filter(method => method.id !== id));
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
        <Text style={styles.headerTitle}>Payment Methods</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content}>
        {paymentMethods.map(method => (
          <View key={method.id} style={styles.cardContainer}>
            <View style={styles.cardInfo}>
              <Icon name="credit-card" size={24} color="#333" />
              <View style={styles.cardDetails}>
                <Text style={styles.cardNumber}>•••• {method.last4}</Text>
                <Text style={styles.cardExpiry}>Expires {method.expiry}</Text>
              </View>
            </View>
            <View style={styles.cardActions}>
              {!method.isDefault && (
                <TouchableOpacity
                  style={styles.defaultButton}
                  onPress={() => handleSetDefault(method.id)}>
                  <Text style={styles.defaultButtonText}>Set as Default</Text>
                </TouchableOpacity>
              )}
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => handleDeleteCard(method.id)}>
                <Icon name="trash-2" size={20} color="#FF6B6B" />
              </TouchableOpacity>
            </View>
          </View>
        ))}

        {!showAddCard ? (
          <TouchableOpacity
            style={styles.addCardButton}
            onPress={() => setShowAddCard(true)}>
            <Icon name="plus" size={24} color="#FFF" />
            <Text style={styles.addCardButtonText}>Add New Card</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.addCardForm}>
            <Text style={styles.formTitle}>Add New Card</Text>
            <TextInput
              style={styles.input}
              placeholder="Card Number"
              value={cardNumber}
              onChangeText={setCardNumber}
              keyboardType="numeric"
              maxLength={16}
            />
            <View style={styles.row}>
              <TextInput
                style={[styles.input, styles.halfInput]}
                placeholder="MM/YY"
                value={expiryDate}
                onChangeText={setExpiryDate}
                maxLength={5}
              />
              <TextInput
                style={[styles.input, styles.halfInput]}
                placeholder="CVV"
                value={cvv}
                onChangeText={setCvv}
                keyboardType="numeric"
                maxLength={3}
                secureTextEntry
              />
            </View>
            <View style={styles.formActions}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setShowAddCard(false)}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.saveButton}
                onPress={handleAddCard}>
                <Text style={styles.saveButtonText}>Save Card</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
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
  cardContainer: {
    backgroundColor: '#FFF',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
  },
  cardInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  cardDetails: {
    marginLeft: 15,
  },
  cardNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  cardExpiry: {
    fontSize: 14,
    color: '#666',
  },
  cardActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  defaultButton: {
    marginRight: 15,
  },
  defaultButtonText: {
    color: '#FF6B6B',
    fontSize: 14,
  },
  deleteButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addCardButton: {
    backgroundColor: '#FF6B6B',
    borderRadius: 25,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  addCardButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  addCardForm: {
    backgroundColor: '#FFF',
    borderRadius: 15,
    padding: 20,
    marginTop: 10,
  },
  formTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    fontSize: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfInput: {
    width: '48%',
  },
  formActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
  },
  cancelButton: {
    marginRight: 15,
    padding: 10,
  },
  cancelButtonText: {
    color: '#666',
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: '#FF6B6B',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  saveButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default PaymentScreen;
