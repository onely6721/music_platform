import React, {useState} from 'react';
import './styles.css'
import {useAppDispatch} from "../../store/hooks/redux";
import {login} from "../../store/actions/UserActionCreator";
import {Link} from "react-router-dom";


function LoginPage() {
    const [userData, setUserData] = useState<{email:string, password:string}>({email: "", password:""})
    const dispatch = useAppDispatch()

    const handleInput = (e:any) => {
        setUserData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    }

    const handleSubmit = () => {
        const { email, password } = userData
        dispatch(login({email :email, password: password }))
    }

    return (
        <div className="login-component">
            <div className="form">
                <h3>Sign in</h3>
                <input name="email" type="text" placeholder="Enter email" onChange={handleInput}/>
                <input  name="password" type="password" placeholder="Enter password" onChange={handleInput}/>
                <Link to="/registration"> Sign up </Link>
                <button onClick={handleSubmit}>Принять</button>
            </div>
        </div>
    );
}

export default LoginPage;