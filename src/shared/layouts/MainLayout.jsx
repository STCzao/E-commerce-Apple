import AppNavbar from "../components/AppNavbar/AppNavbar";
import Footer from "../components/Footer/Footer";

const MainLayout = ({ children }) => (
  <>
    <AppNavbar />
    <main>{children}</main>
    <Footer />
  </>
);

export default MainLayout;
