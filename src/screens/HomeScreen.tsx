import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  Dimensions,
  Animated,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';
import {authService} from '../services/authService';

const {width} = Dimensions.get('window');

const categories = [
  {id: 1, name: 'Hair Style', icon: require('../assets/images/hair-style.png')},
  {id: 2, name: 'Hair Spa', icon: require('../assets/images/hair-spa.png')},
  {id: 3, name: 'Shampoo', icon: require('../assets/images/shampoo.png')},
  {id: 4, name: 'Hair Dryer', icon: require('../assets/images/hair-dryer.png')},
  {id: 5, name: 'Makeup', icon: require('../assets/images/makeup.png')},
  {id: 6, name: 'Nails', icon: require('../assets/images/nails.png')},
];

const specialists = [
  {
    id: 1,
    name: 'Doe John',
    avatar: require('../assets/images/specialist1.jpg'),
    rating: 4.8,
    reviews: 120,
  },
  {
    id: 2,
    name: 'Lucy',
    avatar: require('../assets/images/specialist2.jpg'),
    rating: 4.7,
    reviews: 102,
  },
  {
    id: 3,
    name: 'Sarah',
    avatar: require('../assets/images/specialist3.jpg'),
    rating: 4.9,
    reviews: 98,
  },
];

const promoImg = require('../assets/images/promo.jpg');
const profileImg = require('../assets/images/profile.jpg');

const HomeScreen = () => {
  const [userName, setUserName] = useState('');
  const scrollY = new Animated.Value(0);

  useEffect(() => {
    (async () => {
      const user = await authService.getCurrentUser();
      setUserName(user ? `${user.prenom} ${user.nom}` : 'Guest');
    })();
  }, []);

  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [1, 0.9],
    extrapolate: 'clamp',
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <Animated.View style={[styles.header, {opacity: headerOpacity}]}>
        <TouchableOpacity style={styles.menuButton}>
          <Icon name="menu" size={26} color="#222" />
        </TouchableOpacity>
        <View style={styles.greetingContainer}>
          <Text style={styles.greetingText}>Welcome Back</Text>
          <Text style={styles.userNameText}>{userName}</Text>
        </View>
        <TouchableOpacity style={styles.profileButton}>
          <Image source={profileImg} style={styles.profileImage} />
        </TouchableOpacity>
      </Animated.View>

      <Animated.ScrollView
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollY}}}],
          {useNativeDriver: true},
        )}
        scrollEventThrottle={16}
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}>
        {/* Promo Card */}
        <LinearGradient
          colors={['#FF6B6B', '#FF8E8E']}
          style={styles.promoCard}>
          <View style={styles.promoContent}>
            <Text style={styles.promoTitle}>Look Awesome & Save Some</Text>
            <Text style={styles.promoSubtitle}>Get your 50% off</Text>
            <TouchableOpacity style={styles.promoButton}>
              <Text style={styles.promoButtonText}>Get your offer</Text>
            </TouchableOpacity>
          </View>
          <Image source={promoImg} style={styles.promoImage} />
        </LinearGradient>

        {/* Categories */}
        <Text style={styles.sectionTitle}>Categories</Text>
        <View style={styles.categoriesGrid}>
          {categories.map(cat => (
            <TouchableOpacity key={cat.id} style={styles.categoryItem}>
              <LinearGradient
                colors={['#FFF', '#F8F8F8']}
                style={styles.categoryIconContainer}>
                <Image source={cat.icon} style={styles.categoryIcon} />
              </LinearGradient>
              <Text style={styles.categoryText}>{cat.name}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Hair Specialist */}
        <Text style={styles.sectionTitle}>Top Specialists</Text>
        <FlatList
          data={specialists}
          keyExtractor={item => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.specialistList}
          renderItem={({item}) => (
            <TouchableOpacity style={styles.specialistCard}>
              <LinearGradient
                colors={['#FFF', '#F8F8F8']}
                style={styles.specialistCardGradient}>
                <Image source={item.avatar} style={styles.specialistAvatar} />
                <Text style={styles.specialistName}>{item.name}</Text>
                <View style={styles.specialistRatingRow}>
                  <Icon name="star" size={16} color="#FFD700" />
                  <Text style={styles.specialistRating}>{item.rating}</Text>
                  <Text style={styles.specialistReviews}>({item.reviews})</Text>
                </View>
              </LinearGradient>
            </TouchableOpacity>
          )}
        />
      </Animated.ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  container: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  menuButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#F8F8F8',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  greetingContainer: {
    flex: 1,
  },
  greetingText: {
    fontSize: 16,
    color: '#888',
    fontWeight: '500',
  },
  userNameText: {
    fontSize: 22,
    color: '#222',
    fontWeight: 'bold',
    marginTop: 2,
  },
  profileButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F8F8F8',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  profileImage: {
    width: 44,
    height: 44,
    borderRadius: 22,
  },
  promoCard: {
    flexDirection: 'row',
    borderRadius: 24,
    overflow: 'hidden',
    marginBottom: 28,
    shadowColor: '#FF6B6B',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 8,
  },
  promoContent: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
  promoTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 8,
  },
  promoSubtitle: {
    fontSize: 18,
    color: '#FFF',
    opacity: 0.9,
    marginBottom: 20,
  },
  promoButton: {
    backgroundColor: '#FFF',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  promoButtonText: {
    color: '#FF6B6B',
    fontWeight: 'bold',
    fontSize: 16,
  },
  promoImage: {
    width: width * 0.4,
    height: '100%',
    resizeMode: 'cover',
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 20,
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 28,
  },
  categoryItem: {
    width: (width - 60) / 3,
    marginBottom: 20,
    alignItems: 'center',
  },
  categoryIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  categoryIcon: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  categoryText: {
    fontSize: 14,
    color: '#444',
    fontWeight: '500',
    textAlign: 'center',
  },
  specialistList: {
    paddingRight: 20,
  },
  specialistCard: {
    width: 160,
    marginRight: 16,
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  specialistCardGradient: {
    padding: 16,
    alignItems: 'center',
  },
  specialistAvatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 12,
  },
  specialistName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 4,
  },
  specialistRatingRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  specialistRating: {
    fontSize: 14,
    color: '#444',
    marginLeft: 4,
    fontWeight: '500',
  },
  specialistReviews: {
    fontSize: 12,
    color: '#888',
    marginLeft: 4,
  },
});

export default HomeScreen;
