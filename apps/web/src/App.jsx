import { useEffect } from "react";
import { createHashRouter, RouterProvider } from "react-router-dom";
import AppLayouts from "./layouts/AppLayouts"; // <-- yo‘lni tekshiring
import useUserStore from "./zustand-kesh/ZustandKesh";
import Profil from "./components/Profil";

function App() {
  const setUser = useUserStore((state)=>state.setUser);
  useEffect(() => {
    const tg = window.Telegram.WebApp;
    tg.ready();
    tg.expand();
    const user = tg.initDataUnsafe?.user;
    if(user)setUser(user)
  }, [setUser]);

  const router = createHashRouter([
    {
      path: "/*",
      element: <AppLayouts />,
      errorElement: <div>Page not found</div>,
      children:[{
        path:'profile',
        element:<Profil/>
      }
      ]
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
