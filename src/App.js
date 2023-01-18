import { AuthProvider } from "./components/login/Auth";
import { Footer } from "./components/footer";
import { Header } from "./components/header";
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
