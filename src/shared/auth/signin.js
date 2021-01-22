import {useState} from 'react';
import DataLoading from "../../partials/dataLoading";
import {useForm} from "react-hook-form";
import axios from "axios";
import {useRouter} from "next/router"
import Cookies from "js-cookie"


const SignIn = () => {
    const router = useRouter()
    const {register, handleSubmit, watch, errors} = useForm({
        mode: "onBlur"
    });
    const [isLogin, setIsLogin] = useState(false)
    const emailReg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const [value, setValue] = useState({
        email: "",
        password: ""
    })

    const handleChange = (e) => {
        e.persist()
        setValue({
            ...value,
            [e.target.name]: e.target.value
        })
    }

    const onSignUp = async () => {
        setIsLogin(true)
        const login = await axios.post(`https://demonextapp.herokuapp.com:3000/api/user`, value)
        if (login.status === 200) {
            Cookies.set('token', login.data.token);
            await localStorage.setItem("loginUser", JSON.stringify(login.data.user))
            router.push('/product');
        } else {
            console.log(login)
            console.log('auth failed')
        }
        setIsLogin(false)
    }

    return (
        <div className={"signin"}>
            <div className="input-group">
                <div className="input-box">
                    <input
                        onChange={(e) => handleChange(e)}
                        type="text"
                        value={value.email}
                        placeholder={"email"}
                        name={"email"}
                        ref={register({
                            required: true,
                            pattern: emailReg
                        })}/>
                </div>
                <div className="form-error">
                    {errors.email && "Email is required"}
                </div>
            </div>
            <div className="input-group">
                <div className="input-box">
                    <input
                        onChange={(e) => handleChange(e)}
                        value={value.password}
                        type="password"
                        placeholder={"password"}
                        ref={register({required: true})}
                        name={"password"}/>
                </div>
                <div className="form-error">
                    {errors.password && "Password is required"}
                </div>
            </div>
            <div className="input-group">
                <div className="btn secondary text-center" onClick={handleSubmit(onSignUp)}>
                    {
                        isLogin ? <DataLoading/> : " Sign In"
                    }
                </div>
            </div>
        </div>
    );
};

export default SignIn;





