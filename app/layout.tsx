'use client'
import type { Metadata } from "next";
import localFont from "next/font/local";

//Redux Store
import {initializeStore} from './_reduxStore/CommonStore';
import { Provider } from "react-redux";
//import StoreProvider from"./_reduxStore/StoreProvider";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width"/>
      </head>
        <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Provider store={ initializeStore }>
          {children} 
        </Provider>
        </body>
    </html>
  );
}
