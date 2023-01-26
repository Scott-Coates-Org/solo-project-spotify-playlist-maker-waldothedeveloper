import { AuthProvider } from "./components/login/Auth";
import { Footer } from "./components/footer";
import { Header } from "./components/header";
import { ThemeProvider } from "./components/providers/themeProvider";
import { Wrapper } from "./components/homepage/wrapper";

//
function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Header />
        <Wrapper />
        <Footer />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
