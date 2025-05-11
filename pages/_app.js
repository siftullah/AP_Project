import "@/styles/globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { QueryProvider } from "@/providers/QueryProvider";

export default function App({ Component, pageProps }) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout || ((page) => page);

  return (
    <ClerkProvider>
      <QueryProvider>{getLayout(<Component {...pageProps} />)}</QueryProvider>
    </ClerkProvider>
  );
}
