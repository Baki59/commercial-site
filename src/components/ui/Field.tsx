'use client';

import type { InputHTMLAttributes, SelectHTMLAttributes, TextareaHTMLAttributes } from 'react';
import { useId } from 'react';
import { cn } from '@/lib/utils';

const control =
  'w-full rounded-xs border border-line-strong bg-surface px-3.5 py-2.5 text-[0.95rem] text-ink placeholder:text-muted/80 transition-colors focus:border-accent focus:outline-none';

function Wrapper({
  label,
  htmlFor,
  error,
  hint,
  required,
  children,
  className,
}: {
  label?: string;
  htmlFor: string;
  error?: string;
  hint?: string;
  required?: boolean;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      {label ? (
        <label htmlFor={htmlFor} className="text-[0.85rem] font-medium text-ink-soft">
          {label}
          {required ? <span className="ml-1 text-danger">*</span> : null}
        </label>
      ) : null}
      {children}
      {error ? (
        <p className="text-[0.8rem] text-danger">{error}</p>
      ) : hint ? (
        <p className="text-[0.8rem] text-muted">{hint}</p>
      ) : null}
    </div>
  );
}

export function TextField({
  label,
  error,
  hint,
  className,
  ...props
}: InputHTMLAttributes<HTMLInputElement> & { label?: string; error?: string; hint?: string }) {
  const id = useId();
  return (
    <Wrapper label={label} htmlFor={id} error={error} hint={hint} required={props.required} className={className}>
      <input
        id={id}
        className={cn(control, error && 'border-danger focus:border-danger')}
        aria-invalid={Boolean(error)}
        {...props}
      />
    </Wrapper>
  );
}

export function TextAreaField({
  label,
  error,
  hint,
  className,
  ...props
}: TextareaHTMLAttributes<HTMLTextAreaElement> & { label?: string; error?: string; hint?: string }) {
  const id = useId();
  return (
    <Wrapper label={label} htmlFor={id} error={error} hint={hint} required={props.required} className={className}>
      <textarea
        id={id}
        rows={5}
        className={cn(control, 'resize-y leading-relaxed', error && 'border-danger focus:border-danger')}
        aria-invalid={Boolean(error)}
        {...props}
      />
    </Wrapper>
  );
}

export function SelectField({
  label,
  error,
  hint,
  options,
  placeholder,
  className,
  ...props
}: SelectHTMLAttributes<HTMLSelectElement> & {
  label?: string;
  error?: string;
  hint?: string;
  placeholder?: string;
  options: { value: string; label: string }[];
}) {
  const id = useId();
  return (
    <Wrapper label={label} htmlFor={id} error={error} hint={hint} required={props.required} className={className}>
      <select id={id} className={cn(control, 'appearance-none pr-9')} {...props}>
        {placeholder ? <option value="">{placeholder}</option> : null}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </Wrapper>
  );
}
