import Header from "@/Components/Header";
import "./globals.css";
export const metadata = {
  title: {
    default: "E-Commerce Web",
    template: "%s | My e-commerce web",
  },
  icons: {
    icon: null,
  },
};
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}
