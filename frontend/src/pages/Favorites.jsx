import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { favoriteService } from '../services/api';
import ProductCard from '../components/ProductCard';
import './Favorites.css';

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchFavorites();
  }, []);

  const fetchFavorites = async () => {
    try {
      setLoading(true);
      const data = await favoriteService.getAll();
      setFavorites(data.favorites);
      setError(null);
    } catch (err) {
      setError('Failed to load favorites');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveFavorite = async (productId) => {
    try {
      await favoriteService.remove(productId);
      setFavorites(favorites.filter((fav) => fav._id !== productId));
      toast.success('Removed from favorites 💔');
    } catch (err) {
      console.error('Failed to remove favorite', err);
      toast.error('Failed to remove from favorites. Please try again.');
    }
  };

  if (loading) {
    return <div className="loading-container"><div className="spinner"></div><p>Loading favorites...</p></div>;
  }

  if (error) {
    return <div className="error-container"><p>{error}</p></div>;
  }

  return (
    <div className="favorites-page">
      <div className="container">
        <h1 className="page-title">❤️ My Favorites</h1>
        <p className="page-subtitle">Your saved products</p>

        {favorites.length === 0 ? (
          <div className="empty-favorites">
            <p className="empty-message">You haven't added any favorites yet</p>
            <a href="/" className="browse-btn">
              Browse Products
            </a>
          </div>
        ) : (
          <div className="products-grid">
            {favorites.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                onFavoriteToggle={handleRemoveFavorite}
                isFavorite={true}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorites;
