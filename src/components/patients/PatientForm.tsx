import React from 'react';
import { useForm } from 'react-hook-form';
import { Patient } from '../../types';
import { patientsStorage } from '../../utils/storage';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';

interface PatientFormProps {
  patient?: Patient | null;
  onSubmit: () => void;
  onCancel: () => void;
}

interface PatientFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  address: string;
  emergencyContact: string;
  medicalHistory: string;
  allergies: string;
}

export const PatientForm: React.FC<PatientFormProps> = ({
  patient,
  onSubmit,
  onCancel,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PatientFormData>({
    defaultValues: patient ? {
      firstName: patient.firstName,
      lastName: patient.lastName,
      email: patient.email,
      phone: patient.phone,
      dateOfBirth: patient.dateOfBirth,
      address: patient.address,
      emergencyContact: patient.emergencyContact,
      medicalHistory: patient.medicalHistory,
      allergies: patient.allergies,
    } : {},
  });

  const handleFormSubmit = (data: PatientFormData) => {
    const now = new Date().toISOString();
    
    if (patient) {
      // Update existing patient
      patientsStorage.update(patient.id, {
        ...data,
        updatedAt: now,
      });
    } else {
      // Create new patient
      const newPatient: Patient = {
        id: Date.now().toString(),
        ...data,
        createdAt: now,
        updatedAt: now,
      };
      patientsStorage.add(newPatient);
    }

    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="First Name"
          error={errors.firstName?.message}
          {...register('firstName', { required: 'First name is required' })}
        />
        <Input
          label="Last Name"
          error={errors.lastName?.message}
          {...register('lastName', { required: 'Last name is required' })}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          type="email"
          label="Email"
          error={errors.email?.message}
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^\S+@\S+$/i,
              message: 'Invalid email address',
            },
          })}
        />
        <Input
          type="tel"
          label="Phone"
          error={errors.phone?.message}
          {...register('phone', { required: 'Phone number is required' })}
        />
      </div>

      <Input
        type="date"
        label="Date of Birth"
        error={errors.dateOfBirth?.message}
        {...register('dateOfBirth', { required: 'Date of birth is required' })}
      />

      <Input
        label="Address"
        error={errors.address?.message}
        {...register('address', { required: 'Address is required' })}
      />

      <Input
        label="Emergency Contact"
        placeholder="Name and phone number"
        error={errors.emergencyContact?.message}
        {...register('emergencyContact', { required: 'Emergency contact is required' })}
      />

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Medical History
        </label>
        <textarea
          className="block w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm placeholder-gray-400 shadow-sm transition-colors duration-200 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
          rows={3}
          placeholder="Any relevant medical history..."
          {...register('medicalHistory')}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Allergies
        </label>
        <textarea
          className="block w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm placeholder-gray-400 shadow-sm transition-colors duration-200 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
          rows={2}
          placeholder="Any known allergies..."
          {...register('allergies')}
        />
      </div>

      <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          {patient ? 'Update Patient' : 'Add Patient'}
        </Button>
      </div>
    </form>
  );
};