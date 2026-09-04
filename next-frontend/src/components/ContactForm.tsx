'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Send, Check, AlertCircle } from 'lucide-react';
import { PHONE_DISPLAY, CONTACT_EMAIL } from '@/constants/contact';

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001';

const contactSchema = z.object({
  name: z.string().min(2, 'Ingresá tu nombre'),
  email: z.string().email('Ingresá un email válido'),
  phone: z.string().optional(),
  message: z.string().min(10, 'Contá un poco más (mínimo 10 caracteres)'),
});

type ContactValues = z.infer<typeof contactSchema>;

export default function ContactForm({ propertyId, listingTitle }: {
  propertyId?: string;
  listingTitle?: string;
}) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: '', email: '', phone: '', message: '' },
  });

  const onSubmit = async (values: ContactValues) => {
    setStatus('loading');
    try {
      const res = await fetch(`${API_URL}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ ...values, subject: 'property_inquiry', propertyId }),
      });

      if (!res.ok) {
        throw new Error('request_failed');
      }

      setStatus('success');
      reset();
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="flex flex-col items-start gap-3 rounded-2xl border border-verde/30 bg-verde/10 p-6">
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-verde text-white">
          <Check size={22} aria-hidden />
        </span>
        <h3 className="font-sans text-2xl leading-tight">Mensaje enviado</h3>
        <p className="text-sm text-noche/75">
          Recibimos tu consulta. Te respondemos dentro de las próximas 24 hs hábiles.
        </p>
        <button
          type="button"
          onClick={() => setStatus('idle')}
          className="btn border border-verde px-4 py-2 text-verde hover:bg-verde/5"
        >
          Enviar otra consulta
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="flex items-center gap-3">
        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-noche text-white">
          <Send size={19} aria-hidden />
        </span>
        <div>
          <h3 className="font-sans text-xl leading-none">Consultá por esta propiedad</h3>
          {listingTitle && (
            <p className="mt-1 text-xs text-noche/60">{listingTitle}</p>
          )}
        </div>
      </div>

      {status === 'error' && (
        <div className="flex items-start gap-2.5 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          <AlertCircle size={17} className="mt-0.5 shrink-0" aria-hidden />
          <span>
            No pudimos enviar tu consulta. Escribime a {CONTACT_EMAIL} o
            llamá al {PHONE_DISPLAY}.
          </span>
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className="field-label">
            Nombre
          </label>
          <input id="contact-name" className="field" placeholder="Tu nombre" {...register('name')} />
          {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name.message}</p>}
        </div>
        <div>
          <label htmlFor="contact-email" className="field-label">
            Email
          </label>
          <input id="contact-email" className="field" placeholder="tu@email.com" {...register('email')} />
          {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="contact-phone" className="field-label">
          Teléfono <span className="text-noche/50">(opcional)</span>
        </label>
        <input id="contact-phone" className="field" placeholder="+54 249 ..." {...register('phone')} />
      </div>

      <div>
        <label htmlFor="contact-message" className="field-label">
          Mensaje
        </label>
        <textarea
          id="contact-message"
          rows={4}
          className="field resize-none"
          placeholder="Hola, me interesa esta propiedad. ¿Podemos coordinar una visita?"
          {...register('message')}
        />
        {errors.message && <p className="mt-1 text-xs text-red-600">{errors.message.message}</p>}
      </div>

      <button
        type="submit"
        disabled={status === 'loading'}
        className="btn btn-primary w-full px-6 py-3"
      >
        {status === 'loading' ? 'Enviando...' : 'Enviar consulta'}
      </button>
    </form>
  );
}
