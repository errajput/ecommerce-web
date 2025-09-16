import { Roboto, Poppins } from "next/font/google";
import "./globals.css";
import Header from "@/Components/Header";
export const metadata = {
  title: "AstroCart",
  description:
    "A futuristic online shopping cart for advanced gadgets and technology.",
  icons: {
    icon: "/astro-cart-icon.png",
  },
};
const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "700"], // regular + bold
  variable: "--font-roboto", // custom CSS variable
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-poppins",
});
export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${roboto.variable} ${poppins.variable}`}>
      <body>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-grow">{children}</main>

          <footer className="bg-gradient-to-br from-green-300 to-green-500 text-white text-center p-4">
            © 2025{" "}
            <span className="font-bold text-white  drop-shadow">
              Product App
            </span>
            . All rights reserved.
          </footer>
        </div>
      </body>
    </html>
  );
}
