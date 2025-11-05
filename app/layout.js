import "./globals.css";
import Header from "@/components/Header";

export const metadata = {
  title: "My Markdown Blog",
  description: "A beautiful blog powered by Next.js and Markdown",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased bg-gray-50 font-sans">
        <Header />
        {children}
      </body>
    </html>
  );
}
