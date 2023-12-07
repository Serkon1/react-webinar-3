import Main from "./main";
import useStore from "../store/use-store";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Product from "./product";

/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {

  // const activeModal = useSelector(state => state.modals.name);

  const store = useStore();

  const router = createBrowserRouter([
    {
      path: "/products/:_id",
      element: <Product title="Каталог" />,
      loader: async ({ params }) => {
        const data = await store.actions.catalog.loadItemData(params._id);
        return {
          data,
          store
        }
      }
    },
    {
      path: "/page/:page",
      element: <Main />,
      loader: ({ params }) => {
        return {
          page: params.page || 1,
          store
        }
      }
    },
    {
      path: "/",
      element: <Main />,
      loader: () => {
        return {
          page: 1,
          store
        }
      }
    },

  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
