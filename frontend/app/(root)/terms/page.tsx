import { FileText } from "lucide-react";

export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto prose prose-neutral dark:prose-invert">
        <div className="text-center mb-12 not-prose">
          <FileText className="h-16 w-16 mx-auto mb-4 text-primary" />
          <h1 className="text-4xl font-bold mb-4">Terms of Service</h1>
          <p className="text-xl text-muted-foreground">
            Please read these terms carefully before using our services.
          </p>
        </div>

        <section>
          <h2>1. Acceptance of Terms</h2>
          <p>
            By accessing and using the Universal University Sports Complex Management System, you agree to be bound by these Terms of Service and all applicable laws and regulations.
          </p>
        </section>

        <section>
          <h2>2. Facility Usage</h2>
          <p>
            Users must respect all facility rules, equipment, and staff. Bookings are subject to availability and must be made through the official system.
          </p>
          <ul>
            <li>Valid university ID required for access.</li>
            <li>Proper sports attire must be worn at all times.</li>
            <li>Safety guidelines must be strictly followed.</li>
          </ul>
        </section>

        <section>
          <h2>3. Booking & Cancellations</h2>
          <p>
            Cancellations must be made at least 4 hours in advance. Failure to show up for a booked slot may result in a temporary suspension of booking privileges.
          </p>
        </section>

        <section>
          <h2>4. Conduct</h2>
          <p>
            Unsportsmanlike conduct, harassment, or damage to property will not be tolerated and may lead to permanent banning from the facilities.
          </p>
        </section>

        <section className="mt-12 text-sm text-muted-foreground not-prose">
          Last updated: December 30, 2024
        </section>
      </div>
    </div>
  );
}
