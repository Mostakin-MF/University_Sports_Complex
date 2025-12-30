'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { facilityService } from '@/lib/services/facilityService';
import { HiPlus, HiCog } from 'react-icons/hi';

export default function StaffDashboard() {
  const [facilities, setFacilities] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchFacilities = async () => {
      try {
        const data = await facilityService.getAllFacilities();
        setFacilities(data);
      } catch (error) {
        console.error("Failed to fetch facilities:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFacilities();
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Staff Dashboard</h1>
        <p className="text-muted-foreground">
          Management portal for {user?.name}. Manage slots and maintenance schedules.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="col-span-2 space-y-6">
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Facilities Overview</h2>
              <button className="flex items-center gap-2 px-3 py-1 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 transition-colors">
                <HiPlus /> Add Facility
              </button>
            </div>
            
            {loading ? (
              <p>Loading facilities...</p>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2">
                {facilities.map((facility: any) => (
                  <div key={facility.id} className="border rounded-xl p-4 bg-card hover:shadow-md transition-shadow">
                    <h3 className="font-bold">{facility.name}</h3>
                    <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{facility.description}</p>
                    <div className="mt-4 flex gap-2">
                        <button className="flex-1 py-1.5 text-xs border rounded-md hover:bg-muted transition-colors">Manage Slots</button>
                        <button className="flex-1 py-1.5 text-xs border rounded-md hover:bg-muted transition-colors flex items-center justify-center gap-1">
                          <HiCog /> Maintenance
                        </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>

        <div className="space-y-6">
          <section className="bg-muted/50 rounded-xl p-6">
             <h2 className="font-semibold mb-4">Staff Tasks</h2>
             <div className="space-y-4">
                <div className="bg-card p-4 rounded-lg shadow-sm border-l-4 border-yellow-500">
                  <div className="text-sm font-medium">Verify Equipment</div>
                  <div className="text-xs text-muted-foreground mt-1">Basketball Court A - 4:00 PM</div>
                </div>
                 <div className="bg-card p-4 rounded-lg shadow-sm border-l-4 border-blue-500">
                  <div className="text-sm font-medium">Update Tournament Brackets</div>
                  <div className="text-xs text-muted-foreground mt-1">Inter-Departmental Football</div>
                </div>
             </div>
          </section>
        </div>
      </div>
    </div>
  );
}
