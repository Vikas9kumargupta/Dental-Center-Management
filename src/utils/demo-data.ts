import { Patient, Appointment, Service } from '../types';

export const demoPatients: Patient[] = [
  {
    id: '1',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@email.com',
    phone: '1234567890',
    dateOfBirth: '1985-05-10',
    address: '123 Main St, Anytown, ST 12345',
    emergencyContact: 'Jane Doe - +1 (555) 123-4568',
    medicalHistory: 'No significant medical history',
    allergies: 'None known',
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z',
  },
  {
    id: '2',
    firstName: 'Sarah',
    lastName: 'Johnson',
    email: 'sarah.johnson@email.com',
    phone: '+1 (555) 234-5678',
    dateOfBirth: '1990-07-22',
    address: '456 Oak Ave, Somewhere, ST 67890',
    emergencyContact: 'Mike Johnson - +1 (555) 234-5679',
    medicalHistory: 'Hypertension, managed with medication',
    allergies: 'Penicillin',
    createdAt: '2024-01-10T14:30:00Z',
    updatedAt: '2024-01-10T14:30:00Z',
  },
  {
    id: '3',
    firstName: 'Michael',
    lastName: 'Brown',
    email: 'michael.brown@email.com',
    phone: '+1 (555) 345-6789',
    dateOfBirth: '1978-11-08',
    address: '789 Pine Rd, Elsewhere, ST 13579',
    emergencyContact: 'Lisa Brown - +1 (555) 345-6790',
    medicalHistory: 'Diabetes Type 2',
    allergies: 'Latex',
    createdAt: '2024-01-05T09:15:00Z',
    updatedAt: '2024-01-05T09:15:00Z',
  },
];

export const demoServices: Service[] = [
  {
    id: '1',
    name: 'Regular Cleaning',
    description: 'Professional dental cleaning and examination',
    duration: 60,
    price: 125,
    category: 'general',
    isActive: true,
  },
  {
    id: '2',
    name: 'Teeth Whitening',
    description: 'Professional teeth whitening treatment',
    duration: 90,
    price: 350,
    category: 'cosmetic',
    isActive: true,
  },
  {
    id: '3',
    name: 'Dental Filling',
    description: 'Composite or amalgam filling for cavities',
    duration: 45,
    price: 180,
    category: 'general',
    isActive: true,
  },
  {
    id: '4',
    name: 'Root Canal Treatment',
    description: 'Endodontic treatment for infected tooth',
    duration: 120,
    price: 850,
    category: 'general',
    isActive: true,
  },
  {
    id: '5',
    name: 'Dental Crown',
    description: 'Porcelain or metal crown restoration',
    duration: 90,
    price: 1200,
    category: 'general',
    isActive: true,
  },
  {
    id: '6',
    name: 'Orthodontic Consultation',
    description: 'Initial consultation for braces or aligners',
    duration: 45,
    price: 150,
    category: 'orthodontics',
    isActive: true,
  },
];

export const demoAppointments: Appointment[] = [
  {
    id: '1',
    patientId: '1',
    patientName: 'John Doe',
    serviceId: '1',
    serviceName: 'Regular Cleaning',
    date: '2024-02-15',
    time: '09:00',
    status: 'scheduled',
    notes: 'Patient prefers morning appointments',
    createdAt: '2024-01-20T10:00:00Z',
    updatedAt: '2024-01-20T10:00:00Z',
  },
  {
    id: '2',
    patientId: '2',
    patientName: 'Sarah Johnson',
    serviceId: '3',
    serviceName: 'Dental Filling',
    date: '2024-02-16',
    time: '14:30',
    status: 'confirmed',
    notes: 'Filling for upper left molar',
    createdAt: '2024-01-18T15:30:00Z',
    updatedAt: '2024-01-18T15:30:00Z',
  },
];

export const initializeDemoData = (): void => {
  // Initialize demo data if storage is empty
  const existingPatients = localStorage.getItem('dental_patients');
  const existingServices = localStorage.getItem('dental_services');
  const existingAppointments = localStorage.getItem('dental_appointments');

  if (!existingPatients) {
    localStorage.setItem('dental_patients', JSON.stringify(demoPatients));
  }

  if (!existingServices) {
    localStorage.setItem('dental_services', JSON.stringify(demoServices));
  }

  if (!existingAppointments) {
    localStorage.setItem('dental_appointments', JSON.stringify(demoAppointments));
  }
};