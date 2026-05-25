import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import CustomCursor from "./components/CustomCursor";
import DynamicBackground from "./components/DynamicBackground";
import { useLenis } from "./hooks/useLenis";
import Home from "./pages/Home";
import DesignPortfolio from "./pages/DesignPortfolio";
import VideoPortfolio from "./pages/VideoPortfolio";
import VFXPortfolio from "./pages/VFXPortfolio";
import CodingPortfolio from "./pages/CodingPortfolio";
import Contact from "./pages/Contact";
import AdminDashboard from "./pages/AdminDashboard";
import ProjectDetail from "./pages/ProjectDetail";

function Router() {
  // make sure to consider if you need authentication for certain routes
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/design"} component={DesignPortfolio} />
      <Route path={"/video"} component={VideoPortfolio} />
      <Route path={"/vfx"} component={VFXPortfolio} />
      <Route path={"/coding"} component={CodingPortfolio} />
      <Route path={"/contact"} component={Contact} />
      <Route path={"/admin"} component={AdminDashboard} />
      <Route path={"/project/:id"} component={ProjectDetail} />
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  useLenis();

  return (
    <ErrorBoundary>
      <LanguageProvider>
        <ThemeProvider
          defaultTheme="dark"
        >
          <TooltipProvider>
            <CustomCursor />
            <DynamicBackground />
            <Toaster />
            <Router />
          </TooltipProvider>
        </ThemeProvider>
      </LanguageProvider>
    </ErrorBoundary>
  );
}

export default App;
