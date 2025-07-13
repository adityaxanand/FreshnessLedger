'use client';

import { motion } from 'framer-motion';

const stats = [
  {
    number: '10,000+',
    label: 'Verified Farms',
    description: 'Trusted partners worldwide'
  },
  {
    number: '1M+',
    label: 'Products Tracked',
    description: 'From farm to table'
  },
  {
    number: '50+',
    label: 'Countries',
    description: 'Global network coverage'
  },
  {
    number: '99.9%',
    label: 'Accuracy Rate',
    description: 'Blockchain verified data'
  }
];

export function Stats() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
            Trusted by Millions Worldwide
          </h2>
          <p className="text-lg text-gray-600">
            Join the movement for food transparency and sustainability
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="text-3xl sm:text-4xl font-bold text-green-600 mb-2">
                {stat.number}
              </div>
              <div className="text-lg font-semibold text-gray-900 mb-1">
                {stat.label}
              </div>
              <div className="text-sm text-gray-600">
                {stat.description}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}