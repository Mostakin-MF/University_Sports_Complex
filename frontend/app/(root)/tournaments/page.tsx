"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/Card";
import { Trophy, CalendarDays, Users, Filter } from "lucide-react";

// Mock Data
const tournaments = [
  {
    id: 1,
    name: "Inter-Department Football Cup",
    sport: "Football",
    date: "2024-03-15",
    status: "Registration Open",
    teams: 12,
    maxTeams: 16,
  },
  {
    id: 2,
    name: "Summer Badminton Smash",
    sport: "Badminton",
    date: "2024-04-10",
    status: "Planning",
    teams: 0,
    maxTeams: 32,
  },
  {
    id: 3,
    name: "University Cricket League",
    sport: "Cricket",
    date: "2024-02-20",
    status: "Ongoing",
    teams: 8,
    maxTeams: 8,
  },
  {
    id: 4,
    name: "Indoor Table Tennis Championship",
    sport: "Table Tennis",
    date: "2024-05-05",
    status: "Registration Open",
    teams: 5,
    maxTeams: 16,
  },
];

const filters = ["All", "Football", "Cricket", "Badminton", "Table Tennis"];

export default function TournamentsPage() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredTournaments =
    activeFilter === "All"
      ? tournaments
      : tournaments.filter((t) => t.sport === activeFilter);

  return (
    <div className="container mx-auto min-h-screen px-4 py-8">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Tournaments</h1>
          <p className="text-muted-foreground">
            Join and compete in university-wide sports events.
          </p>
        </div>
        <Button>
            <Trophy className="mr-2 h-4 w-4" />
            Create Tournament
        </Button>
      </div>

      <div className="mb-8 flex flex-wrap gap-2">
        {filters.map((filter) => (
          <Button
            key={filter}
            variant={activeFilter === filter ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveFilter(filter)}
            className="rounded-full"
          >
            {filter}
          </Button>
        ))}
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredTournaments.map((tournament) => (
          <Card key={tournament.id} className="flex flex-col">
            <CardHeader>
              <div className="flex items-center justify-between">
                <span
                  className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                    tournament.status === "Registration Open"
                      ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                      : tournament.status === "Ongoing"
                      ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
                      : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                  }`}
                >
                  {tournament.status}
                </span>
                <Trophy className="h-5 w-5 text-muted-foreground" />
              </div>
              <CardTitle className="mt-4">{tournament.name}</CardTitle>
              <CardDescription>{tournament.sport}</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 space-y-4">
              <div className="flex items-center text-sm text-muted-foreground">
                <CalendarDays className="mr-2 h-4 w-4" />
                {tournament.date}
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <Users className="mr-2 h-4 w-4" />
                {tournament.teams} / {tournament.maxTeams} Teams Registered
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" disabled={tournament.status !== "Registration Open"}>
                {tournament.status === "Registration Open" ? "Register Team" : "View Details"}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
