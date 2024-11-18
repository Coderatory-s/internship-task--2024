import './globals.css';
import { TanStackProvider } from './providers/TanStackProvider';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <TanStackProvider>
        {children}
        </TanStackProvider>
      </body>
    </html>
  );
}
