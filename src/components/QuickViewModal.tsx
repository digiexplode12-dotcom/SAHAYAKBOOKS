import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { BookFormat } from '../types';
import { X, Star, ShoppingBag, BookOpen, ShieldCheck, Check, ArrowRight, Truck } from 'lucide-react';

export const QuickViewModal: React.FC = () => {
  const {
    quickViewBook,
    closeQuickView,
    addToCart,
    openSampleReader,
    navigate,
    toggleWishlist,
    isInWishlist,
  } = useStore();

  const [selectedFormat, setSelectedFormat] = useState<BookFormat>('Hardcover');
  const [quantity, setQuantity] = useState(1);
  const [selectedImgIndex, setSelectedImgIndex] = useState(0);

  if (!quickViewBook) return null;

  const book = quickViewBook;
  const isWishlisted = isInWishlist(book.id);
  const images = book.galleryImages && book.galleryImages.length > 0 ? book.galleryImages : [book.coverImage];

  const handleAddToCart = () => {
    addToCart(book, selectedFormat, quantity);
  };

  const handleBuyNow = () => {
    addToCart(book, selectedFormat, quantity);
    closeQuickView();
    navigate('/checkout');
  };

  const handleReadSample = () => {
    closeQuickView();
    openSampleReader(book);
  };

  return (
    <div
      id="quickview-modal-backdrop"
      className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200"
      onClick={closeQuickView}
    >
      <div
        className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-stone-200 max-h-[90vh] flex flex-col md:flex-row"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          id="close-quickview-btn"
          onClick={closeQuickView}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left: Book Media & Gallery */}
        <div className="w-full md:w-5/12 bg-stone-100 p-6 sm:p-8 flex flex-col items-center justify-center relative border-r border-stone-200">
          <div className="relative w-48 sm:w-56 h-68 sm:h-80 rounded-xl shadow-2xl overflow-hidden border border-stone-300 transform hover:scale-105 transition-transform duration-300">
            <img
              src={images[selectedImgIndex] || book.coverImage}
              alt={book.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 pointer-events-none book-spine-effect" />
          </div>

          {/* Gallery Thumbnails if multiple */}
          {images.length > 1 && (
            <div className="flex gap-2 mt-4">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImgIndex(idx)}
                  className={`w-12 h-14 rounded-md overflow-hidden border-2 transition-all ${
                    selectedImgIndex === idx ? 'border-[#C5A059] scale-105' : 'border-transparent opacity-70'
                  }`}
                >
                  <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}

          <button
            onClick={handleReadSample}
            className="mt-6 w-full max-w-[220px] py-2.5 px-4 rounded-xl bg-white border border-[#C5A059] text-[#0B192C] text-xs font-bold hover:bg-[#C5A059]/10 transition-colors flex items-center justify-center gap-2 shadow-sm"
          >
            <BookOpen className="w-4 h-4 text-[#C5A059]" />
            <span>Read Sample Pages</span>
          </button>
        </div>

        {/* Right: Book Details & Actions */}
        <div className="w-full md:w-7/12 p-6 sm:p-8 overflow-y-auto flex flex-col justify-between">
          <div>
            {/* Header info */}
            <div className="flex items-center gap-2 text-xs font-semibold text-[#C5A059] uppercase tracking-wider mb-1">
              <span>{book.category}</span>
              <span>•</span>
              <span className="text-stone-500 font-mono">ISBN {book.isbn}</span>
            </div>

            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#0B192C] leading-tight">
              {book.title}
            </h2>

            {book.subtitle && (
              <p className="text-stone-600 text-sm mt-1 font-medium">{book.subtitle}</p>
            )}

            <p className="text-xs text-stone-600 mt-2">
              Authored by{' '}
              <span className="font-semibold text-stone-900">{book.authorName}</span>
              {book.authorRole && (
                <span className="text-stone-400"> ({book.authorRole})</span>
              )}
            </p>

            {/* Ratings & Reviews */}
            <div className="flex items-center gap-3 mt-3 pb-4 border-b border-stone-100">
              <div className="flex items-center text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(book.rating) ? 'fill-current' : 'text-stone-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm font-bold text-stone-800">{book.rating}</span>
              <span className="text-xs text-stone-500">({book.reviewCount} customer reviews)</span>
            </div>

            {/* Pricing */}
            <div className="flex items-baseline gap-3 my-4">
              <span className="font-mono text-3xl font-extrabold text-[#0B192C]">
                ₹{book.price}
              </span>
              {book.originalPrice > book.price && (
                <span className="font-mono text-base text-stone-400 line-through">
                  ₹{book.originalPrice}
                </span>
              )}
              {book.discountPercent && (
                <span className="px-2 py-0.5 rounded bg-rose-50 text-rose-700 text-xs font-bold">
                  Save {book.discountPercent}%
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed line-clamp-3">
              {book.description}
            </p>

            {/* Format Selector */}
            <div className="mt-5">
              <label className="text-xs font-bold text-stone-700 uppercase tracking-wide block mb-2">
                Select Edition Format
              </label>
              <div className="grid grid-cols-3 gap-2">
                {book.formats.map((fmt) => (
                  <button
                    key={fmt}
                    onClick={() => setSelectedFormat(fmt)}
                    className={`py-2 px-3 rounded-xl text-xs font-semibold border transition-all text-center ${
                      selectedFormat === fmt
                        ? 'border-[#0B192C] bg-[#0B192C] text-white shadow-sm'
                        : 'border-stone-200 text-stone-700 hover:border-stone-300'
                    }`}
                  >
                    {fmt}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center gap-4 mt-4">
              <label className="text-xs font-bold text-stone-700 uppercase tracking-wide">
                Quantity:
              </label>
              <div className="flex items-center border border-stone-200 rounded-lg overflow-hidden bg-white">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-1 text-stone-600 hover:bg-stone-100 font-bold"
                >
                  -
                </button>
                <span className="px-3 py-1 font-mono text-sm font-semibold">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-1 text-stone-600 hover:bg-stone-100 font-bold"
                >
                  +
                </button>
              </div>
              <span className="text-xs text-emerald-700 font-medium">
                {book.inStock ? `In Stock (${book.stockCount} copies)` : 'Out of Stock'}
              </span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="pt-6 mt-4 border-t border-stone-100 space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                id="quickview-add-cart-btn"
                onClick={handleAddToCart}
                disabled={!book.inStock}
                className="py-3 px-4 rounded-xl bg-[#0B192C] hover:bg-[#152A4A] text-white text-sm font-bold flex items-center justify-center gap-2 shadow-md transition-colors"
              >
                <ShoppingBag className="w-4 h-4 text-[#C5A059]" />
                <span>Add to Cart</span>
              </button>

              <button
                id="quickview-buynow-btn"
                onClick={handleBuyNow}
                disabled={!book.inStock}
                className="py-3 px-4 rounded-xl bg-gradient-to-r from-[#C5A059] to-[#D8B76E] text-[#0B192C] text-sm font-bold flex items-center justify-center gap-2 shadow-md hover:brightness-105 transition-all"
              >
                <span>Instant Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-center justify-between text-[11px] text-stone-500 pt-1">
              <div className="flex items-center gap-1">
                <Truck className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>Express courier across all pin codes</span>
              </div>
              <button
                onClick={() => {
                  closeQuickView();
                  navigate(`/books/${book.slug}`);
                }}
                className="text-[#0B192C] hover:text-[#C5A059] font-semibold underline"
              >
                View Full Book Dossier →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
