import { LifeBuoy, AlertCircle, Wrench, Shield } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";

export default function SupportPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <LifeBuoy className="h-16 w-16 mx-auto mb-4 text-primary" />
          <h1 className="text-4xl font-bold mb-4">Technical Support</h1>
          <p className="text-xl text-muted-foreground">
            Having trouble with the system? We're here to help you get back on the field.
          </p>
        </div>

        <div className="grid gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center gap-4">
              <AlertCircle className="h-8 w-8 text-primary" />
              <div>
                <CardTitle>Report an Issue</CardTitle>
                <p className="text-sm text-muted-foreground">Found a bug or experiencing technical difficulties?</p>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Please email our technical team at <span className="font-semibold text-foreground">sys-support@university.edu</span> with a description of the issue and your Student/Staff ID.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center gap-4">
              <Wrench className="h-8 w-8 text-primary" />
              <div>
                <CardTitle>System Status</CardTitle>
                <p className="text-sm text-muted-foreground">Check the current availability of our digital services.</p>
              </div>
            </CardHeader>
            <CardContent className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-green-500"></div>
              <span className="font-medium text-green-600">All Systems Operational</span>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center gap-4">
              <Shield className="h-8 w-8 text-primary" />
              <div>
                <CardTitle>Security Concerns</CardTitle>
                <p className="text-sm text-muted-foreground">Report unauthorized access or security vulnerabilities.</p>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Your data security is our priority. If you encounter any suspicious activity, please report it immediately.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
