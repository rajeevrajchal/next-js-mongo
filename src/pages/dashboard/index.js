import Layout from "../../hoc/layout";
import styles from './dashboard.module.scss'
import axios from "axios";


const Dashboard = (pageProps) => {
    const {
        users
    } = pageProps
    return (
        <Layout
            title={"Next Dashboard"}
            description={'this is next js'}
            keywords={['js', "nextjs"]}
        >
            <div className={styles.dashboard}>
               <section className={styles.userList}>
                   {
                       users.map((user, index) => (
                           <div className="card mb-lg pa-md text-center" key={user._id}>
                               <div>
                                   {user.user_name}
                               </div>
                               <div>
                                   {user.email}
                               </div>
                           </div>
                       ))
                   }
               </section>
            </div>
        </Layout>
    );
};

Dashboard.getInitialProps = async () => {
    const res = await axios.get('http://localhost:3000/api/user');
    return {
        users: res.data.data
    }
}

export default Dashboard;
