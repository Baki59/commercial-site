'use client';

import { useState } from 'react';
import { api } from '@/lib/api';
import type { EnquiryPayload } from '@/types';

type Status = 'idle' | 'submitting' | 'sent' | 'error';

const EMPTY: EnquiryPayload = {
  name: '',
  email: '',
  company: '',
  country: '',
  phone: '',
  subject: '',
  message: '',
};

/** Form state, validation and submission for the general enquiry form. */
export function useEnquiryForm(productSlug?: string) {
  const [values, setValues] = useState<EnquiryPayload>({ ...EMPTY, productSlug });
  const [errors, setErrors] = useState<Partial<Record<keyof EnquiryPayload, string>>>({});
  const [status, setStatus] = useState<Status>('idle');
  const [reference, setReference] = useState<string>();
  const [serverMessage, setServerMessage] = useState<string>();

  const setValue = <K extends keyof EnquiryPayload>(key: K, value: EnquiryPayload[K]) => {
    setValues((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const validate = () => {
    const next: Partial<Record<keyof EnquiryPayload, string>> = {};
    if (!values.name.trim()) next.name = 'Enter your name so we know who to reply to.';
    if (!values.email.trim()) next.email = 'Enter an email address for the reply.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) next.email = 'This address is missing an @ or a domain.';
    if (values.message.trim().length < 12) next.message = 'Add a little more detail — duty, size or application helps.';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const submit = async () => {
    if (!validate()) return;
    setStatus('submitting');
    try {
      const result = await api.forms.enquiry(values);
      setReference(result.reference);
      setServerMessage(result.message);
      setStatus(result.success ? 'sent' : 'error');
      if (result.success) setValues({ ...EMPTY, productSlug });
    } catch {
      setServerMessage('The enquiry could not be sent. Email info@sazinindustries.com and we will pick it up there.');
      setStatus('error');
    }
  };

  return { values, errors, status, reference, serverMessage, setValue, submit, reset: () => setStatus('idle') };
}
