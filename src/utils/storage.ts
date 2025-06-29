import { Patient, Appointment, Service, User } from '../types';

const STORAGE_KEYS = {
  PATIENTS: 'dental_patients',
  APPOINTMENTS: 'dental_appointments',
  SERVICES: 'dental_services',
  USER: 'dental_user',
} as const;

// Generic storage utilities
export const storage = {
  get: <T>(key: string): T[] => {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  set: <T>(key: string, data: T[]): void => {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
      console.error('Failed to save to localStorage:', error);
    }
  },

  getSingle: <T>(key: string): T | null => {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  },

  setSingle: <T>(key: string, data: T): void => {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
      console.error('Failed to save to localStorage:', error);
    }
  },
};

// Specific storage functions
export const patientsStorage = {
  getAll: (): Patient[] => storage.get<Patient>(STORAGE_KEYS.PATIENTS),
  save: (patients: Patient[]): void => storage.set(STORAGE_KEYS.PATIENTS, patients),
  add: (patient: Patient): void => {
    const patients = patientsStorage.getAll();
    patients.push(patient);
    patientsStorage.save(patients);
  },
  update: (id: string, updates: Partial<Patient>): void => {
    const patients = patientsStorage.getAll();
    const index = patients.findIndex(p => p.id === id);
    if (index !== -1) {
      patients[index] = { ...patients[index], ...updates, updatedAt: new Date().toISOString() };
      patientsStorage.save(patients);
    }
  },
  delete: (id: string): void => {
    const patients = patientsStorage.getAll().filter(p => p.id !== id);
    patientsStorage.save(patients);
  },
};

export const appointmentsStorage = {
  getAll: (): Appointment[] => storage.get<Appointment>(STORAGE_KEYS.APPOINTMENTS),
  save: (appointments: Appointment[]): void => storage.set(STORAGE_KEYS.APPOINTMENTS, appointments),
  add: (appointment: Appointment): void => {
    const appointments = appointmentsStorage.getAll();
    appointments.push(appointment);
    appointmentsStorage.save(appointments);
  },
  update: (id: string, updates: Partial<Appointment>): void => {
    const appointments = appointmentsStorage.getAll();
    const index = appointments.findIndex(a => a.id === id);
    if (index !== -1) {
      appointments[index] = { ...appointments[index], ...updates, updatedAt: new Date().toISOString() };
      appointmentsStorage.save(appointments);
    }
  },
  delete: (id: string): void => {
    const appointments = appointmentsStorage.getAll().filter(a => a.id !== id);
    appointmentsStorage.save(appointments);
  },
};

export const servicesStorage = {
  getAll: (): Service[] => storage.get<Service>(STORAGE_KEYS.SERVICES),
  save: (services: Service[]): void => storage.set(STORAGE_KEYS.SERVICES, services),
};

export const userStorage = {
  get: (): User | null => storage.getSingle<User>(STORAGE_KEYS.USER),
  set: (user: User): void => storage.setSingle(STORAGE_KEYS.USER, user),
  clear: (): void => localStorage.removeItem(STORAGE_KEYS.USER),
};