'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Navigation } from '@/components/layout/navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { MapSupplyChain } from '@/components/map/map-supply-chain';
import { JourneyTimeline } from '@/components/map/journey-timeline';
import { 
  Map as MapIcon,
  List,
  Filter,
  Search,
  Truck,
  MapPin,
  Clock
} from 'lucide-react';

const mockJourneyData = [
  {
    id: 1,
    location: 'Sunshine Organic Farms, Salinas, CA',
    coordinates: [-121.6555, 36.6777],
    date: '2025-01-10',
    time: '06:00 AM',
    event: 'Harvested',
    description: 'Fresh organic tomatoes harvested at peak ripeness',
    status: 'completed',
    temperature: '68°F',
    humidity: '45%'
  },
  {
    id: 2,
    location: 'Packaging Facility, Salinas, CA',
    coordinates: [-121.6555, 36.6777],
    date: '2025-01-10',
    time: '02:00 PM',
    event: 'Packaged',
    description: 'Sorted, cleaned, and packaged in recyclable containers',
    status: 'completed',
    temperature: '65°F',
    humidity: '40%'
  },
  {
    id: 3,
    location: 'Distribution Center, Fresno, CA',
    coordinates: [-119.7871, 36.7378],
    date: '2025-01-11',
    time: '10:00 AM',
    event: 'In Transit',
    description: 'Transported via refrigerated truck to distribution center',
    status: 'completed',
    temperature: '62°F',
    humidity: '38%'
  },
  {
    id: 4,
    location: 'Regional Hub, San Jose, CA',
    coordinates: [-121.8863, 37.3382],
    date: '2025-01-12',
    time: '08:00 AM',
    event: 'Processing',
    description: 'Quality check and distribution sorting',
    status: 'completed',
    temperature: '64°F',
    humidity: '42%'
  },
  {
    id: 5,
    location: 'Fresh Market, San Francisco, CA',
    coordinates: [-122.4194, 37.7749],
    date: '2025-01-13',
    time: '06:00 AM',
    event: 'Delivered',
    description: 'Available for purchase at retail location',
    status: 'current',
    temperature: '66°F',
    humidity: '55%'
  }
];

export default function MapPage() {
  const [viewMode, setViewMode] = useState('map');
  const [selectedJourneyPoint, setSelectedJourneyPoint] = useState(null);

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
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <div>
                <h1 className="text-4xl font-bold text-gray-900 mb-2">
                  Supply Chain Map
                </h1>
                <p className="text-xl text-gray-600">
                  Track your food's journey from farm to table
                </p>
              </div>
              
              <div className="flex items-center space-x-2">
                <Button
                  variant={viewMode === 'map' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('map')}
                >
                  <MapIcon className="h-4 w-4 mr-2" />
                  Map View
                </Button>
                <Button
                  variant={viewMode === 'timeline' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('timeline')}
                >
                  <List className="h-4 w-4 mr-2" />
                  Timeline
                </Button>
              </div>
            </div>

            {/* Stats bar */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              <Card className="p-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <MapPin className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Total Distance</p>
                    <p className="text-lg font-semibold text-gray-900">284 miles</p>
                  </div>
                </div>
              </Card>
              
              <Card className="p-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Clock className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Transit Time</p>
                    <p className="text-lg font-semibold text-gray-900">3 days</p>
                  </div>
                </div>
              </Card>
              
              <Card className="p-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Truck className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Checkpoints</p>
                    <p className="text-lg font-semibold text-gray-900">5 locations</p>
                  </div>
                </div>
              </Card>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {viewMode === 'map' ? (
              <MapSupplyChain 
                journeyData={mockJourneyData}
                onPointSelect={setSelectedJourneyPoint}
              />
            ) : (
              <JourneyTimeline 
                journeyData={mockJourneyData}
                selectedPoint={selectedJourneyPoint}
                onPointSelect={setSelectedJourneyPoint}
              />
            )}
          </motion.div>
        </div>
      </main>
    </div>
  );
}