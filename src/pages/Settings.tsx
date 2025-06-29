import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { useAuth } from '../hooks/useAuth';

export const Settings: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600">Manage your account and application preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Profile Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Input
                label="First Name"
                value={user?.firstName || ''}
                readOnly
              />
              <Input
                label="Last Name"
                value={user?.lastName || ''}
                readOnly
              />
              <Input
                label="Email"
                value={user?.email || ''}
                readOnly
              />
              <Input
                label="Role"
                value={user?.role || ''}
                readOnly
                className="capitalize"
              />
              <Button variant="outline" disabled>
                Edit Profile (Demo Mode)
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Application Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Application Settings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-2">Notifications</h4>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded" defaultChecked />
                    <span className="ml-2 text-sm text-gray-700">Email notifications</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded" defaultChecked />
                    <span className="ml-2 text-sm text-gray-700">Appointment reminders</span>
                  </label>
                </div>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-2">Time Zone</h4>
                <Input value="UTC-5 (Eastern Standard Time)" readOnly />
              </div>
              <Button variant="outline" disabled>
                Save Settings (Demo Mode)
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* System Information */}
      <Card>
        <CardHeader>
          <CardTitle>System Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <p className="font-medium text-gray-900">Version</p>
              <p className="text-gray-600">1.0.0</p>
            </div>
            <div>
              <p className="font-medium text-gray-900">Last Updated</p>
              <p className="text-gray-600">January 2024</p>
            </div>
            <div>
              <p className="font-medium text-gray-900">Support</p>
              <p className="text-gray-600">support@dentalcare.com</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};