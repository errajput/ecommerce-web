// import Header from "@/Components/Header";
import { Roboto, Poppins } from "next/font/google";
import "./globals.css";
export const metadata = {
  title: "Ecommerce App",
  description: "Your ecommerce store",
  icons: {
    icon: "🏬",
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
        {/* <Header /> */}
        {children}
      </body>
    </html>
  );
}
