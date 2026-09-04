import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Agustina García · Inmobiliaria en Tandil',
    template: '%s · Agustina García Inmobiliaria',
  },
  description:
    'Inmobiliaria en Tandil, Buenos Aires. Te ayudamos a comprar, vender o alquilar propiedades con confianza y asesoramiento personalizado.',
};

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="es" className={inter.variable}>
      <body className="text-noche">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
