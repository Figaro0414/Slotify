import { useState, useContext } from "react";
import { userContext } from "../App";
import { backEndApi} from "../utilities";
import { useNavigate } from "react-router-dom";

export const RegisterPage =() =>{
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const {setUser} = useContext(userContext)
    const navigate = useNavigate()

    const signUp = async(e) =>{
      e.preventDefault()
      let response = await backEndApi.post("users/signup/", {
        "email": userName,
        "password": password
      })
      let user = response.data.user
      let token = response.data.token
      setUser(user)
      localStorage.setItem("token", token)
      backEndApi.defaults.headers.common["Authorization"] = `Token ${token}`
      navigate("home")
    }
    return (
      <div className="flex justify-center bg-slate-950 text-white">
        <form onSubmit={(e) => signUp(e)}>
          <h5>Sign Up</h5>
          <input
            className="text-black"
            placeholder="email"
            type="email"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <input
            className="text-black"
            placeholder="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input type="submit" />
        </form>
        </div>
      );
};