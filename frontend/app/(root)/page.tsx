import Link from "next/link";
import { Button } from "@/components/ui/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { CalendarDays, Trophy, Activity, Users, Clock, ShieldCheck } from "lucide-react";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="relative flex min-h-[80vh] flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-primary/10 to-background px-4 text-center md:px-6">
        <div className="z-10 mx-auto max-w-4xl space-y-6">
          <h1 className="text-4xl font-extrabold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
            Universal University Sports Complex
          </h1>
          <p className="mx-auto max-w-[700px] text-lg text-muted-foreground md:text-xl">
            Experience world-class sports facilities at your fingertips. Book courts, join tournaments, and stay active with our comprehensive management system.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/facilities">
              <Button size="lg" className="h-12 px-8 text-lg">
                Book a Facility
              </Button>
            </Link>
            <Link href="/tournaments">
              <Button variant="outline" size="lg" className="h-12 px-8 text-lg">
                View Tournaments
              </Button>
            </Link>
          </div>
        </div>
        
        {/* Abstract Background Shapes */}
        <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-secondary/20 blur-3xl" />
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-24 md:px-6">
        <h2 className="mb-12 text-center text-3xl font-bold tracking-tight sm:text-4xl">
          Everything you need to play
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CalendarDays className="h-10 w-10 text-primary mb-2" />
              <CardTitle>Seamless Booking</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">
                Book indoor and outdoor facilities instantly. Check real-time availability and secure your spot in seconds.
              </CardDescription>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <Trophy className="h-10 w-10 text-primary mb-2" />
              <CardTitle>Tournament Management</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">
                Join university-wide tournaments, track scores, and view leaderboards. Create your legacy.
              </CardDescription>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <Activity className="h-10 w-10 text-primary mb-2" />
              <CardTitle>Live Updates</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">
                Get real-time notifications for booking confirmations, match schedules, and facility status changes.
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-muted/50 py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3 text-center">
            <div className="flex flex-col items-center gap-2">
              <Users className="h-8 w-8 text-muted-foreground" />
              <h3 className="text-4xl font-bold">5,000+</h3>
              <p className="text-muted-foreground">Active Students</p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <ShieldCheck className="h-8 w-8 text-muted-foreground" />
              <h3 className="text-4xl font-bold">100%</h3>
              <p className="text-muted-foreground">Secure & Monitored</p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Clock className="h-8 w-8 text-muted-foreground" />
              <h3 className="text-4xl font-bold">24/7</h3>
              <p className="text-muted-foreground">Facility Access</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
