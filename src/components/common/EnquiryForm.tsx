'use client';

import { useSearchParams } from 'next/navigation';
import { Button, SelectField, TextAreaField, TextField } from '@/components/ui';
import { useEnquiryForm } from '@/lib/hooks';
import { Icon } from '@/lib/utils';

const SUBJECTS = [
  { value: 'quotation', label: 'Request a quotation' },
  { value: 'selection', label: 'Equipment selection help' },
  { value: 'documents', label: 'Technical documents' },
  { value: 'service', label: 'Service, parts or repair' },
  { value: 'partnership', label: 'Partnership or distribution' },
  { value: 'careers', label: 'Careers' },
  { value: 'other', label: 'Something else' },
];

export function EnquiryForm() {
  const params = useSearchParams();
  const productSlug = params.get('product') ?? undefined;
  const { values, errors, status, reference, serverMessage, setValue, submit } = useEnquiryForm(productSlug);

  if (status === 'sent') {
    return (
      <div className="rounded-sm border border-line bg-surface p-8">
        <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-ok/12 text-ok">
          <Icon.check size={22} />
        </span>
        <h2 className="mt-5 text-[1.3rem]">Enquiry received</h2>
        <p className="mt-2.5 text-[0.95rem] leading-relaxed text-ink-soft">
          An engineer will reply within one working day. {reference ? `Your reference is ${reference}.` : ''}
        </p>
        {serverMessage ? <p className="mt-3 text-[0.85rem] text-muted">{serverMessage}</p> : null}
      </div>
    );
  }

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        void submit();
      }}
      noValidate
      className="rounded-sm border border-line bg-surface p-6 sm:p-8"
    >
      {productSlug ? (
        <p className="mb-6 rounded-xs bg-accent-wash px-4 py-3 text-[0.87rem] text-accent-deep">
          This enquiry is linked to the product you were viewing.
        </p>
      ) : null}

      <div className="grid gap-5 sm:grid-cols-2">
        <TextField
          label="Your name"
          required
          value={values.name}
          error={errors.name}
          onChange={(event) => setValue('name', event.target.value)}
          autoComplete="name"
        />
        <TextField
          label="Email"
          type="email"
          required
          value={values.email}
          error={errors.email}
          onChange={(event) => setValue('email', event.target.value)}
          autoComplete="email"
        />
        <TextField
          label="Company"
          value={values.company}
          onChange={(event) => setValue('company', event.target.value)}
          autoComplete="organization"
        />
        <TextField
          label="Country"
          value={values.country}
          onChange={(event) => setValue('country', event.target.value)}
          autoComplete="country-name"
        />
        <TextField
          label="Phone"
          type="tel"
          value={values.phone}
          onChange={(event) => setValue('phone', event.target.value)}
          autoComplete="tel"
        />
        <SelectField
          label="What is this about?"
          placeholder="Select a subject"
          options={SUBJECTS}
          value={values.subject}
          onChange={(event) => setValue('subject', event.target.value)}
        />
      </div>

      <TextAreaField
        className="mt-5"
        label="Your requirement"
        required
        hint="Flow, head, liquid, temperature and line size are enough for us to start a selection."
        value={values.message}
        error={errors.message}
        onChange={(event) => setValue('message', event.target.value)}
      />

      {status === 'error' && serverMessage ? (
        <p className="mt-5 rounded-xs bg-danger/8 px-4 py-3 text-[0.88rem] text-danger">{serverMessage}</p>
      ) : null}

      <div className="mt-7 flex flex-wrap items-center gap-4">
        <Button type="submit" size="lg" disabled={status === 'submitting'}>
          {status === 'submitting' ? 'Sending…' : 'Send enquiry'}
        </Button>
        <p className="text-[0.82rem] text-muted">We reply within one working day.</p>
      </div>
    </form>
  );
}
