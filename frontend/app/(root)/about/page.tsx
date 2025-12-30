import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="mx-auto max-w-4xl space-y-12">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">About USCS</h1>
          <p className="text-xl text-muted-foreground">
            Universal University Sports Complex Management System
          </p>
        </div>

        {/* Project Goal */}
        <section className="space-y-4">
          <h2 className="text-3xl font-bold">Our Goal</h2>
          <p className="text-lg leading-relaxed text-muted-foreground">
            The Universal University Sports Complex Management System is a comprehensive, modern web application designed to streamline facility booking, provide transparent information, and optimize facility utilization for our University.
          </p>
        </section>

        {/* Mission & Vision */}
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Mission</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                To reduce manual administrative overhead by 80%, provide an intuitive booking interface for students, and ensure secure, role-based access to all sports facilities.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Vision</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                To create a vibrant, active campus community where every student has fair and easy access to world-class sports facilities, fostering a culture of health and wellness.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Credits */}
        <section className="rounded-xl bg-muted/50 p-8 text-center">
          <h3 className="mb-4 text-2xl font-bold">Developed By</h3>
          <p className="text-lg font-medium">Department of Computer Science</p>
          <p className="text-muted-foreground">University Sports Management</p>
          <p className="mt-2 text-sm text-muted-foreground">Version: 1.0.0</p>
        </section>
      </div>
    </div>
  );
}
