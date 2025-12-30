export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">SportComplex</h3>
            <p className="text-sm text-muted-foreground">
              Universal University Sports Complex Management System.
              Streamlining sports for everyone.
            </p>
          </div>
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="/facilities" className="hover:text-primary">
                  Facilities
                </a>
              </li>
              <li>
                <a href="/tournaments" className="hover:text-primary">
                  Tournaments
                </a>
              </li>
              <li>
                <a href="/about" className="hover:text-primary">
                  About Us
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider">
              Support
            </h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="/help" className="hover:text-primary">
                  Help Center
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:text-primary">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="/terms" className="hover:text-primary">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
          <div>
             <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider">
              Contact
            </h4>
             <ul className="space-y-2 text-sm text-muted-foreground">
              <li>University Campus</li>
              <li>Dhaka, Bangladesh</li>
              <li>sports@university.edu</li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} University Sports Complex. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
