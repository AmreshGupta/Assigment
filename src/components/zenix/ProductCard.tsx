import React from 'react';

interface ProductCardProps {
  name: string;
  price: string;
  originalPrice?: string;
  rating: number;
  reviews: number;
  badge?: string;
  color?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  name,
  price,
  originalPrice,
  rating,
  reviews,
  badge,
  color = '#DBEAFE',
}) => {
  return (
    <div className="zenix-card overflow-hidden flex-shrink-0 w-44 hover:shadow-lg transition-all duration-200 hover:-translate-y-1">
      {/* Product image placeholder */}
      <div className="relative h-32 flex items-center justify-center" style={{ backgroundColor: color }}>
        {badge && (
          <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
            {badge}
          </div>
        )}
        {/* Generic auto part SVG */}
        <svg viewBox="0 0 80 80" className="w-20 h-20" fill="none">
          <circle cx="40" cy="40" r="30" fill="white" opacity="0.6"/>
          <circle cx="40" cy="40" r="20" fill="white"/>
          <circle cx="40" cy="40" r="12" fill="#1A3A7C" opacity="0.4"/>
          {[0,45,90,135,180,225,270,315].map((a, i) => (
            <rect key={i} x="38" y="12" width="4" height="10" rx="2" fill="#1A3A7C" opacity="0.5"
              transform={`rotate(${a} 40 40)`}/>
          ))}
          <circle cx="40" cy="40" r="5" fill="#1A3A7C"/>
        </svg>

        {/* Wishlist btn */}
        <button className="absolute top-2 right-2 w-7 h-7 bg-white rounded-full shadow flex items-center justify-center hover:bg-red-50 transition-colors">
          <svg className="w-4 h-4 text-gray-400 hover:text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
          </svg>
        </button>
      </div>

      {/* Info */}
      <div className="p-3">
        <p className="text-sm font-semibold text-gray-800 leading-tight mb-1 truncate">{name}</p>

        {/* Stars */}
        <div className="flex items-center gap-1 mb-2">
          {[...Array(5)].map((_, i) => (
            <svg key={i} className={`w-3 h-3 ${i < rating ? 'text-yellow-400' : 'text-gray-200'}`}
              fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
            </svg>
          ))}
          <span className="text-xs text-gray-400">({reviews})</span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold text-[#1A3A7C]">{price}</span>
          {originalPrice && (
            <span className="text-xs text-gray-400 line-through">{originalPrice}</span>
          )}
        </div>

        {/* Add to cart */}
        <button className="mt-2 w-full py-1.5 bg-[#1A3A7C] text-white text-xs font-semibold rounded-lg
          hover:bg-blue-800 transition-colors active:scale-95">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
