import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Order Tracking System | CS Online',
  description: 'Quản lý và theo dõi đơn hàng CS Online',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body>{children}</body>
    </html>
  );
}
