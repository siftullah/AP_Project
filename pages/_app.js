import "@/styles/globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import AdminLayout from "@/components/layouts/AdminLayout";
import FacultyLayout from "@/components/layouts/FacultyLayout";
import StudentLayout from "@/components/layouts/StudentLayout";

export default function App({ Component, pageProps, router }) {

  const getLayout = () => {
    const path = router.pathname;

    if (path.startsWith("/administration")) {
      return AdminLayout;
    }

    if (path.startsWith("/faculty")) {
      return FacultyLayout;
    }

    if (path.startsWith("/student")) {
      return StudentLayout;
    }

    return null;
  };

  const Layout = getLayout();

  return (
    <ClerkProvider>
      {Layout ? (<Layout><Component {...pageProps} /></Layout>) 
              : (<Component {...pageProps} />)
      }
    </ClerkProvider>
  );
}
