'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { bookingService } from '@/lib/services/bookingService';
import { HiUsers, HiChartPie, HiCash, HiShieldCheck } from 'react-icons/hi';

export default function AdminDashboard() {
  const [stats, setStats] = useState({ bookings: 0, revenue: 0, users: 0 });
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const bookings = await bookingService.getAllBookings();
        setStats({
          bookings: bookings.length,
          revenue: bookings.reduce((acc: number, b: any) => acc + (b.totalAmount || 0), 0),
          users: 156, // Mock for now
        });
      } catch (error) {
        console.error("Failed to fetch admin stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Admin Console</h1>
        <p className="text-muted-foreground">
          System-wide overview and administrative controls.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <div className="bg-card p-6 rounded-xl border shadow-sm flex items-center gap-4">
          <div className="p-3 bg-blue-100 text-blue-600 rounded-lg"><HiUsers className="text-2xl" /></div>
          <div>
            <div className="text-sm text-muted-foreground">Total Users</div>
            <div className="text-2xl font-bold">{stats.users}</div>
          </div>
        </div>
        <div className="bg-card p-6 rounded-xl border shadow-sm flex items-center gap-4">
          <div className="p-3 bg-green-100 text-green-600 rounded-lg"><HiChartPie className="text-2xl" /></div>
          <div>
            <div className="text-sm text-muted-foreground">Total Bookings</div>
            <div className="text-2xl font-bold">{stats.bookings}</div>
          </div>
        </div>
        <div className="bg-card p-6 rounded-xl border shadow-sm flex items-center gap-4">
          <div className="p-3 bg-yellow-100 text-yellow-600 rounded-lg"><HiCash className="text-2xl" /></div>
          <div>
            <div className="text-sm text-muted-foreground">Revenue</div>
            <div className="text-2xl font-bold">${stats.revenue}</div>
          </div>
        </div>
        <div className="bg-card p-6 rounded-xl border shadow-sm flex items-center gap-4">
          <div className="p-3 bg-purple-100 text-purple-600 rounded-lg"><HiShieldCheck className="text-2xl" /></div>
          <div>
            <div className="text-sm text-muted-foreground">System Health</div>
            <div className="text-2xl font-bold">100%</div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <section className="bg-card border rounded-xl p-6">
          <h2 className="font-semibold mb-4">Recent System Logs</h2>
          <div className="space-y-3">
             {[1,2,3].map(i => (
               <div key={i} className="flex justify-between text-sm py-2 border-b last:border-0">
                 <span className="text-muted-foreground">New User Registered: student_{i}@aiub.edu</span>
                 <span className="text-xs">2 mins ago</span>
               </div>
             ))}
          </div>
        </section>
        <section className="bg-card border rounded-xl p-6">
          <h2 className="font-semibold mb-4">Pending Approvals</h2>
           <div className="bg-muted/30 rounded-lg p-8 text-center border-2 border-dashed">
              <p className="text-sm text-muted-foreground">No pending user approvals at this time.</p>
           </div>
        </section>
      </div>
    </div>
  );
}
