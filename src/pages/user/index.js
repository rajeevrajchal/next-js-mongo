import styles from './user.module.scss'
import axios from "axios";
import {useRouter} from 'next/router';
import {useState, useEffect} from 'react'
import dynamic from "next/dynamic";
import PageLoader from "../../partials/pageLoader";
import DataLoading from "../../partials/dataLoading";
import {getAppCookies, verifyToken} from "../../middleware/auth";
import Register from "../../shared/auth/register";

const Layout = dynamic(() => import("../../hoc/layout"),
    {loading: () => <PageLoader/>}
)

const User = (pageProps) => {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const {
        users
    } = pageProps

    const refreshData = () => {
        router.replace(router.asPath);
    }

    useEffect(() => {
        setLoading(false)
    }, [users])


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
                    <Register/>
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

// export async function getServerSideProps(context) {
//     const {req, res} = context;
//     const {token} = getAppCookies(req);
//     if (!token) {
//         res.setHeader("location", "/");
//         res.statusCode = 302;
//         res.end();
//         return {
//             props: {
//                 users: []
//             },
//         };
//     }
//     const userList = await axios.get(`http://localhost:3000/api/user`);
//     return {
//         props: {
//             token,
//             users: userList.data.data
//         },
//     };
//
// }

export default User;
