/* eslint-disable react/react-in-jsx-scope */
import type { Metadata } from 'next';
import './globals.scss';
import './normalize.css';

export const metadata: Metadata = {
  title: 'Tetris PvP',
  description: 'Описание добавлю потом...',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
