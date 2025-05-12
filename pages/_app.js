import "@/styles/globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import AdminLayout from "@/components/layouts/AdminLayout";
import FacultyLayout from "@/components/layouts/FacultyLayout";
export default function App({ Component, pageProps, router }) {

  if (router.pathname.startsWith('/administration')) {
    return (
      <ClerkProvider>
        <AdminLayout>
          <Component {...pageProps} />
        </AdminLayout>
      </ClerkProvider>
    );
  }

  if (router.pathname.startsWith('/faculty')) {
    return (
      <ClerkProvider>
        <FacultyLayout>
          <Component {...pageProps} />
        </FacultyLayout>
      </ClerkProvider>
    );
  }

  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout || ((page) => page);

  return (
    <ClerkProvider>{getLayout(<Component {...pageProps} />)}</ClerkProvider>
  );
}
