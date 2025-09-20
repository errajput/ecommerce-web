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
          <main className="flex-grow bg-gradient-to-br from-green-100 to-green-200">
            {children}
          </main>

          <footer className="bg-gradient-to-br from-green-300 to-green-500 text-white text-center p-4">
            <p className="mb-2 text-xl text-green-700">Follow us on</p>
            <div className="flex justify-center gap-6">
              <a
                href="#"
                className="hover:text-green-600 hover:bg-white rounded-2xl px-2 py-1"
              >
                Facebook
              </a>
              <a
                href="#"
                className="hover:text-green-600 hover:bg-white rounded-2xl px-2 py-1"
              >
                Twitter
              </a>
              <a
                href="#"
                className="hover:text-green-600 hover:bg-white rounded-2xl px-2 py-1"
              >
                Instagram
              </a>
            </div>
            <p className="mt-4 text-sm">
              © 2025 AstroCart. All rights reserved.
            </p>
          </footer>
        </div>
      </body>
    </html>
  );
}
