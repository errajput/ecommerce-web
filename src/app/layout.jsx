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
        <Header />
        {children}
      </body>
    </html>
  );
}
