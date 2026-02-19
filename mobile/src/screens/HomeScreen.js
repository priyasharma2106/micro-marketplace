import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { productService, favoriteService } from '../services/api';
import { useAuth } from '../context/AuthContext';
import ProductCard from '../components/ProductCard';

const HomeScreen = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const { isAuthenticated, logout, user } = useAuth();

  useEffect(() => {
    fetchProducts();
    if (isAuthenticated) {
      fetchFavorites();
    }
  }, [searchTerm, isAuthenticated]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await productService.getAll(1, 50, searchTerm);
      setProducts(data.products);
    } catch (error) {
      Alert.alert('Error', 'Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  const fetchFavorites = async () => {
    try {
      const data = await favoriteService.getAll();
      setFavorites(data.favorites.map((fav) => fav._id));
    } catch (error) {
      console.error('Failed to load favorites', error);
    }
  };

  const handleFavoriteToggle = async (productId) => {
    if (!isAuthenticated) {
      Alert.alert('Login Required', 'Please login to add favorites');
      return;
    }

    try {
      if (favorites.includes(productId)) {
        await favoriteService.remove(productId);
        setFavorites(favorites.filter((id) => id !== productId));
        Alert.alert('Success', 'Removed from favorites');
      } else {
        await favoriteService.add(productId);
        setFavorites([...favorites, productId]);
        Alert.alert('Success', 'Added to favorites');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to update favorites');
    }
  };

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Logout',
        onPress: async () => {
          await logout();
          Alert.alert('Success', 'Logged out successfully');
        },
      },
    ]);
  };

  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.headerTop}>
        <Text style={styles.title}>Micro Marketplace</Text>
        <View style={styles.headerButtons}>
          {isAuthenticated ? (
            <>
              <TouchableOpacity
                style={styles.favoritesBtn}
                onPress={() => navigation.navigate('Favorites')}
              >
                <Text style={styles.favoritesBtnText}>❤️ Favorites</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
                <Text style={styles.logoutBtnText}>Logout</Text>
              </TouchableOpacity>
            </>
          ) : (
            <TouchableOpacity
              style={styles.loginBtn}
              onPress={() => navigation.navigate('Login')}
            >
              <Text style={styles.loginBtnText}>Login</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {isAuthenticated && (
        <Text style={styles.welcomeText}>Welcome, {user?.name}! 👋</Text>
      )}

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="🔍 Search products..."
          value={searchTerm}
          onChangeText={setSearchTerm}
        />
      </View>
    </View>
  );

  if (loading && products.length === 0) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#667eea" />
        <Text style={styles.loadingText}>Loading products...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <ProductCard
            product={item}
            onPress={() => navigation.navigate('ProductDetail', { productId: item._id })}
            onFavoriteToggle={handleFavoriteToggle}
            isFavorite={favorites.includes(item._id)}
          />
        )}
        ListHeaderComponent={renderHeader}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No products found</Text>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9fafb',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#6b7280',
  },
  header: {
    backgroundColor: '#667eea',
    padding: 20,
    paddingTop: 50,
    marginBottom: 16,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  headerButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  favoritesBtn: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    marginRight: 8,
  },
  favoritesBtnText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 12,
  },
  loginBtn: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  loginBtnText: {
    color: '#667eea',
    fontWeight: 'bold',
    fontSize: 14,
  },
  logoutBtn: {
    backgroundColor: '#ef4444',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  logoutBtnText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 12,
  },
  welcomeText: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 12,
  },
  searchContainer: {
    marginTop: 8,
  },
  searchInput: {
    backgroundColor: '#fff',
    borderRadius: 25,
    padding: 12,
    fontSize: 16,
  },
  listContent: {
    padding: 16,
  },
  emptyContainer: {
    padding: 40,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#6b7280',
  },
});

export default HomeScreen;
