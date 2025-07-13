'use client';

import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  MapPin, 
  Calendar, 
  Star, 
  Eye,
  ShoppingCart,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import Link from 'next/link';

export function ProductGrid({ products }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product, index) => (
        <motion.div
          key={product.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          whileHover={{ y: -5 }}
        >
          <Card className="overflow-hidden hover:shadow-lg transition-all duration-300">
            <div className="relative">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-3 left-3">
                {product.inStock ? (
                  <Badge className="bg-green-600 text-white flex items-center space-x-1">
                    <CheckCircle className="h-3 w-3" />
                    <span>In Stock</span>
                  </Badge>
                ) : (
                  <Badge variant="secondary" className="flex items-center space-x-1">
                    <AlertCircle className="h-3 w-3" />
                    <span>Out of Stock</span>
                  </Badge>
                )}
              </div>
              <div className="absolute top-3 right-3">
                <div className="flex items-center space-x-1 bg-white rounded-full px-2 py-1">
                  <Star className="h-3 w-3 text-yellow-500 fill-current" />
                  <span className="text-xs font-medium">{product.rating}</span>
                </div>
              </div>
            </div>

            <div className="p-6">
              <div className="mb-3">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  {product.name}
                </h3>
                <p className="text-sm text-gray-600">
                  by {product.farmer} • {product.farm}
                </p>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <MapPin className="h-4 w-4" />
                  <span>{product.location}</span>
                  <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                    {product.distance}
                  </span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Calendar className="h-4 w-4" />
                  <span>Harvested {new Date(product.harvestDate).toLocaleDateString()}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-1 mb-4">
                {product.certifications.map((cert) => (
                  <Badge key={cert} variant="outline" className="text-xs">
                    {cert}
                  </Badge>
                ))}
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xl font-bold text-green-600">
                    {product.price}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Link href={`/product/${product.id}`}>
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </Button>
                  </Link>
                  <Button 
                    size="sm" 
                    disabled={!product.inStock}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    <ShoppingCart className="h-4 w-4 mr-1" />
                    Add
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}