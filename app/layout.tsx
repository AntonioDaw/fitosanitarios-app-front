import './ui/globals.css';
import { roboto } from './ui/fonts';
import { SessionProvider } from 'next-auth/react';
import { auth } from "@/auth";


export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  console.log('EY', session)
  return (
    <html lang="es">
      <body className={roboto.className}>
        <SessionProvider
        >
          {children}

        </SessionProvider>
      </body>
    </html>
  );
}