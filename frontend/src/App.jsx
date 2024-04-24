import { useSelector } from "react-redux";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import ProtectedRoute from "./components/layouts/ProtectedRoute";
import SuperAdminDash from "./pages/super-admin/SuperAdminDash";
import ErrorLayout from "./components/layouts/ErrorLayout";
import RootLayout from "./components/layouts/RootLayout";
import Dashboard from "./pages/Dashboard";
import MainLayout from "./components/layouts/mainLayout";
import Login from "./pages/Login";
// import "./App.css";

function App() {
  const { user } = useSelector((state) => state.user);
  console.log(user);

  const landingPage =
    user?.role === "Super Admin"
      ? {
          path: "/home",
          element: (
            <ProtectedRoute restrictTo={["Super Admin"]}>
              <SuperAdminDash />
            </ProtectedRoute>
          ),
        }
      : {
          path: "/home",
          element: (
            <ProtectedRoute restrictFrom={["Super Admin"]}>
              <Dashboard />
            </ProtectedRoute>
          ),
        };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      errorElement: <ErrorLayout />,
      children: [
        {
          index: true,
          element: <>Landing</>,
        },
        {
          path: "login",
          element: (
            <ProtectedRoute reverse>
              <Login />
            </ProtectedRoute>
          ),
        },

        {
          path: "",
          element: <MainLayout />,
          children: [landingPage], //[landingPage, ...superAdminRoutes(), ...userRoutes()],
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
