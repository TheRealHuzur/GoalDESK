
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
        <label htmlFor={inputId} className="text-sm font-medium text-slate-300">
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={[
          'bg-slate-900 border border-slate-600 rounded-lg px-3 py-2 text-slate-100',
          'placeholder:text-slate-500 text-sm',
          'focus:outline-none focus:ring-2 focus:ring-sky-400/50 focus:border-sky-400',
          'transition-colors duration-150',
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
        <label htmlFor={inputId} className="text-sm font-medium text-slate-300">
          {label}
        </label>
      )}
      <textarea
        id={inputId}
        rows={3}
        className={[
          'bg-slate-900 border border-slate-600 rounded-lg px-3 py-2 text-slate-100',
          'placeholder:text-slate-500 text-sm resize-none',
          'focus:outline-none focus:ring-2 focus:ring-sky-400/50 focus:border-sky-400',
          'transition-colors duration-150',
          error ? 'border-red-500' : '',
          className,
        ].join(' ')}
        {...props}
      />
      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  );
}
