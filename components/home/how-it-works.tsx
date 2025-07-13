'use client';

import { motion } from 'framer-motion';
import { QrCode, MapPin, CheckCircle, Smartphone } from 'lucide-react';

const steps = [
  {
    icon: Smartphone,
    title: 'Scan the QR Code',
    description: 'Use your phone to scan the QR code on any participating product.',
    color: 'text-blue-600',
    bgColor: 'bg-blue-100'
  },
  {
    icon: MapPin,
    title: 'View the Journey',
    description: 'See the complete path from farm to store with interactive maps.',
    color: 'text-green-600',
    bgColor: 'bg-green-100'
  },
  {
    icon: CheckCircle,
    title: 'Verify Authenticity',
    description: 'Check certifications, quality standards, and farmer information.',
    color: 'text-purple-600',
    bgColor: 'bg-purple-100'
  }
];

export function HowItWorks() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-green-50 to-blue-50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Getting complete food transparency is as easy as 1-2-3
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="text-center relative"
            >
              {/* Connection line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-16 left-1/2 w-full h-0.5 bg-gradient-to-r from-gray-300 to-transparent transform translate-x-8 z-0" />
              )}
              
              <div className="relative z-10">
                <div className={`w-16 h-16 ${step.bgColor} rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg`}>
                  <step.icon className={`h-8 w-8 ${step.color}`} />
                </div>
                
                <div className="absolute -top-2 -left-2 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-md">
                  <span className="text-sm font-bold text-gray-900">{index + 1}</span>
                </div>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {step.title}
              </h3>
              <p className="text-gray-600">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-white rounded-2xl p-8 shadow-lg max-w-2xl mx-auto">
            <QrCode className="h-16 w-16 text-green-600 mx-auto mb-4" />
            <h4 className="text-2xl font-bold text-gray-900 mb-2">
              Ready to Get Started?
            </h4>
            <p className="text-gray-600 mb-6">
              Scan your first product and discover the story behind your food.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
            >
              Start Scanning Now
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}