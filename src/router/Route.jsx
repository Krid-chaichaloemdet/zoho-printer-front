import { RouterProvider, createBrowserRouter } from "react-router-dom";

import LoginFeaturePage from "../loginFeaturePage";
import AdminWorkPage from "../AdminWorkPage";
import TestQRcode from "../TestQRcode";
const router = createBrowserRouter([
  {
    path: "/",

    element: <LoginFeaturePage />,
    children: [
      { path: "", element: <LoginFeaturePage /> },
      {
        path: "",
        element: <LoginFeaturePage />,
      },
    ],
  },
  {
    path: "/",

    element: <AdminWorkPage />,
    children: [
      { path: "adminWorkPage", element: <AdminWorkPage /> },
      
    ],
  },
  {
    path: "/testqrcode",

    element: <TestQRcode />,
    children: [
      { path: "testqrcode", element: <TestQRcode /> },
      
    ],
  },
]);

export default function Route() {
  return <RouterProvider router={router} />;
}


