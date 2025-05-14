export type RootStackParamList = {
  Login: undefined;
  Main: undefined;
  Home: undefined;
  Appointments: undefined;
  Profile: undefined;
  AppointmentBooking: undefined;
  AppointmentDetails: {
    appointmentId: number;
  };
  Settings: undefined;
  Payment: undefined;
  PaymentDetails: {
    paymentId: number;
  };
  Notifications: undefined;
  ReviewDetails: {
    reviewId: number;
  };
};
