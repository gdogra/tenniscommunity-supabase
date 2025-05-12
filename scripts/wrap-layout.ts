// scripts/wrap-layout.ts
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Fix __dirname in ESM mode
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const LAYOUT_PATH = path.join(__dirname, '../src/app/layout.tsx');

// Template for layout.tsx
const NEW_LAYOUT = `
// src/app/layout.tsx
import './globals.css';
import Layout from '@/components/Layout';

export const metadata = {
  title: 'Tennis Community',
  description: 'Connect and play!',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Layout>
          {children}
        </Layout>
      </body>
    </html>
  );
}
`.trim();

async function main() {
  try {
    await fs.writeFile(LAYOUT_PATH, NEW_LAYOUT, 'utf8');
    console.log('✅ layout.tsx has been rewritten at:', LAYOUT_PATH);
  } catch (error) {
    console.error('❌ Failed to rewrite layout.tsx:', error);
  }
}

main();

