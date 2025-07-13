'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { QrCode, ArrowRight, Shield, Truck, Leaf } from 'lucide-react';
import Link from 'next/link';

export function Hero() {
  return (
    <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center lg:text-left"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Track Your Food's
              <span className="text-green-600 block">
                Journey from Farm to Table
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 mt-6 max-w-lg">
              Complete transparency in food provenance. Scan, track, and verify 
              the journey of your food with blockchain-powered authenticity.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <Link href="/scan">
                <Button size="lg" className="bg-green-600 hover:bg-green-700">
                  <QrCode className="h-5 w-5 mr-2" />
                  Scan Product
                </Button>
              </Link>
              <Link href="/map">
                <Button size="lg" variant="outline">
                  View Supply Map
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
              </Link>
            </div>

            <div className="flex items-center justify-center lg:justify-start gap-8 mt-12">
              <div className="flex items-center space-x-2 text-gray-600">
                <Shield className="h-5 w-5 text-green-600" />
                <span className="text-sm">Verified</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <Truck className="h-5 w-5 text-green-600" />
                <span className="text-sm">Traceable</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <Leaf className="h-5 w-5 text-green-600" />
                <span className="text-sm">Sustainable</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="bg-gradient-to-br from-green-400 to-blue-500 rounded-3xl p-8 shadow-2xl">
              <div className="bg-white rounded-2xl p-6 space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <Leaf className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Organic Tomatoes</h3>
                    <p className="text-sm text-gray-600">Harvest: 2 days ago</p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Farm Location</span>
                    <span className="text-gray-900">Sonoma, CA</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Farmer</span>
                    <span className="text-gray-900">Green Valley Farms</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Certifications</span>
                    <span className="text-green-600">Organic, Non-GMO</span>
                  </div>
                </div>

                <div className="bg-green-50 rounded-lg p-3">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm text-green-800">Live tracking active</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Floating elements */}
            <motion.div
              animate={{ y: [-10, 10, -10] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-4 -right-4 w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg"
            >
              <QrCode className="h-8 w-8 text-white" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}