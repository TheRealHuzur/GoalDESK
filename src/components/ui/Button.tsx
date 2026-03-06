
type Variant = 'primary' | 'secondary' | 'ghost' | 'danger';
type Size = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  children: React.ReactNode;
}

const variantClasses: Record<Variant, string> = {
  primary:
    'bg-desk-accent-2 text-white hover:brightness-110 font-medium',
  secondary:
    'bg-transparent text-desk-text border border-desk-border hover:border-desk-teal hover:text-desk-teal font-medium',
  ghost:
    'bg-transparent text-desk-text-muted hover:text-desk-text hover:bg-desk-bg-3 font-medium',
  danger:
    'bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/30 font-medium',
};

const sizeClasses: Record<Size, string> = {
  sm: 'px-3 py-1.5 text-[13.5px] rounded-md',
  md: 'px-4 py-2 text-[13.5px] rounded-[8px]',
  lg: 'px-6 py-3 text-base rounded-xl',
};

export function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled,
  children,
  className = '',
  ...props
}: ButtonProps) {
  return (
    <button
      disabled={disabled || loading}
      className={[
        'inline-flex items-center justify-center gap-2 transition-colors transition-all duration-200',
        'focus:outline-none focus:ring-2 focus:ring-desk-sky/50',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        variantClasses[variant],
        sizeClasses[size],
        className,
      ].join(' ')}
      {...props}
    >
      {loading && (
        <svg
          className="animate-spin h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
          />
        </svg>
      )}
      {children}
    </button>
  );
}
