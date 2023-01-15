import { AuthProvider } from "./components/login/Auth";
import { Footer } from "./components/homepage/footer";
import { Header } from "./components/homepage/header";
import { HomepageWrapper } from "./components/homepage/wrapper";

//
function App() {
  return (
    <AuthProvider>
      <Header />
      <HomepageWrapper />
      <Footer />
    </AuthProvider>
  );
}

export default App;
