export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-muted/40 p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="flex flex-col items-center text-center">
             {/* Logo */}
             <div className="h-12 w-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-xl mb-4">
                  S
             </div>
             <h1 className="text-2xl font-bold tracking-tight">SportComplex</h1>
             <p className="text-sm text-muted-foreground">Universal University Sports Complex</p>
        </div>
        
        {children}
      </div>
    </div>
  )
}
