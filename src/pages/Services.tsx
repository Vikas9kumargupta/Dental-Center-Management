import React, { useState, useEffect } from 'react';
import { DollarSign, Clock, Tag } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { servicesStorage } from '../utils/storage';
import { Service } from '../types';

const categoryColors = {
  general: 'bg-blue-100 text-blue-800',
  cosmetic: 'bg-purple-100 text-purple-800',
  orthodontics: 'bg-green-100 text-green-800',
  surgery: 'bg-red-100 text-red-800',
  emergency: 'bg-orange-100 text-orange-800',
};

export const Services: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    const loadedServices = servicesStorage.getAll();
    setServices(loadedServices);
  }, []);

  const groupedServices = services.reduce((acc, service) => {
    if (!acc[service.category]) {
      acc[service.category] = [];
    }
    acc[service.category].push(service);
    return acc;
  }, {} as Record<string, Service[]>);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Services</h1>
        <p className="text-gray-600">Dental services and treatment options</p>
      </div>

      {/* Services Grid */}
      <div className="space-y-8">
        {Object.entries(groupedServices).map(([category, categoryServices]) => (
          <div key={category}>
            <h2 className="text-xl font-semibold text-gray-900 mb-4 capitalize">
              {category} Services
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categoryServices.map((service) => (
                <Card key={service.id} className="hover:shadow-lg transition-shadow duration-200">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{service.name}</CardTitle>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${categoryColors[service.category]}`}>
                        <Tag className="w-3 h-3 mr-1" />
                        {service.category}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">{service.description}</p>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center text-gray-500">
                        <Clock className="w-4 h-4 mr-1" />
                        {service.duration} min
                      </div>
                      <div className="flex items-center font-semibold text-primary-600">
                        <DollarSign className="w-4 h-4 mr-1" />
                        {service.price}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};