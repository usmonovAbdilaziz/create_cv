import useUserStore from "../zustand-kesh/ZustandKesh";

function ListOne() {
    const user = useUserStore((state) => state.user);
    user&&console.log(user);
    
  return (
    <>
      <hr
        style={{
          backgroundColor: "blue",
          padding: "10px",
          border: "none",
          margin: "0",
        }}
      />
      <div style={{ padding: "0px 20px" }}>
        <h3 style={{ fontSize: "16px", paddingTop: "5PX", margin: "0" }}>
          {user.user.name}
        </h3>
        <small style={{ fontSize: "12px", padding: "0", margin: "0" }}>
          {" "}
          <strong>Telefon raqami: </strong>
          {user.user.phone}
          <span>
            <br /> <strong>Telegra Link:</strong> https://t.me/
            {user.user.username}
          </span>
        </small>
      </div>
      <div style={{ padding: "0 5px" }}>
        <h3
          style={{ marginTop: "10px", marginBottom: "0", color: "#003ffdd0" }}
        >
          ABOUT ME
        </h3>
        <hr />
        <small style={{ width: "90%",fontSize:"12px" }}>{user.user.description} sdghfah adkjhfalkj adsjfhakj akjdhflak akljdhf alkjdfh alkjdhfkdjagskjh akjdgfk akdgh akjdghs</small>
        <h3
          style={{ marginTop: "10px", marginBottom: "0", color: "#003ffdd0" }}
        >
          EDUCATION AND TRAINING
        </h3>
      </div>
    </>
  );
}

export default ListOne;
