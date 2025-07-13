'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  MapPin, 
  Award, 
  Calendar, 
  DollarSign,
  Package,
  X
} from 'lucide-react';

const locations = [
  'Salinas, California',
  'Petaluma, California',
  'Watsonville, California',
  'Napa Valley, California',
  'Sebastopol, California'
];

const certifications = [
  'Organic',
  'Non-GMO',
  'Free-Range',
  'Pesticide-Free',
  'Fair Trade',
  'Biodynamic',
  'Local',
  'Sustainable'
];

const dateRanges = [
  { label: 'Today', value: 'today' },
  { label: 'Last 3 days', value: '3days' },
  { label: 'Last week', value: 'week' },
  { label: 'Last month', value: 'month' }
];

const priceRanges = [
  { label: 'Under $5', value: '0-5' },
  { label: '$5 - $10', value: '5-10' },
  { label: '$10 - $20', value: '10-20' },
  { label: 'Over $20', value: '20+' }
];

export function SearchFilters({ filters, onFiltersChange }) {
  const updateFilter = (key, value) => {
    onFiltersChange({
      ...filters,
      [key]: value
    });
  };

  const clearAllFilters = () => {
    onFiltersChange({
      location: '',
      certification: '',
      dateRange: '',
      priceRange: '',
      inStockOnly: false
    });
  };

  const hasActiveFilters = Object.values(filters).some(value => value !== '' && value !== false);

  return (
    <Card className="p-6 mb-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
        {hasActiveFilters && (
          <Button variant="outline" size="sm" onClick={clearAllFilters}>
            <X className="h-4 w-4 mr-2" />
            Clear All
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Location Filter */}
        <div>
          <div className="flex items-center space-x-2 mb-3">
            <MapPin className="h-4 w-4 text-blue-600" />
            <label className="text-sm font-medium text-gray-900">Location</label>
          </div>
          <select
            value={filters.location}
            onChange={(e) => updateFilter('location', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
          >
            <option value="">All locations</option>
            {locations.map((location) => (
              <option key={location} value={location}>
                {location}
              </option>
            ))}
          </select>
        </div>

        {/* Certification Filter */}
        <div>
          <div className="flex items-center space-x-2 mb-3">
            <Award className="h-4 w-4 text-green-600" />
            <label className="text-sm font-medium text-gray-900">Certification</label>
          </div>
          <select
            value={filters.certification}
            onChange={(e) => updateFilter('certification', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
          >
            <option value="">All certifications</option>
            {certifications.map((cert) => (
              <option key={cert} value={cert}>
                {cert}
              </option>
            ))}
          </select>
        </div>

        {/* Date Range Filter */}
        <div>
          <div className="flex items-center space-x-2 mb-3">
            <Calendar className="h-4 w-4 text-purple-600" />
            <label className="text-sm font-medium text-gray-900">Harvest Date</label>
          </div>
          <select
            value={filters.dateRange}
            onChange={(e) => updateFilter('dateRange', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
          >
            <option value="">Any time</option>
            {dateRanges.map((range) => (
              <option key={range.value} value={range.value}>
                {range.label}
              </option>
            ))}
          </select>
        </div>

        {/* Price Range Filter */}
        <div>
          <div className="flex items-center space-x-2 mb-3">
            <DollarSign className="h-4 w-4 text-orange-600" />
            <label className="text-sm font-medium text-gray-900">Price Range</label>
          </div>
          <select
            value={filters.priceRange}
            onChange={(e) => updateFilter('priceRange', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
          >
            <option value="">Any price</option>
            {priceRanges.map((range) => (
              <option key={range.value} value={range.value}>
                {range.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Additional Filters */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="flex items-center space-x-6">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={filters.inStockOnly}
              onChange={(e) => updateFilter('inStockOnly', e.target.checked)}
              className="rounded border-gray-300 text-green-600 focus:ring-green-500"
            />
            <div className="flex items-center space-x-1">
              <Package className="h-4 w-4 text-green-600" />
              <span className="text-sm text-gray-900">In stock only</span>
            </div>
          </label>
        </div>
      </div>

      {/* Active Filters */}
      {hasActiveFilters && (
        <div className="mt-6 pt-6 border-t border-gray-200">
          <h4 className="text-sm font-medium text-gray-900 mb-3">Active Filters:</h4>
          <div className="flex flex-wrap gap-2">
            {filters.location && (
              <Badge variant="secondary" className="flex items-center space-x-1">
                <span>Location: {filters.location.split(',')[0]}</span>
                <button
                  onClick={() => updateFilter('location', '')}
                  className="ml-1 hover:text-red-600"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )}
            {filters.certification && (
              <Badge variant="secondary" className="flex items-center space-x-1">
                <span>Cert: {filters.certification}</span>
                <button
                  onClick={() => updateFilter('certification', '')}
                  className="ml-1 hover:text-red-600"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )}
            {filters.dateRange && (
              <Badge variant="secondary" className="flex items-center space-x-1">
                <span>Date: {dateRanges.find(r => r.value === filters.dateRange)?.label}</span>
                <button
                  onClick={() => updateFilter('dateRange', '')}
                  className="ml-1 hover:text-red-600"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )}
            {filters.priceRange && (
              <Badge variant="secondary" className="flex items-center space-x-1">
                <span>Price: {priceRanges.find(r => r.value === filters.priceRange)?.label}</span>
                <button
                  onClick={() => updateFilter('priceRange', '')}
                  className="ml-1 hover:text-red-600"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )}
            {filters.inStockOnly && (
              <Badge variant="secondary" className="flex items-center space-x-1">
                <span>In stock only</span>
                <button
                  onClick={() => updateFilter('inStockOnly', false)}
                  className="ml-1 hover:text-red-600"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )}
          </div>
        </div>
      )}
    </Card>
  );
}