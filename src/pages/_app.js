import "../styles/globals.css"
import { ContactProvider } from "../hooks/useContextTickets";


function MyApp({ Component, pageProps }) {
  return (
    <ContactProvider>
      <Component {...pageProps} />
    </ContactProvider>
  );
}

export default MyApp
