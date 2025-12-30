'use client';

import { useEffect, useState } from 'react';
import { facilityService } from '@/lib/services/facilityService';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { MaintenanceModal } from '@/components/ui/MaintenanceModal';
import { HiCog, HiCheckCircle, HiExclamationCircle, HiRefresh } from 'react-icons/hi';

export default function MaintenancePage() {
  const [facilities, setFacilities] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedFacility, setSelectedFacility] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchFacilities = async () => {
    setLoading(true);
    try {
      const data = await facilityService.getAllFacilities();
      setFacilities(data);
    } catch (error) {
      console.error('Error fetching facilities:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFacilities();
  }, []);

  const openMaintenance = (facility: any) => {
    setSelectedFacility(facility);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Facility Maintenance</h1>
          <p className="text-muted-foreground">
            Monitor and update the operational status of sports facilities.
          </p>
        </div>
        <Button variant="outline" onClick={fetchFacilities} className="flex items-center gap-2">
          <HiRefresh className={loading ? 'animate-spin' : ''} /> Refresh Status
        </Button>
      </div>

      <div className="grid gap-6">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
          </div>
        ) : (
          facilities.map((facility) => (
            <Card key={facility.id} className="overflow-hidden border-muted-foreground/10">
              <div className="flex flex-col md:flex-row">
                <div className="w-full md:w-48 h-32 bg-muted shrink-0">
                  {facility.image_url ? (
                    <img src={facility.image_url} alt={facility.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-muted-foreground text-xs uppercase font-bold">No Image</div>
                  )}
                </div>
                <div className="flex-1 p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-bold">{facility.name}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{facility.location_address}</p>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 ${
                      facility.status === 'AVAILABLE' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {facility.status === 'AVAILABLE' ? <HiCheckCircle /> : <HiExclamationCircle />}
                      {facility.status}
                    </div>
                  </div>
                  
                  <div className="mt-6 flex flex-wrap gap-4 items-center justify-between">
                    <div className="flex gap-6 text-sm">
                        <div className="flex flex-col">
                            <span className="text-muted-foreground text-[10px] uppercase font-bold">Last Checkpoint</span>
                            <span className="font-medium">2 days ago</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-muted-foreground text-[10px] uppercase font-bold">Condition</span>
                            <span className="font-medium">Excellent</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-muted-foreground text-[10px] uppercase font-bold">Health Score</span>
                            <span className="font-medium text-green-600">98/100</span>
                        </div>
                    </div>
                    <Button onClick={() => openMaintenance(facility)} className="flex items-center gap-2">
                       <HiCog /> Manage Status
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>

      {selectedFacility && (
        <MaintenanceModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          facility={selectedFacility} 
        />
      )}
    </div>
  );
}
