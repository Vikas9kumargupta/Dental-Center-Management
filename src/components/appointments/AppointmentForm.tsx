import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Appointment, Patient, Service } from '../../types';
import { appointmentsStorage, patientsStorage, servicesStorage } from '../../utils/storage';
import { generateTimeSlots } from '../../utils/date-utils';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Button } from '../ui/Button';

interface AppointmentFormProps {
  appointment?: Appointment | null;
  onSubmit: () => void;
  onCancel: () => void;
}

interface AppointmentFormData {
  patientId: string;
  serviceId: string;
  date: string;
  time: string;
  notes: string;
}

export const AppointmentForm: React.FC<AppointmentFormProps> = ({
  appointment,
  onSubmit,
  onCancel,
}) => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const timeSlots = generateTimeSlots();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<AppointmentFormData>({
    defaultValues: appointment ? {
      patientId: appointment.patientId,
      serviceId: appointment.serviceId,
      date: appointment.date,
      time: appointment.time,
      notes: appointment.notes,
    } : {
      date: new Date().toISOString().split('T')[0], // Today's date
    },
  });

  useEffect(() => {
    setPatients(patientsStorage.getAll());
    setServices(servicesStorage.getAll().filter(s => s.isActive));
  }, []);

  const handleFormSubmit = (data: AppointmentFormData) => {
    const selectedPatient = patients.find(p => p.id === data.patientId);
    const selectedService = services.find(s => s.id === data.serviceId);
    
    if (!selectedPatient || !selectedService) return;

    const now = new Date().toISOString();
    
    if (appointment) {
      // Update existing appointment
      appointmentsStorage.update(appointment.id, {
        ...data,
        patientName: `${selectedPatient.firstName} ${selectedPatient.lastName}`,
        serviceName: selectedService.name,
        updatedAt: now,
      });
    } else {
      // Create new appointment
      const newAppointment: Appointment = {
        id: Date.now().toString(),
        ...data,
        patientName: `${selectedPatient.firstName} ${selectedPatient.lastName}`,
        serviceName: selectedService.name,
        status: 'scheduled',
        createdAt: now,
        updatedAt: now,
      };
      appointmentsStorage.add(newAppointment);
    }

    onSubmit();
  };

  const patientOptions = patients.map(patient => ({
    value: patient.id,
    label: `${patient.firstName} ${patient.lastName}`,
  }));

  const serviceOptions = services.map(service => ({
    value: service.id,
    label: `${service.name} - $${service.price} (${service.duration}min)`,
  }));

  const timeOptions = timeSlots.map(time => ({
    value: time,
    label: new Date(`2000-01-01T${time}`).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    }),
  }));

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      <Select
        label="Patient"
        options={patientOptions}
        placeholder="Select a patient"
        error={errors.patientId?.message}
        {...register('patientId', { required: 'Patient is required' })}
      />

      <Select
        label="Service"
        options={serviceOptions}
        placeholder="Select a service"
        error={errors.serviceId?.message}
        {...register('serviceId', { required: 'Service is required' })}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          type="date"
          label="Date"
          min={new Date().toISOString().split('T')[0]}
          error={errors.date?.message}
          {...register('date', { required: 'Date is required' })}
        />
        <Select
          label="Time"
          options={timeOptions}
          placeholder="Select time"
          error={errors.time?.message}
          {...register('time', { required: 'Time is required' })}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Notes
        </label>
        <textarea
          className="block w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm placeholder-gray-400 shadow-sm transition-colors duration-200 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
          rows={3}
          placeholder="Any additional notes or special instructions..."
          {...register('notes')}
        />
      </div>

      <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          {appointment ? 'Update Appointment' : 'Schedule Appointment'}
        </Button>
      </div>
    </form>
  );
};