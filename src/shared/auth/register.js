import React, {useState} from 'react';
import styles from "../../pages/user/user.module.scss";
import DataLoading from "../../partials/dataLoading";
import {useForm} from "react-hook-form";
import axios from "axios";
import {useRouter} from "next/router";

const Register = () => {
    const {register, handleSubmit, errors} = useForm();
    const [isSubmit, setIsSubmit] = useState(false)
    const emailReg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const router = useRouter();

    const [value, setValues] = useState({
        user_name: '',
        email: '',
        password: ""
    })

    const refreshData = () => {
        router.replace(router.asPath);
    }


    const handleChange = (e) => {
        setValues({
            ...value,
            [e.target.name]: e.target.value
        })
    }
    const onSubmit = async () => {
        setIsSubmit(true)
        const res = await axios.post(`https://demonextapp.herokuapp.com:3000/api/user`, value);
        if (res.status === 200) {
            setValues({
                user_name: '',
                email: '',
                password: ''
            })
            setIsSubmit(false)
            refreshData();
        } else {
            setIsSubmit(false)
        }
    }
    return (
        <div className={styles.userForm}>
            <div className="input-group">
                <div className="input-box">
                    <input
                        onChange={(e) => handleChange(e)}
                        type="text"
                        name="user_name"
                        value={value.user_name}
                        ref={register({required: true})}
                        placeholder="user_name"/>
                </div>
                <div className="form-error">
                    {errors.user_name && "User name is required"}
                </div>

            </div>
            <div className="input-group">
                <div className="input-box">
                    <input
                        onChange={(e) => handleChange(e)}
                        type="text"
                        name="email"
                        value={value.email}
                        ref={register({
                            required: true,
                            pattern: emailReg
                        })}
                        placeholder="email"/>
                </div>
                <div className="form-error">
                    {errors.email && "Email is required"}
                </div>
            </div>
            <div className="input-group">
                <div className="input-box">
                    <input
                        onChange={(e) => handleChange(e)}
                        type="password"
                        name="password"
                        value={value.password}
                        ref={register({
                            required: true
                        })}
                        placeholder="password"/>
                </div>
                <div className="form-error capitalize">
                    {errors.password && "password is required"}
                </div>
            </div>
            <div className="input-group flex flex-centered">
                <div className="btn secondary text-center" onClick={handleSubmit(onSubmit)}>
                    {isSubmit ? <DataLoading/> : "Save"}
                </div>
            </div>
        </div>
    );
};

export default Register;
