import { useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Lenis from '@studio-freight/lenis';

import RootLayout from "./layouts/RootLayout";

import Home from "./pages/Home";
import Portfolio from "./pages/Portfolio";
import ProjectDetails from "./pages/ProjectDetails";
import Team from "./pages/Team";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />, 
    children: [
      { 
        index: true, 
        element: <Home /> 
      },
      { 
        path: "portfolio", 
        element: <Portfolio /> 
      },
      { 
        path: "portfolio/:id", 
        element: <ProjectDetails /> 
      },
      { 
        path: "team", 
        element: <Team /> 
      },
      { 
        path: "blog", 
        element: <Blog /> 
      },
      { 
        path: "blog/:id", 
        element: <NotFound /> // 
      },
      { 
        path: "contact", 
        element: <Contact /> 
      },
      { 
        path: "admin", 
        element: <Admin /> 
      },
      
      { 
        path: "*", 
        element: <NotFound /> 
      },
    ],
  },
]);

export default function App() {


  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), 
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
    });

    // Bucla de animație (requestAnimationFrame)
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return <RouterProvider router={router} />;
}