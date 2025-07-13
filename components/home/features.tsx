'use client';

import { motion } from 'framer-motion';
import { 
  QrCode, 
  Map, 
  Clock, 
  Shield, 
  Users, 
  Search,
  Smartphone,
  Globe,
  Award
} from 'lucide-react';

const features = [
  {
    icon: QrCode,
    title: 'QR Code Scanning',
    description: 'Instantly access product information by scanning QR codes with your mobile device.',
    color: 'text-blue-600',
    bgColor: 'bg-blue-100'
  },
  {
    icon: Map,
    title: 'Supply Chain Mapping',
    description: 'Visualize the complete journey of your food from farm to your table.',
    color: 'text-green-600',
    bgColor: 'bg-green-100'
  },
  {
    icon: Clock,
    title: 'Real-time Tracking',
    description: 'Get live updates on your food\'s location and condition throughout its journey.',
    color: 'text-purple-600',
    bgColor: 'bg-purple-100'
  },
  {
    icon: Shield,
    title: 'Verified Authenticity',
    description: 'Blockchain-powered verification ensures the authenticity of all information.',
    color: 'text-red-600',
    bgColor: 'bg-red-100'
  },
  {
    icon: Users,
    title: 'Farmer Profiles',
    description: 'Connect with farmers and learn about their sustainable practices.',
    color: 'text-orange-600',
    bgColor: 'bg-orange-100'
  },
  {
    icon: Search,
    title: 'Advanced Search',
    description: 'Find products by location, farmer, certification, or any other criteria.',
    color: 'text-teal-600',
    bgColor: 'bg-teal-100'
  },
  {
    icon: Smartphone,
    title: 'Mobile Optimized',
    description: 'Perfect experience on all devices with progressive web app capabilities.',
    color: 'text-indigo-600',
    bgColor: 'bg-indigo-100'
  },
  {
    icon: Globe,
    title: 'Global Network',
    description: 'Access to a worldwide network of verified farms and suppliers.',
    color: 'text-pink-600',
    bgColor: 'bg-pink-100'
  },
  {
    icon: Award,
    title: 'Certifications',
    description: 'View all organic, fair trade, and sustainability certifications.',
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-100'
  }
];

export function Features() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Powerful Features for Complete
            <span className="text-green-600 block">Food Transparency</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Everything you need to make informed decisions about your food, 
            from farm certifications to real-time tracking.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="bg-gray-50 rounded-2xl p-6 hover:shadow-lg transition-all duration-300"
            >
              <div className={`w-12 h-12 ${feature.bgColor} rounded-xl flex items-center justify-center mb-4`}>
                <feature.icon className={`h-6 w-6 ${feature.color}`} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}