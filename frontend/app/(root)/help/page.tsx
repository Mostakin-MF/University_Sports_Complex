import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { HelpCircle, Search, Book, MessageSquare } from "lucide-react";

export default function HelpPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <HelpCircle className="h-16 w-16 mx-auto mb-4 text-primary" />
          <h1 className="text-4xl font-bold mb-4">Help Center</h1>
          <p className="text-xl text-muted-foreground">
            Everything you need to know about using the Sports Complex Management System.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <Card>
            <CardHeader>
              <Search className="h-6 w-6 text-primary mb-2" />
              <CardTitle>Getting Started</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-muted-foreground">
                <li>• How to create an account</li>
                <li>• Booking your first facility</li>
                <li>• Managing your profile</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Book className="h-6 w-6 text-primary mb-2" />
              <CardTitle>Facility Rules</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Indoor court etiquette</li>
                <li>• Equipment rental policy</li>
                <li>• Safety guidelines</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Trophy className="h-6 w-6 text-primary mb-2" />
              <CardTitle>Tournaments</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Registration process</li>
                <li>• Team eligibility</li>
                <li>• Tournament formats</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <MessageSquare className="h-6 w-6 text-primary mb-2" />
              <CardTitle>FAQs</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Cancellation policy</li>
                <li>• Refund process</li>
                <li>• Guest access</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

import { Trophy } from "lucide-react";
