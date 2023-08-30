import { useState, useContext, useEffect } from "react";
import { userContext } from "../App";
import { useNavigate } from "react-router-dom";
import { backEndApi } from "../utilities";
export const SignInPage = () => {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const { setUser } = useContext(userContext);
    const navigate = useNavigate()

    const signIn = async(e) =>{
        e.preventDefault()
        let response = await backEndApi.post("users/signin/", {
            "email": userName,
            "password": password
        }).catch((error) =>{
            alert("Incorrect Credentials")
        })
        let user = response.data.SlotifyUser
        let token = response.data.token
        setUser(user)
        localStorage.setItem("token", token)
        backEndApi.defaults.headers.common["Authorization"] = `Token ${token}`
        navigate("/home")
    }
    useEffect(()=>{

    },[])

    return (
        <div className="flex justify-center bg-slate-950 text-white">
            <form className="flex flex-col" onSubmit={(e) => signIn(e)}>
            <h5>Log In</h5>
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





// STAR METHOD
// 
/*                      First draft of STAR method
    ! Situation, Task, Action, Result
    When I was in the marines, a colleague and myself were sent to become a help desk marine (IT Technician)
    - We did a change over between the old staff because they were both getting out of the marine corps.
    - With the span of 5 days, myself and another colleague to get caught up with the training, documentation, and paperwork
    - We ended up staying after working hours trying to get the training done, learning how to properly submit tickets/ documents to the web portal (Remedy)
        * went to the room to take take notes myself, and taking pictures to make sure I was not writing the wrong information and making sure to double check. 
        and filling out the transfer documents for the equipment we were receiving from them but also to take a count of all the devices in the entire building.
        Though there were some hiccups due to miscommunication with the supervisors/ customers, we were able to fix and complete the changeover.
        * Elaborate on the miss communication as in solving the I was able to take the feedback and improve on our documentation. 
    - In result, we were able to do a complete change over smoothly with the 4 days, and have a major turnaround on the ticket completion.
        * significant ticket difference in ticket acceptance from 5 tickets successfully being completed to 50 + tickets being successfully completed

*/