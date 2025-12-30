'use client';

import { useAuth } from '@/context/AuthContext';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { HiUser, HiMail, HiIdentification, HiPhone, HiLockClosed } from 'react-icons/hi';

export default function SettingsPage() {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">
          Manage your account preferences and profile information.
        </p>
      </div>

      <div className="grid gap-8">
        {/* Profile Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HiUser className="text-primary" /> Profile Information
            </CardTitle>
            <CardDescription>
              Update your personal details shown on your profile.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Full Name</label>
                <Input defaultValue={user.full_name} placeholder="John Doe" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Email Address</label>
                <Input defaultValue={user.email} disabled />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  {user.role === 'STUDENT' ? 'Student ID' : 'Employee ID'}
                </label>
                <Input 
                  defaultValue={user.student_id || ''} 
                  placeholder={user.role === 'STUDENT' ? 'XX-XXXXX-X' : 'EMP-XXXX'} 
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Phone Number</label>
                <Input defaultValue={user.phone_number || ''} placeholder="017XXXXXXXX" />
              </div>
            </div>
          </CardContent>
          <CardFooter className="bg-muted/30 flex justify-end">
            <Button>Save Changes</Button>
          </CardFooter>
        </Card>

        {/* Security Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HiLockClosed className="text-primary" /> Security
            </CardTitle>
            <CardDescription>
              Update your password to keep your account secure.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Current Password</label>
                <Input type="password" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">New Password</label>
                <Input type="password" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Confirm New Password</label>
                <Input type="password" />
              </div>
            </div>
          </CardContent>
          <CardFooter className="bg-muted/30 flex justify-end">
            <Button variant="outline">Update Password</Button>
          </CardFooter>
        </Card>

        {/* Account Status */}
        <Card className="border-destructive/20">
          <CardHeader>
            <CardTitle className="text-destructive flex items-center gap-2">
              Danger Zone
            </CardTitle>
            <CardDescription>
              Permanently delete your account and all associated data.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Once you delete your account, there is no going back. Please be certain.
            </p>
          </CardContent>
          <CardFooter className="bg-destructive/5 flex justify-end">
            <Button variant="outline" className="text-destructive border-destructive/20 hover:bg-destructive hover:text-white transition-colors">
              Delete Account
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
