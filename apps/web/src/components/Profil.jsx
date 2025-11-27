import useUserStore from "../zustand-kesh/ZustandKesh";

const urlServer = "https://unsoftening-quadrumanous-gerald.ngrok-free.dev";
function Profil() {
  const user = useUserStore((state) => state.user);
  console.log("users", user.id);
  const fetchData = async () => {
    const response = await fetch(`${urlServer}/user/5688582675`);
    const data = await response.json();

    console.log(data);
  };
  fetchData();
  if (!user) return <div>Loading...</div>;
  return (
    <div>
      <h1>Name: {user.first_name}</h1>
      <p>Phone number: {user.phone}</p>
    </div>
  );
}

export default Profil;
