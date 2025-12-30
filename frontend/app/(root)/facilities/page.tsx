'use client';

import { useState } from 'react';
import { facilities } from '@/lib/mockData';
import { FacilityCard } from '@/components/ui/FacilityCard';
import { Button } from '@/components/ui/Button';

export default function FacilitiesPage() {
  const [filter, setFilter] = useState<'ALL' | 'INDOOR' | 'OUTDOOR'>('ALL');

  const filteredFacilities = facilities.filter(facility => {
    if (filter === 'ALL') return true;
    return facility.type === filter;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2">Our Facilities</h1>
          <p className="text-muted-foreground">
            Browse and book our world-class sports facilities.
          </p>
        </div>
        
        <div className="flex gap-2">
          <Button 
            variant={filter === 'ALL' ? 'default' : 'outline'} 
            onClick={() => setFilter('ALL')}
          >
            All
          </Button>
          <Button 
            variant={filter === 'INDOOR' ? 'default' : 'outline'} 
            onClick={() => setFilter('INDOOR')}
          >
            Indoor
          </Button>
          <Button 
            variant={filter === 'OUTDOOR' ? 'default' : 'outline'} 
            onClick={() => setFilter('OUTDOOR')}
          >
            Outdoor
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredFacilities.map((facility) => (
          <FacilityCard key={facility.id} facility={facility} />
        ))}
      </div>

      {filteredFacilities.length === 0 && (
        <div className="text-center py-12">
          <p className="text-xl text-muted-foreground">No facilities found matching your filter.</p>
          <Button 
            variant="link" 
            onClick={() => setFilter('ALL')}
            className="mt-2"
          >
            Clear Filter
          </Button>
        </div>
      )}
    </div>
  );
}
