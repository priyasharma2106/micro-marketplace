import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { productService, favoriteService } from '../services/api';
import { useAuth } from '../context/AuthContext';
import ProductCard from '../components/ProductCard';
import SearchBar from '../components/SearchBar';
import Pagination from '../components/Pagination';
import './Home.css';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState(null);
  const { isAuthenticated } = useAuth();

  const limit = 12;

  useEffect(() => {
    fetchProducts();
    if (isAuthenticated) {
      fetchFavorites();
    }
  }, [currentPage, searchTerm, isAuthenticated]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await productService.getAll(currentPage, limit, searchTerm);
      setProducts(data.products);
      setPagination(data.pagination);
      setError(null);
    } catch (err) {
      setError('Failed to load products');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchFavorites = async () => {
    try {
      const data = await favoriteService.getAll();
      setFavorites(data.favorites.map((fav) => fav._id));
    } catch (err) {
      console.error('Failed to load favorites', err);
    }
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFavoriteToggle = async (productId) => {
    if (!isAuthenticated) {
      toast.error('Please login to add favorites 🔒');
      return;
    }

    try {
      if (favorites.includes(productId)) {
        await favoriteService.remove(productId);
        setFavorites(favorites.filter((id) => id !== productId));
        toast.success('Removed from favorites 💔');
      } else {
        await favoriteService.add(productId);
        setFavorites([...favorites, productId]);
        toast.success('Added to favorites ❤️');
      }
    } catch (err) {
      console.error('Failed to toggle favorite', err);
      toast.error('Failed to update favorites. Please try again.');
    }
  };

  if (loading && products.length === 0) {
    return <div className="loading-container"><div className="spinner"></div><p>Loading products...</p></div>;
  }

  if (error) {
    return <div className="error-container"><p>{error}</p></div>;
  }

  return (
    <div className="home-page">
      <div className="separator-line"></div>
      
      <div className="hero-section">
        <h1 className="hero-title">Welcome to Micro Marketplace</h1>
        <p className="hero-subtitle">Discover amazing products at great prices</p>
      </div>

      <div className="container">
        <SearchBar onSearch={handleSearch} />

        {searchTerm && (
          <p className="search-info">
            Showing results for <strong>"{searchTerm}"</strong>
          </p>
        )}

        {products.length === 0 ? (
          <div className="no-products">
            <p>No products found</p>
          </div>
        ) : (
          <>
            <div className="products-grid">
              {products.map((product) => (
                <ProductCard
                  key={product._id}
                  product={product}
                  onFavoriteToggle={handleFavoriteToggle}
                  isFavorite={favorites.includes(product._id)}
                />
              ))}
            </div>

            {pagination && pagination.totalPages > 1 && (
              <Pagination
                currentPage={pagination.currentPage}
                totalPages={pagination.totalPages}
                onPageChange={handlePageChange}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
