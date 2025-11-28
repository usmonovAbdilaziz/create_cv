import { useEffect, useState } from "react";
import { createHashRouter, RouterProvider } from "react-router-dom";
import AppLayouts from "./layouts/AppLayouts"; // <-- yo‘lni tekshiring
import Profil from "./components/Profil";
import ListOne from "./pages/ListOne";
import ListTwo from "./pages/ListTwo";
import ListThree from "./pages/ListThree";
import ListFour from "./pages/ListFour";
import useUserStore from "./zustand-kesh/ZustandKesh";

function App() {
 const [userId, setUserId] = useState(null);
 const setUser = useUserStore((state) => state.setUser);
 useEffect(() => {
   const tg = window.Telegram.WebApp;
   tg.ready();
   tg.expand();
   const user = tg.initDataUnsafe?.user;
   if (user) {
     setUserId(user.id); // number
     localStorage.setItem("id", String(user.id)); // string saqlanadi
   }
 }, []);

 useEffect(() => {
   if (!userId) return; // null bo‘lsa fetch bo‘lmaydi
   const fetchData = async () => {
     const res = await fetch(`/api/user/${userId}`);
     
     const data = await res.json();
     
     setUser(data.data);
     localStorage.setItem("token", data.data.token);
   };

   fetchData();
 }, [userId]);
  const router = createHashRouter([
    {
      path: "/*",
      element: <AppLayouts />,
      errorElement: <div>Page not found</div>,
      children: [
        {
          path: "profile",
          element: <Profil />,
        },
        {
          path: "listOne",
          element: <ListOne />,
        },
        {
          path: "listTwo",
          element: <ListTwo />,
        },
        {
          path: "listThree",
          element: <ListThree />,
        },
        {
          path: "listFour",
          element: <ListFour />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
