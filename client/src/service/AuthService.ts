import axios from "axios";



    const  login =  async (username:string, password:string) => {
        try {
            const response = await axios.post("http://localhost:8000/auth/login", {email: username, password:password})
            localStorage.setItem("user", JSON.stringify(response.data));
            return response.data
        } catch (e:any) {
            throw new Error("Unauth")
        }
    }

    const registration = async (email:string, username:string, password:string)  => {
        try {
            const response = await axios.post("http://localhost:8000/auth/registration", {name: username, email, password})
            return response.data
        } catch (e:any) {
            console.log(e.message)
        }
    }

    const getToken = async ()  =>{
        const user = localStorage.getItem('user')
        if (user) {
            return { Authorization: 'Bearer ' + user};
        } else {
            return {};
        }
    }

    export const logout  = () => {
        localStorage.removeItem("user")
    }

    export const AuthService = {
        login,
        registration,
        logout
    }