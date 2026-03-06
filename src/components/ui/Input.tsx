
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export function Input({ label, error, id, className = '', ...props }: InputProps) {
  const inputId = id ?? label?.toLowerCase().replace(/\s+/g, '-');
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label htmlFor={inputId} className="text-[12px] font-semibold tracking-widest uppercase text-desk-text-muted">
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={[
          'bg-desk-input-bg border border-desk-border rounded-[8px] px-3 py-2 text-desk-text',
          'placeholder:text-desk-text-muted text-[13.5px]',
          'focus:outline-none focus:border-desk-teal focus:shadow-[0_0_0_3px_rgba(14,151,173,0.12)]',
          'transition-all duration-200',
          error ? 'border-red-500' : '',
          className,
        ].join(' ')}
        {...props}
      />
      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  );
}

export function Textarea({ label, error, id, className = '', ...props }: TextareaProps) {
  const inputId = id ?? label?.toLowerCase().replace(/\s+/g, '-');
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label htmlFor={inputId} className="text-[12px] font-semibold tracking-widest uppercase text-desk-text-muted">
          {label}
        </label>
      )}
      <textarea
        id={inputId}
        rows={3}
        className={[
          'bg-desk-input-bg border border-desk-border rounded-[8px] px-3 py-2 text-desk-text',
          'placeholder:text-desk-text-muted text-[13.5px] resize-none',
          'focus:outline-none focus:border-desk-teal focus:shadow-[0_0_0_3px_rgba(14,151,173,0.12)]',
          'transition-all duration-200',
          error ? 'border-red-500' : '',
          className,
        ].join(' ')}
        {...props}
      />
      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  );
}
