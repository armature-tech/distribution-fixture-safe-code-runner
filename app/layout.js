import './styles.css';

export const metadata = {
  title: 'Code Runner',
  description: 'Run short JavaScript snippets and inspect their output.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
