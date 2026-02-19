import { Link } from 'react-router-dom';
import './ProductCard.css';

const ProductCard = ({ product, onFavoriteToggle, isFavorite }) => {
  const handleImageError = (e) => {
    e.target.src = 'https://via.placeholder.com/400x300/667eea/ffffff?text=Product+Image';
  };

  return (
    <div className="product-card">
      <Link to={`/products/${product._id}`} className="product-link">
        <div className="product-image-container">
          <img
            src={product.image}
            alt={product.title}
            className="product-image"
            onError={handleImageError}
          />
          <div className="product-overlay">
            <span className="view-details">View Details</span>
          </div>
        </div>
      </Link>

      <div className="product-info">
        <h3 className="product-title">{product.title}</h3>
        <p className="product-description">
          {product.description.substring(0, 80)}...
        </p>
        <div className="product-footer">
          <span className="product-price">₹{product.price.toFixed(2)}</span>
          {onFavoriteToggle && (
            <button
              onClick={() => onFavoriteToggle(product._id)}
              className={`favorite-btn ${isFavorite ? 'active' : ''}`}
              title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            >
              {isFavorite ? '❤️' : '🤍'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
