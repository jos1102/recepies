import { useState } from 'react'
import axios from 'axios'
import {useCookies} from 'react-cookie'
import {useNavigate} from 'react-router-dom'

export const Auth = () => {
    return (
        <div className = "auth">
            <Login/>
            <Register/>
        </div>
    )
}

const Login = () => {

    const [username , setUserName] = useState("");
    const [password , setPassword] = useState("");

    const[ _ , setCookies ] = useCookies(["access_token"]);

    const navigate = useNavigate();

    const onSubmit = async (event) => {

        event.preventDefault();
        try{
            const response = await axios.post("http://localhost:3001/auth/login" , {
                username,
                password,
            });

            setCookies("access_token" , response.data.token);
            window.localStorage.setItem("userID" , response.data.userID);
            navigate("/");
        }
        catch(err){
            console.error("hello you fucked up");
        }
    }

    return (
        <Form
            username = {username}
            setUserName = {setUserName}
            password = {password}
            setPassword = {setPassword}
            label={"Login"}
            onSubmit = {onSubmit}
        />
    )
}

const Register = () => {

    const [username , setUserName] = useState("");
    const [password , setPassword] = useState("");

    const onSubmit = async (event) => {

        event.preventDefault();
        try{

            await axios.post("http://localhost:3001/auth/register" , {
                username,
                password,
            });

            alert("User created successfully! Now login");

        } catch(err){

            console.error(err);
        }
    }

    return (
        <Form
            username = {username}
            setUserName = {setUserName}
            password = {password}
            setPassword = {setPassword}
            label={"Register"}
            onSubmit = {onSubmit}
        />
    )
}

const Form = ({
    username ,
    setUserName ,
    password ,
    setPassword ,
    label,
    onSubmit,
    }) => {   


    return (

        <div className = "auth-container">
            <form onSubmit = {onSubmit} >
                <h2> {label} </h2>

                <div className = "form-group">
                    <label htmlFor = "username">Username:</label>

                    <input
                        type = "text"
                        id = "username"
                        value ={username}
                        onChange={(event) => setUserName(event.target.value) }
                    />
                </div>

                <div className = "form-group">
                    <label htmlFor = "password"> Password:</label>
                    <input 
                        type = "password" 
                        id = "password"  
                        value ={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />
                </div>

                <button type = "submit"> {label} </button>

            </form>
        </div>
    )

  }              