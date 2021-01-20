import styles from './user.module.scss'
import axios from "axios";
import {useRouter} from 'next/router';
import {useState, useEffect} from 'react'
import dynamic from "next/dynamic";
import PageLoader from "../../partials/pageLoader";
import DataLoading from "../../partials/dataLoading";
import {useForm} from "react-hook-form";
import {getAppCookies, verifyToken} from "../../middleware/auth";

const Layout = dynamic(() => import("../../hoc/layout"),
    {loading: () => <PageLoader/>}
)

const User = (pageProps) => {
    const router = useRouter();
    const {register, handleSubmit, watch, errors} = useForm();
    const [loading, setLoading] = useState(true);
    const [isSubmit, setIsSubmit] = useState(false)
    const emailReg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const [value, setValues] = useState({
        user_name: '',
        email: '',
        password: ""
    })
    const {
        users
    } = pageProps

    const refreshData = () => {
        router.replace(router.asPath);
    }

    useEffect(() => {
        setLoading(false)
    }, [users])

    const handleChange = (e) => {
        setValues({
            ...value,
            [e.target.name]: e.target.value
        })
    }

    const onSubmit = async () => {
        setIsSubmit(true)
        const res = await axios.post(`http://localhost:3000/api/user`, value);
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

    const handleDelete = async (id) => {
        const res = await axios.delete(`http://localhost:3000/api/user/${id}`);
        if (res.status === 200) {
            refreshData();
        } else {
            console.log('deletation failed')
        }
    }

    return (
        <Layout
            title={"Next Users"}
            description={'this is next js'}
            keywords={['js', "nextjs"]}
        >
            <div className={styles.user}>
                <section className="flex justify-between align-center items-center">
                    <div className={styles.userList}>
                        {
                            loading && <DataLoading/>
                        }
                        {
                            users.length !== 0 ? users.map((user, index) => (
                                <div className="card mb-lg pa-md text-center" key={user._id}>
                                    <div>
                                        {user.user_name}
                                    </div>
                                    <div>
                                        {user.email}
                                    </div>
                                    <div className="icon">
                                        <i className="material-icons pointer" onClick={() => handleDelete(user._id)}>
                                            delete
                                        </i>
                                    </div>
                                </div>
                            )) : <p> No Data </p>
                        }
                    </div>
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
                            <div className="btn primary text-center" onClick={handleSubmit(onSubmit)}>
                                {isSubmit ? <DataLoading/> : "Save"}
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </Layout>
    );
};

// User.getInitialProps = async () => {
//     // const app_uri = process.env.APP_URI
//     // console.log(app_uri)
//     const res = await axios.get('http://localhost:3000/api/user');
//     return {
//         users: res.data.data
//     }
// }

export async function getServerSideProps(context) {
    const {req, res} = context;
    const {token} = getAppCookies(req);
    if (!token) {
        res.setHeader("location", "/");
        res.statusCode = 302;
        res.end();
        return {
            props: {
                users: []
            },
        };
    }
    const userList = await axios.get(`http://localhost:3000/api/user`);
    return {
        props: {
            token,
            users: userList.data.data
        },
    };

}

export default User;
