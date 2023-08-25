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
      // "http://127.0.0.1:8000/api/"
      let response = await backEndApi.post("users/signup/", {
        "email": userName,
        "password": password
      })
      // Expected response 
      //    {'Slotify': newSlotifyUser.email, 'token': token.key}, status=HTTP_201_CREATED
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
            type="email"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input type="submit" />
        </form>
        </div>
      );
};


// import {
//     Card,
//     Input,
//     Checkbox,
//     Button,
//     Typography,
// } from "@material-tailwind/react";

// export function SimpleRegistrationForm() {
//     return (
//     <Card color="transparent" shadow={false}>
//         <Typography variant="h4" color="blue-gray">
//         Sign Up
//         </Typography>
//         <Typography color="gray" className="mt-1 font-normal">
//         Enter your details to register.
//         </Typography>
//         <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
//             <div className="mb-4 flex flex-col gap-6">
//                 <Input size="lg" label="Name" />
//                 <Input size="lg" label="Email" />
//                 <Input type="password" size="lg" label="Password" />
//             </div>
//         <Checkbox
//             label={
//                 <Typography
//                     variant="small"
//                     color="gray"
//                     className="flex items-center font-normal"
//         >
//         I agree the
//         <a href="#" className="font-medium transition-colors hover:text-gray-900">
//         &nbsp;Terms and Conditions
//         </a>
//         </Typography>
//         }
//         containerProps={{ className: "-ml-2.5" }}/>
//         <Button className="mt-6" fullWidth>
//             Register
//         </Button>
//         <Typography color="gray" className="mt-4 text-center font-normal">
//         Already have an account?{" "}
//         <a href="#" className="font-medium text-gray-900">
//             Sign In
//         </a>
//         </Typography>
//         </form>
//     </Card>
//     );
// }