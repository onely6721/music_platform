import React, {useState} from 'react';
import './index.css'
import {useAppDispatch} from "../../store/hooks/redux";
import {login, register} from "../../store/actions/UserActionCreator";

function RegistrationPage() {
    const [userData, setUserData] =
        useState<{email:string, username:string, password:string}>
        ({email: "", username: "", password:""})
    const dispatch = useAppDispatch()

    const handleInput = (e:any) => {
        setUserData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    }

    const handleSubmit = () => {
        const { email, password, username } = userData
        dispatch(register({email,username, password }))
    }

    return (
        <div>
            <div className="register-component">
                <div className="form">
                    <h3>Sign in</h3>
                    <input name="username" type="text" placeholder="Enter username" onChange={handleInput}/>
                    <input name="email" type="text" placeholder="Enter email" onChange={handleInput}/>
                    <input name="password" type="password" placeholder="Enter password" onChange={handleInput}/>
                    <button onClick={handleSubmit}>Принять</button>
                </div>
            </div>
        </div>
    );
}

export default RegistrationPage;