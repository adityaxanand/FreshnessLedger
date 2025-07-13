'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Navigation } from '@/components/layout/navigation';
import { SearchFilters } from '@/components/search/search-filters';
import { ProductGrid } from '@/components/search/product-grid';
import { SearchBar } from '@/components/search/search-bar';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Search as SearchIcon,
  Filter,
  SlidersHorizontal,
  MapPin,
  Calendar,
  Award
} from 'lucide-react';

const mockProducts = [
  {
    id: 'FRESH001',
    name: 'Organic Roma Tomatoes',
    image: 'https://images.pexels.com/photos/1327838/pexels-photo-1327838.jpeg?auto=compress&cs=tinysrgb&w=400',
    farmer: 'Maria Gonzalez',
    farm: 'Sunshine Organic Farms',
    location: 'Salinas, California',
    harvestDate: '2025-01-10',
    certifications: ['Organic', 'Non-GMO'],
    price: '$4.99/lb',
    distance: '150 miles',
    rating: 4.8,
    inStock: true
  },
  {
    id: 'FRESH002',
    name: 'Free-Range Eggs',
    image: 'https://images.pexels.com/photos/162712/egg-white-food-protein-162712.jpeg?auto=compress&cs=tinysrgb&w=400',
    farmer: 'John Smith',
    farm: 'Happy Hen Farm',
    location: 'Petaluma, California',
    harvestDate: '2025-01-12',
    certifications: ['Free-Range', 'Organic'],
    price: '$6.99/dozen',
    distance: '85 miles',
    rating: 4.9,
    inStock: true
  },
  {
    id: 'FRESH003',
    name: 'Heirloom Carrots',
    image: 'https://images.pexels.com/photos/143133/pexels-photo-143133.jpeg?auto=compress&cs=tinysrgb&w=400',
    farmer: 'Sarah Johnson',
    farm: 'Rainbow Valley Farm',
    location: 'Watsonville, California',
    harvestDate: '2025-01-11',
    certifications: ['Organic', 'Heirloom'],
    price: '$3.49/lb',
    distance: '120 miles',
    rating: 4.7,
    inStock: true
  },
  {
    id: 'FRESH004',
    name: 'Artisan Honey',
    image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400',
    farmer: 'Michael Brown',
    farm: 'Golden Bee Apiary',
    location: 'Napa Valley, California',
    harvestDate: '2025-01-08',
    certifications: ['Raw', 'Local'],
    price: '$12.99/jar',
    distance: '95 miles',
    rating: 5.0,
    inStock: true
  },
  {
    id: 'FRESH005',
    name: 'Baby Spinach',
    image: 'https://images.pexels.com/photos/2325843/pexels-photo-2325843.jpeg?auto=compress&cs=tinysrgb&w=400',
    farmer: 'Lisa Chen',
    farm: 'Green Leaf Gardens',
    location: 'Salinas, California',
    harvestDate: '2025-01-13',
    certifications: ['Organic', 'Pesticide-Free'],
    price: '$2.99/bag',
    distance: '150 miles',
    rating: 4.6,
    inStock: false
  },
  {
    id: 'FRESH006',
    name: 'Heritage Apples',
    image: 'https://images.pexels.com/photos/102104/pexels-photo-102104.jpeg?auto=compress&cs=tinysrgb&w=400',
    farmer: 'Robert Wilson',
    farm: 'Orchard Hills Farm',
    location: 'Sebastopol, California',
    harvestDate: '2025-01-09',
    certifications: ['Organic', 'Heritage Variety'],
    price: '$5.49/lb',
    distance: '75 miles',
    rating: 4.8,
    inStock: true
  }
];

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    location: '',
    certification: '',
    dateRange: '',
    priceRange: '',
    inStockOnly: false
  });
  const [sortBy, setSortBy] = useState('relevance');

  const filteredProducts = mockProducts.filter(product => {
    const matchesSearch = !searchQuery || 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.farmer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.farm.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.location.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesFilters = 
      (!filters.location || product.location.toLowerCase().includes(filters.location.toLowerCase())) &&
      (!filters.certification || product.certifications.some(cert => 
        cert.toLowerCase().includes(filters.certification.toLowerCase())
      )) &&
      (!filters.inStockOnly || product.inStock);

    return matchesSearch && matchesFilters;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return parseFloat(a.price.replace(/[^0-9.]/g, '')) - parseFloat(b.price.replace(/[^0-9.]/g, ''));
      case 'price-high':
        return parseFloat(b.price.replace(/[^0-9.]/g, '')) - parseFloat(a.price.replace(/[^0-9.]/g, ''));
      case 'distance':
        return parseFloat(a.distance.replace(/[^0-9.]/g, '')) - parseFloat(b.distance.replace(/[^0-9.]/g, ''));
      case 'rating':
        return b.rating - a.rating;
      case 'newest':
        return new Date(b.harvestDate).getTime() - new Date(a.harvestDate).getTime();
      default:
        return 0;
    }
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      <Navigation />
      
      <main className="pt-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Search Products
            </h1>
            <p className="text-xl text-gray-600 mb-6">
              Find fresh, local products from verified farms
            </p>

            {/* Search Bar */}
            <div className="relative mb-6">
              <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by product, farmer, farm, or location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg"
              />
            </div>

            {/* Filter and Sort Bar */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <div className="flex items-center space-x-4">
                <Button
                  variant="outline"
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center space-x-2"
                >
                  <SlidersHorizontal className="h-4 w-4" />
                  <span>Filters</span>
                  {(filters.location || filters.certification || filters.inStockOnly) && (
                    <Badge variant="secondary" className="ml-2">
                      Active
                    </Badge>
                  )}
                </Button>
                
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">Sort by:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="text-sm border border-gray-300 rounded px-3 py-1 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="relevance">Relevance</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="distance">Distance</option>
                    <option value="rating">Rating</option>
                    <option value="newest">Newest</option>
                  </select>
                </div>
              </div>

              <div className="text-sm text-gray-600">
                {sortedProducts.length} products found
              </div>
            </div>

            {/* Filters Panel */}
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <SearchFilters filters={filters} onFiltersChange={setFilters} />
              </motion.div>
            )}
          </motion.div>

          {/* Results */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {sortedProducts.length > 0 ? (
              <ProductGrid products={sortedProducts} />
            ) : (
              <Card className="p-12 text-center">
                <SearchIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  No products found
                </h3>
                <p className="text-gray-600 mb-6">
                  Try adjusting your search terms or filters
                </p>
                <Button
                  onClick={() => {
                    setSearchQuery('');
                    setFilters({
                      location: '',
                      certification: '',
                      dateRange: '',
                      priceRange: '',
                      inStockOnly: false
                    });
                  }}
                >
                  Clear Search
                </Button>
              </Card>
            )}
          </motion.div>
        </div>
      </main>
    </div>
  );
}