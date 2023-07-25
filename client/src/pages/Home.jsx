import { useAuth0 } from "@auth0/auth0-react";
import { useState } from "react";

const Home = () => {
  const { user, isAuthenticated, loginWithRedirect } = useAuth0();
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email.trim() !== "") {
      loginWithRedirect({
        appState: email,
      });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <h1 className="text-3xl font-bold text-black">Welcome</h1>

      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        type="email"
        className="border px-3 py-2.5 w-full block"
      />

      <button
        onClick={handleSubmit}
        className="bg-orange-500 py-2 px-5 rounded mt-2 text-white capitalize"
      >
        login
      </button>

      {isAuthenticated && (
        <div className="max-w-xs flex flex-col items-center mt-5">
          <img src={user.picture} alt="" className="w-20 h-20 rounded" />
          <p className="text-gray-600 mt-3">{user.nickname}</p>
          <p className="text-gray-600 ">{user.email}</p>
        </div>
      )}
    </div>
  );
};

export default Home;
