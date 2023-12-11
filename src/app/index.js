import Main from "./main";
import {createBrowserRouter, Route, RouterProvider} from "react-router-dom";
import PageLayout from "../components/page-layout";
import ProductPage from "./product-page";
import Error from "./error";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main/>,
    children: [
      {
        path: "/:id",
        element: <Main/>,
      }
    ],
    errorElement: <Error/>
  },
  {
    path: "/:id",
    element: <Main/>,
    errorElement: <Error/>
  },
  {
    path: '/product/:id',
    element: <ProductPage/>,
    errorElement: <Error/>
  },
]);

function App() {


  return (
    <>
      <RouterProvider router={router}/>
    </>
  );
}

export default App;
