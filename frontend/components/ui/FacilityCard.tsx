import { Facility } from '@/lib/mockData';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from './Card';
import { Button } from './Button';
import Link from 'next/link';

interface FacilityCardProps {
  facility: Facility;
}

export function FacilityCard({ facility }: FacilityCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col h-full">
      <div className="relative h-48 w-full overflow-hidden">
        <img
          src={facility.image}
          alt={facility.name}
          className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
        />
        <div className="absolute top-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded-full uppercase font-semibold">
          {facility.type}
        </div>
      </div>
      
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl line-clamp-1">{facility.name}</CardTitle>
          <span className="text-primary font-bold whitespace-nowrap">${facility.pricePerHour}/hr</span>
        </div>
        <CardDescription className="line-clamp-2">{facility.description}</CardDescription>
      </CardHeader>
      
      <CardContent className="flex-grow text-sm text-muted-foreground">
        <div className="flex items-center gap-2 mb-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          {facility.location}
        </div>
        <div className="flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          Capacity: {facility.capacity}
        </div>
      </CardContent>

      <CardFooter>
        <Link href={`/facilities/${facility.id}`} className="w-full">
          <Button className="w-full" variant="secondary">View Details & Book</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
