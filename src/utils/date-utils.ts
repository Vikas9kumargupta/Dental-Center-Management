import { format, isToday, isSameMonth, parseISO, addDays, startOfWeek, endOfWeek } from 'date-fns';

export const formatDate = (date: string | Date): string => {
  const parsedDate = typeof date === 'string' ? parseISO(date) : date;
  return format(parsedDate, 'MMM dd, yyyy');
};

export const formatTime = (time: string): string => {
  const [hours, minutes] = time.split(':');
  const hour = parseInt(hours);
  const ampm = hour >= 12 ? 'PM' : 'AM';
  const displayHour = hour % 12 || 12;
  return `${displayHour}:${minutes} ${ampm}`;
};

export const formatDateTime = (date: string, time: string): string => {
  return `${formatDate(date)} at ${formatTime(time)}`;
};

export const isAppointmentToday = (date: string): boolean => {
  return isToday(parseISO(date));
};

export const isAppointmentThisMonth = (date: string): boolean => {
  return isSameMonth(parseISO(date), new Date());
};

export const generateTimeSlots = (): string[] => {
  const slots: string[] = [];
  const startHour = 8; // 8 AM
  const endHour = 18; // 6 PM
  
  for (let hour = startHour; hour < endHour; hour++) {
    slots.push(`${hour.toString().padStart(2, '0')}:00`);
    slots.push(`${hour.toString().padStart(2, '0')}:30`);
  }
  
  return slots;
};

export const getWeekDays = (startDate: Date = new Date()): Date[] => {
  const start = startOfWeek(startDate, { weekStartsOn: 1 }); // Monday
  const days: Date[] = [];
  
  for (let i = 0; i < 7; i++) {
    days.push(addDays(start, i));
  }
  
  return days;
};