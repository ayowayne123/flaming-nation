import { Inter } from "next/font/google";
import "./globals.css";
import localFont from "next/font/local";


export const metadata = {
  title: "Flaming Nation Dashboard",
  description: "An Admin dashbaord for Pdaniel",
};

const euclid = localFont({
  src: [
    {
      path: "../public/fonts/Euclid/Euclid-bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/Euclid/Euclid-semiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../public/fonts/Euclid/Euclid-medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/Euclid/Euclid-regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/Euclid/Euclid-light.ttf",
      weight: "300",
      style: "normal",
    },
  ],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
    
      <body className={euclid.className}>{children}</body>
    </html>
  );
}
