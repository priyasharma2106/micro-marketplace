import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { productService, favoriteService } from '../services/api';
import { useAuth } from '../context/AuthContext';
import './ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [product, setProduct] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProduct();
    if (isAuthenticated) {
      checkIfFavorite();
    }
  }, [id, isAuthenticated]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const data = await productService.getById(id);
      setProduct(data);
      setError(null);
    } catch (err) {
      setError('Product not found');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const checkIfFavorite = async () => {
    try {
      const data = await favoriteService.getAll();
      const favoriteIds = data.favorites.map((fav) => fav._id);
      setIsFavorite(favoriteIds.includes(id));
    } catch (err) {
      console.error('Failed to check favorites', err);
    }
  };

  const handleFavoriteToggle = async () => {
    if (!isAuthenticated) {
      toast.error('Please login to add favorites 🔒');
      navigate('/login');
      return;
    }

    try {
      if (isFavorite) {
        await favoriteService.remove(id);
        setIsFavorite(false);
        toast.success('Removed from favorites 💔');
      } else {
        await favoriteService.add(id);
        setIsFavorite(true);
        toast.success('Added to favorites ❤️');
      }
    } catch (err) {
      console.error('Failed to toggle favorite', err);
      toast.error('Failed to update favorites. Please try again.');
    }
  };

  if (loading) {
    return <div className="loading-container"><div className="spinner"></div><p>Loading product...</p></div>;
  }

  if (error || !product) {
    return (
      <div className="error-container">
        <p>{error}</p>
        <button onClick={() => navigate('/')} className="back-btn">
          Back to Products
        </button>
      </div>
    );
  }

  return (
    <div className="product-detail-page">
      <div className="container">
        <button onClick={() => navigate(-1)} className="back-link">
          ← Back
        </button>

        <div className="product-detail-card">
          <div className="product-detail-image">
            <img src={product.image} alt={product.title} />
          </div>

          <div className="product-detail-info">
            <h1 className="product-detail-title">{product.title}</h1>
            
            <div className="product-detail-price">
              ₹{product.price.toFixed(2)}
            </div>

            <p className="product-detail-description">{product.description}</p>

            <div className="product-detail-actions">
              <button
                onClick={handleFavoriteToggle}
                className={`favorite-detail-btn ${isFavorite ? 'active' : ''}`}
              >
                {isFavorite ? '❤️ Remove from Favorites' : '🤍 Add to Favorites'}
              </button>
            </div>

            <div className="product-detail-meta">
              <p>
                <strong>Product ID:</strong> {product._id}
              </p>
              <p>
                <strong>Added:</strong>{' '}
                {new Date(product.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
