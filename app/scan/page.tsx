'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Navigation } from '@/components/layout/navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { 
  Camera, 
  Upload, 
  QrCode, 
  CheckCircle, 
  AlertCircle,
  ArrowRight,
  MapPin,
  Calendar,
  User,
  Award
} from 'lucide-react';
import Link from 'next/link';

// Define TypeScript interfaces
interface Farmer {
  name: string;
  farm: string;
  location: string;
  certifications: string[];
}

interface Harvest {
  date: string;
  quality: string;
  weight: string;
}

interface JourneyStep {
  location: string;
  date: string;
  event: string;
}

interface Sustainability {
  waterUsage: string;
  carbonFootprint: string;
  packaging: string;
}

interface Product {
  id: string;
  name: string;
  image: string;
  farmer: Farmer;
  harvest: Harvest;
  journey: JourneyStep[];
  certifications: string[];
  sustainability: Sustainability;
}

// Mock product data
const mockProducts: Record<string, Product> = {
  'FRESH001': {
    id: 'FRESH001',
    name: 'Organic Roma Tomatoes',
    image: 'https://images.pexels.com/photos/1327838/pexels-photo-1327838.jpeg?auto=compress&cs=tinysrgb&w=400',
    farmer: {
      name: 'Maria Gonzalez',
      farm: 'Sunshine Organic Farms',
      location: 'Salinas, California',
      certifications: ['USDA Organic', 'Non-GMO Project']
    },
    harvest: {
      date: '2025-01-10',
      quality: 'Premium Grade A',
      weight: '2.5 lbs'
    },
    journey: [
      { location: 'Salinas, CA', date: '2025-01-10', event: 'Harvested' },
      { location: 'Salinas, CA', date: '2025-01-11', event: 'Packaged' },
      { location: 'Fresno, CA', date: '2025-01-12', event: 'Distribution Center' },
      { location: 'San Francisco, CA', date: '2025-01-13', event: 'Retail Store' }
    ],
    certifications: ['Organic', 'Non-GMO', 'Fair Trade'],
    sustainability: {
      waterUsage: '30% less than conventional',
      carbonFootprint: 'Carbon neutral',
      packaging: '100% recyclable'
    }
  }
};

export default function ScanPage() {
  const [isScanning, setIsScanning] = useState(false);
  const [scannedProduct, setScannedProduct] = useState<Product | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const simulateScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      setScannedProduct(mockProducts['FRESH001']);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      <Navigation />
      
      <main className="pt-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Scan Product QR Code
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover the complete journey of your food from farm to table
            </p>
          </motion.div>

          {!scannedProduct ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="p-8 mb-8">
                <div className="text-center">
                  {isScanning ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="py-12"
                    >
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        className="w-16 h-16 border-4 border-green-600 border-t-transparent rounded-full mx-auto mb-4"
                      />
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        Scanning QR Code...
                      </h3>
                      <p className="text-gray-600">
                        Please wait while we retrieve product information
                      </p>
                    </motion.div>
                  ) : (
                    <>
                      <QrCode className="h-24 w-24 text-green-600 mx-auto mb-6" />
                      <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                        Ready to Scan
                      </h3>
                      <p className="text-gray-600 mb-8">
                        Use your camera to scan a QR code or upload an image
                      </p>
                      
                      <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button
                          size="lg"
                          onClick={simulateScan}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          <Camera className="h-5 w-5 mr-2" />
                          Start Camera Scan
                        </Button>
                        
                        <Button
                          size="lg"
                          variant="outline"
                          onClick={() => fileInputRef.current?.click()}
                        >
                          <Upload className="h-5 w-5 mr-2" />
                          Upload Image
                        </Button>
                      </div>
                      
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          if (e.target.files?.[0]) {
                            simulateScan();
                          }
                        }}
                      />
                    </>
                  )}
                </div>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="p-6">
                  <QrCode className="h-8 w-8 text-blue-600 mb-4" />
                  <h4 className="font-semibold text-gray-900 mb-2">Quick & Easy</h4>
                  <p className="text-sm text-gray-600">
                    Simply point your camera at any QR code on participating products
                  </p>
                </Card>
                
                <Card className="p-6">
                  <CheckCircle className="h-8 w-8 text-green-600 mb-4" />
                  <h4 className="font-semibold text-gray-900 mb-2">Instant Results</h4>
                  <p className="text-sm text-gray-600">
                    Get immediate access to complete product information and journey
                  </p>
                </Card>
                
                <Card className="p-6">
                  <AlertCircle className="h-8 w-8 text-orange-600 mb-4" />
                  <h4 className="font-semibold text-gray-900 mb-2">Verified Data</h4>
                  <p className="text-sm text-gray-600">
                    All information is blockchain-verified for complete authenticity
                  </p>
                </Card>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Card className="p-8 mb-8">
                <div className="flex items-center space-x-3 mb-6">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">
                      Product Found!
                    </h3>
                    <p className="text-gray-600">
                      Verified and authenticated
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div>
                    <img
                      src={scannedProduct.image}
                      alt={scannedProduct.name}
                      className="w-full h-64 object-cover rounded-lg mb-4"
                    />
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                      {scannedProduct.name}
                    </h2>
                    <p className="text-lg text-gray-600 mb-4">
                      {scannedProduct.harvest.quality} • {scannedProduct.harvest.weight}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-6">
                      {scannedProduct.certifications.map((cert) => (
                        <span
                          key={cert}
                          className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium"
                        >
                          {cert}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                        <User className="h-5 w-5 mr-2 text-blue-600" />
                        Farmer Information
                      </h4>
                      <div className="bg-gray-50 rounded-lg p-4">
                        <p className="font-medium text-gray-900">{scannedProduct.farmer.name}</p>
                        <p className="text-gray-600">{scannedProduct.farmer.farm}</p>
                        <p className="text-sm text-gray-500 flex items-center mt-2">
                          <MapPin className="h-4 w-4 mr-1" />
                          {scannedProduct.farmer.location}
                        </p>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                        <Calendar className="h-5 w-5 mr-2 text-green-600" />
                        Harvest Details
                      </h4>
                      <div className="bg-gray-50 rounded-lg p-4">
                        <p className="text-gray-900">
                          Harvested: {new Date(scannedProduct.harvest.date).toLocaleDateString()}
                        </p>
                        <p className="text-gray-600">
                          Quality: {scannedProduct.harvest.quality}
                        </p>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                        <Award className="h-5 w-5 mr-2 text-purple-600" />
                        Sustainability
                      </h4>
                      <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                        <p className="text-sm text-gray-600">
                          💧 {scannedProduct.sustainability.waterUsage}
                        </p>
                        <p className="text-sm text-gray-600">
                          🌱 {scannedProduct.sustainability.carbonFootprint}
                        </p>
                        <p className="text-sm text-gray-600">
                          ♻️ {scannedProduct.sustainability.packaging}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 mt-8">
                  <Link href={`/product/${scannedProduct.id}`} className="flex-1">
                    <Button className="w-full bg-green-600 hover:bg-green-700">
                      View Full Details
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </Link>
                  <Link href="/map" className="flex-1">
                    <Button variant="outline" className="w-full">
                      View Supply Chain Map
                    </Button>
                  </Link>
                </div>
              </Card>

              <div className="text-center">
                <Button
                  variant="outline"
                  onClick={() => {
                    setScannedProduct(null);
                    setIsScanning(false);
                  }}
                >
                  Scan Another Product
                </Button>
              </div>
            </motion.div>
          )}
        </div>
      </main>
    </div>
  );
}