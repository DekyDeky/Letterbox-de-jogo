import { Merriweather } from 'next/font/google'
import Header from './components/header/header';
import "./globals.css";

const merriweather = Merriweather({
  subsets: ['latin']
})

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
    >
      <head>
        
      </head>
      <body>
        <Header/>
        {children}
      </body>
    </html>
  );
}
