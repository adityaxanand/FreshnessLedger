'use client';

import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Clock, 
  MapPin, 
  Thermometer, 
  Droplets,
  CheckCircle,
  Circle,
  Navigation
} from 'lucide-react';

export function JourneyTimeline({ journeyData, selectedPoint, onPointSelect }) {
  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'text-green-600 bg-green-100';
      case 'current':
        return 'text-blue-600 bg-blue-100';
      case 'pending':
        return 'text-gray-600 bg-gray-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return CheckCircle;
      case 'current':
        return Navigation;
      case 'pending':
        return Circle;
      default:
        return Circle;
    }
  };

  const getEventIcon = (event) => {
    switch (event.toLowerCase()) {
      case 'harvested':
        return '🌱';
      case 'packaged':
        return '📦';
      case 'in transit':
        return '🚛';
      case 'processing':
        return '⚙️';
      case 'delivered':
        return '✅';
      default:
        return '📍';
    }
  };

  return (
    <Card className="p-6">
      <div className="flex items-center space-x-2 mb-6">
        <Clock className="h-6 w-6 text-blue-600" />
        <h2 className="text-2xl font-bold text-gray-900">Journey Timeline</h2>
      </div>

      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-200" />

        <div className="space-y-6">
          {journeyData.map((point, index) => {
            const StatusIcon = getStatusIcon(point.status);
            const isSelected = selectedPoint?.id === point.id;
            
            return (
              <motion.div
                key={point.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative cursor-pointer ${isSelected ? 'scale-105' : ''}`}
                onClick={() => onPointSelect?.(point)}
              >
                {/* Timeline dot */}
                <div className={`absolute left-6 w-4 h-4 rounded-full border-2 border-white shadow-lg ${
                  point.status === 'completed' ? 'bg-green-500' :
                  point.status === 'current' ? 'bg-blue-500 animate-pulse' :
                  'bg-gray-400'
                } z-10`} />

                {/* Content card */}
                <div className={`ml-16 transition-all duration-300 ${
                  isSelected ? 'ring-2 ring-blue-300' : ''
                }`}>
                  <Card className={`p-4 hover:shadow-md transition-shadow ${
                    isSelected ? 'bg-blue-50' : ''
                  }`}>
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">{getEventIcon(point.event)}</span>
                        <div>
                          <div className="flex items-center space-x-2 mb-1">
                            <h3 className="text-lg font-semibold text-gray-900">
                              {point.event}
                            </h3>
                            <Badge className={getStatusColor(point.status)}>
                              {point.status}
                            </Badge>
                          </div>
                          <div className="flex items-center space-x-4 text-sm text-gray-600">
                            <span className="flex items-center space-x-1">
                              <Clock className="h-4 w-4" />
                              <span>{point.date} • {point.time}</span>
                            </span>
                            <span className="flex items-center space-x-1">
                              <MapPin className="h-4 w-4" />
                              <span>{point.location}</span>
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <StatusIcon className={`h-6 w-6 ${
                        point.status === 'completed' ? 'text-green-600' :
                        point.status === 'current' ? 'text-blue-600' :
                        'text-gray-400'
                      }`} />
                    </div>

                    <p className="text-gray-700 mb-4">
                      {point.description}
                    </p>

                    {/* Environmental conditions */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center space-x-2 bg-gray-50 rounded-lg p-3">
                        <Thermometer className="h-4 w-4 text-red-500" />
                        <div>
                          <p className="text-xs text-gray-600">Temperature</p>
                          <p className="text-sm font-semibold text-gray-900">
                            {point.temperature}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2 bg-gray-50 rounded-lg p-3">
                        <Droplets className="h-4 w-4 text-blue-500" />
                        <div>
                          <p className="text-xs text-gray-600">Humidity</p>
                          <p className="text-sm font-semibold text-gray-900">
                            {point.humidity}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </Card>
  );
}