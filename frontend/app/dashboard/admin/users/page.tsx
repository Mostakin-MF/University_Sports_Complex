'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { HiSearch, HiUserAdd, HiCheckCircle, HiXCircle, HiDotsVertical } from 'react-icons/hi';

import { AddUserModal } from '@/components/ui/AddUserModal';

// Mock data for user management
const mockUsers = [
  { id: '1', full_name: 'Admin User', email: 'admin@university.edu', role: 'ADMIN', status: 'ACTIVE', student_id: null },
  { id: '2', full_name: 'Staff Member', email: 'staff@university.edu', role: 'STAFF', status: 'ACTIVE', student_id: null },
  { id: '3', full_name: 'Student One', email: 'student@university.edu', role: 'STUDENT', status: 'ACTIVE', student_id: '20-42000-1' },
  { id: '4', full_name: 'Student Two', email: 'jane@university.edu', role: 'STUDENT', status: 'PENDING', student_id: '21-44000-2' },
];

export default function UserManagementPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState(mockUsers);
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);

  const filteredUsers = users.filter(user => 
    user.full_name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">User Management</h1>
          <p className="text-muted-foreground">
            Manage university students, staff, and administrators.
          </p>
        </div>
        <Button className="flex items-center gap-2" onClick={() => setIsAddUserOpen(true)}>
          <HiUserAdd /> Add New User
        </Button>
      </div>

      <AddUserModal 
        isOpen={isAddUserOpen} 
        onClose={() => setIsAddUserOpen(false)} 
        onSuccess={() => {
          // Toast or refresh data here
          console.log('User created successfully');
        }}
      />

      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <HiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input 
                placeholder="Search users by name or email..." 
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
               <Button variant="outline" size="sm">Filter</Button>
               <Button variant="outline" size="sm">Export</Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs uppercase bg-muted/50 text-muted-foreground">
                <tr>
                  <th className="px-6 py-3 font-semibold">User</th>
                  <th className="px-6 py-3 font-semibold">Role</th>
                  <th className="px-6 py-3 font-semibold">Status</th>
                  <th className="px-6 py-3 font-semibold">Student / Employee ID</th>
                  <th className="px-6 py-3 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-muted/30 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="font-semibold">{user.full_name}</span>
                        <span className="text-xs text-muted-foreground">{user.email}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        user.role === 'ADMIN' ? 'bg-purple-100 text-purple-700' :
                        user.role === 'STAFF' ? 'bg-blue-100 text-blue-700' :
                        'bg-orange-100 text-orange-700'
                      }`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1.5">
                        {user.status === 'ACTIVE' ? (
                          <HiCheckCircle className="text-green-500" />
                        ) : (
                          <HiXCircle className="text-yellow-500" />
                        )}
                        <span>{user.status}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-mono text-xs">
                      {user.student_id || 'N/A'}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Button variant="ghost" size="icon">
                        <HiDotsVertical />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
