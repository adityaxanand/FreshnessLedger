'use client';

import { useState, useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  MapPin, 
  Truck, 
  Clock, 
  Thermometer,
  Droplets,
  CheckCircle,
  Navigation
} from 'lucide-react';

// Mock map component since we can't use actual Mapbox in this environment
export type JourneyPoint = {
  id: string | number;
  event: string;
  status: 'completed' | 'current' | 'pending' | string;
  location: string;
  date: string;
  time: string;
  description?: string;
  temperature?: string | number;
  humidity?: string | number;
};

type MapSupplyChainProps = {
  journeyData: JourneyPoint[];
  onPointSelect?: (point: JourneyPoint) => void;
};

export function MapSupplyChain({ journeyData, onPointSelect }: MapSupplyChainProps) {
  const [selectedPoint, setSelectedPoint] = useState<JourneyPoint | null>(null);
  const mapRef = useRef(null);

  const handlePointClick = (point: JourneyPoint) => {
    setSelectedPoint(point);
    onPointSelect?.(point);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500';
      case 'current':
        return 'bg-blue-500 animate-pulse';
      case 'pending':
        return 'bg-gray-400';
      default:
        return 'bg-gray-400';
    }
  };

  const getStatusIcon = (event: string) => {
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
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Map Area */}
      <div className="lg:col-span-2">
        <Card className="p-0 overflow-hidden h-[600px]">
          <div 
            ref={mapRef}
            className="w-full h-full bg-gradient-to-br from-green-100 via-blue-50 to-purple-100 relative"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23e5e7eb' fill-opacity='0.3'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
            }}
          >
            {/* California outline (simplified) */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-full h-full max-w-md max-h-md">
                <svg
                  viewBox="0 0 400 600"
                  className="w-full h-full opacity-20"
                  fill="none"
                  stroke="#059669"
                  strokeWidth="2"
                >
                  <path d="M100 50 L120 100 L110 200 L130 300 L140 400 L135 500 L120 550 L100 580 L80 550 L60 500 L50 400 L40 300 L30 200 L40 100 L60 50 Z" />
                </svg>
                
                {/* Journey points */}
                {journeyData.map((point, index) => {
                  const x = 80 + (index * 60); // Distribute horizontally
                  const y = 100 + (index * 80); // Distribute vertically
                  
                  return (
                    <div key={point.id}>
                      {/* Connection line to next point */}
                      {index < journeyData.length - 1 && (
                        <div
                          className="absolute w-0.5 bg-green-400 opacity-60"
                          style={{
                            left: `${x + 12}px`,
                            top: `${y + 24}px`,
                            height: '80px',
                            transform: 'rotate(45deg)',
                            transformOrigin: 'top'
                          }}
                        />
                      )}
                      
                      {/* Journey point */}
                      <button
                        onClick={() => handlePointClick(point)}
                        className={`absolute w-6 h-6 rounded-full border-2 border-white shadow-lg cursor-pointer hover:scale-110 transition-transform ${getStatusColor(point.status)}`}
                        style={{
                          left: `${x}px`,
                          top: `${y}px`
                        }}
                      >
                        <span className="absolute -top-8 -left-4 text-sm">
                          {getStatusIcon(point.event)}
                        </span>
                      </button>
                      
                      {/* Point label */}
                      <div
                        className="absolute text-xs font-medium text-gray-700 whitespace-nowrap"
                        style={{
                          left: `${x + 30}px`,
                          top: `${y - 5}px`
                        }}
                      >
                        {point.location.split(',')[0]}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            
            {/* Legend */}
            <div className="absolute bottom-4 left-4 bg-white rounded-lg p-3 shadow-lg">
              <h4 className="font-semibold text-gray-900 mb-2 text-sm">Legend</h4>
              <div className="space-y-1 text-xs">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-gray-600">Completed</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                  <span className="text-gray-600">Current</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                  <span className="text-gray-600">Pending</span>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Sidebar */}
      <div className="space-y-4">
        <Card className="p-4">
          <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
            <Navigation className="h-5 w-5 mr-2 text-blue-600" />
            Journey Overview
          </h3>
          <div className="space-y-3">
            {journeyData.map((point, index) => (
              <button
                key={point.id}
                onClick={() => handlePointClick(point)}
                className={`w-full text-left p-3 rounded-lg transition-colors hover:bg-gray-50 ${
                  selectedPoint?.id === point.id ? 'bg-blue-50 border-2 border-blue-200' : 'bg-gray-50'
                }`}
              >
                <div className="flex items-start space-x-3">
                  <div className={`w-3 h-3 rounded-full mt-1 ${getStatusColor(point.status)}`} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="text-sm">{getStatusIcon(point.event)}</span>
                      <Badge variant="outline" className="text-xs">
                        {point.event}
                      </Badge>
                    </div>
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {point.location.split(',')[0]}
                    </p>
                    <p className="text-xs text-gray-500">
                      {point.date} • {point.time}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </Card>

        {selectedPoint && (
          <Card className="p-4">
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
              <MapPin className="h-5 w-5 mr-2 text-green-600" />
              Location Details
            </h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm font-medium text-gray-900 mb-1">
                  {selectedPoint.event}
                </p>
                <p className="text-sm text-gray-600">
                  {selectedPoint.description}
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="flex items-center space-x-2 mb-1">
                    <Thermometer className="h-4 w-4 text-red-500" />
                    <span className="text-xs text-gray-600">Temperature</span>
                  </div>
                  <p className="text-sm font-semibold text-gray-900">
                    {selectedPoint.temperature}
                  </p>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="flex items-center space-x-2 mb-1">
                    <Droplets className="h-4 w-4 text-blue-500" />
                    <span className="text-xs text-gray-600">Humidity</span>
                  </div>
                  <p className="text-sm font-semibold text-gray-900">
                    {selectedPoint.humidity}
                  </p>
                </div>
              </div>
              
              <div className="bg-green-50 rounded-lg p-3">
                <div className="flex items-center space-x-2 mb-1">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-xs text-green-800">Status</span>
                </div>
                <p className="text-sm font-semibold text-green-900 capitalize">
                  {selectedPoint.status}
                </p>
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}