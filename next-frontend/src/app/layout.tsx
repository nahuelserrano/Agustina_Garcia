import type { Metadata } from 'next';
import { Jost, Hanken_Grotesk } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const jost = Jost({
  subsets: ['latin'],
  variable: '--font-jost',
  display: 'swap',
});

const hanken = Hanken_Grotesk({
  subsets: ['latin'],
  variable: '--font-hanken',
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
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={`${jost.variable} ${hanken.variable}`}>
      <body className="font-sans text-noche">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
