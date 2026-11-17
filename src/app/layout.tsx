'use client';
import { usePathname } from "next/navigation";
import { Merriweather, Nothing_You_Could_Do, Coral_Pixels } from 'next/font/google'
import Header from './components/header/header';
import "./globals.css";

const merriweather = Merriweather({
  subsets: ['latin']
})

export default function RootLayout({ children }: LayoutProps<"/">) {

    const pathname = usePathname();

    const noLayoutRoutes = ["/login", "/cadastrar"];
    const shouldHideLayout = noLayoutRoutes.includes(pathname);

  return (
    <html
      lang="en"
    >
      <head>
        
      </head>
      <body>
        {!shouldHideLayout &&
          <Header/>
        }
        {children}
      </body>
    </html>
  );
}
