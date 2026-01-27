export function BrandLogo() {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
        <svg
          viewBox="0 0 40 40"
          className="w-6 h-6 text-primary-foreground"
          fill="currentColor"
        >
          <path d="M12 8L12 32M28 8L28 32M12 8L20 16L28 8M12 32L20 24L28 32M16 12L24 12M16 28L24 28" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
      <span className="text-lg font-bold text-foreground">Tailark</span>
    </div>
  )
}
