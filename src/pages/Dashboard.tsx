import React, { useEffect, useState } from 'react';
import { Users, Calendar, DollarSign, Activity, Plus, Eye } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../components/ui/Table';
import { patientsStorage, appointmentsStorage } from '../utils/storage';
import { formatDate, formatTime, isAppointmentToday } from '../utils/date-utils';
import { Patient, Appointment, DashboardStats } from '../types';
import { useNavigate } from 'react-router-dom';

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState<DashboardStats>({
    totalPatients: 0,
    todayAppointments: 0,
    monthlyRevenue: 0,
    completedTreatments: 0,
    upcomingAppointments: [],
    recentPatients: [],
  });

  useEffect(() => {
    const loadDashboardData = () => {
      const patients = patientsStorage.getAll();
      const appointments = appointmentsStorage.getAll();

      const todayAppointments = appointments.filter(apt => isAppointmentToday(apt.date));
      const completedAppointments = appointments.filter(apt => apt.status === 'completed');
      const upcomingAppointments = appointments
        .filter(apt => apt.status === 'scheduled' || apt.status === 'confirmed')
        .sort((a, b) => new Date(a.date + ' ' + a.time).getTime() - new Date(b.date + ' ' + b.time).getTime())
        .slice(0, 5);

      // Calculate monthly revenue (demo calculation)
      const monthlyRevenue = completedAppointments.length * 200; // Average $200 per appointment

      const recentPatients = patients
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .slice(0, 5);

      setStats({
        totalPatients: patients.length,
        todayAppointments: todayAppointments.length,
        monthlyRevenue,
        completedTreatments: completedAppointments.length,
        upcomingAppointments,
        recentPatients,
      });
    };

    loadDashboardData();
  }, []);

  const statCards = [
    {
      title: 'Total Patients',
      value: stats.totalPatients,
      icon: Users,
      color: 'text-primary-600',
      bgColor: 'bg-primary-50',
    },
    {
      title: "Today's Appointments",
      value: stats.todayAppointments,
      icon: Calendar,
      color: 'text-secondary-600',
      bgColor: 'bg-secondary-50',
    },
    {
      title: 'Monthly Revenue',
      value: `$${stats.monthlyRevenue.toLocaleString()}`,
      icon: DollarSign,
      color: 'text-success-600',
      bgColor: 'bg-success-50',
    },
    {
      title: 'Completed Treatments',
      value: stats.completedTreatments,
      icon: Activity,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Overview of your dental practice</p>
        </div>
        <div className="flex space-x-3">
          <Button
            variant="outline"
            icon={Calendar}
            onClick={() => navigate('/appointments')}
          >
            View Calendar
          </Button>
          <Button
            icon={Plus}
            onClick={() => navigate('/appointments?new=true')}
          >
            New Appointment
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow duration-200">
            <CardContent className="flex items-center p-6">
              <div className={`${stat.bgColor} rounded-lg p-3 mr-4`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Appointments */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Upcoming Appointments</CardTitle>
              <Button
                variant="outline"
                size="sm"
                icon={Eye}
                onClick={() => navigate('/appointments')}
              >
                View All
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {stats.upcomingAppointments.length > 0 ? (
              <div className="space-y-4">
                {stats.upcomingAppointments.map((appointment) => (
                  <div
                    key={appointment.id}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                    onClick={() => navigate(`/appointments/${appointment.id}`)}
                  >
                    <div>
                      <p className="font-medium text-gray-900">
                        {appointment.patientName}
                      </p>
                      <p className="text-sm text-gray-600">
                        {appointment.serviceName}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">
                        {formatDate(appointment.date)}
                      </p>
                      <p className="text-sm text-gray-600">
                        {formatTime(appointment.time)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">No upcoming appointments</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Patients */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Recent Patients</CardTitle>
              <Button
                variant="outline"
                size="sm"
                icon={Eye}
                onClick={() => navigate('/patients')}
              >
                View All
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {stats.recentPatients.length > 0 ? (
              <div className="space-y-4">
                {stats.recentPatients.map((patient) => (
                  <div
                    key={patient.id}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                    onClick={() => navigate(`/patients/${patient.id}`)}
                  >
                    <div>
                      <p className="font-medium text-gray-900">
                        {patient.firstName} {patient.lastName}
                      </p>
                      <p className="text-sm text-gray-600">
                        {patient.email}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">
                        {formatDate(patient.createdAt)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Users className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">No patients registered</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};