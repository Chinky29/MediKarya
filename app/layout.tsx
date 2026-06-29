import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { PageWrapper } from '@/components/layout/PageWrapper';
import { CaseProvider } from '@/context/CaseContext';
import { AuthorProvider } from '@/context/AuthorContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'MediKarya - Medical Case Authoring Portal',
  description: 'A professional medical case authoring platform',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthorProvider>
          <CaseProvider>
            <PageWrapper>{children}</PageWrapper>
          </CaseProvider>
        </AuthorProvider>
      </body>
    </html>
  );
}
