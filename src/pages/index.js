import styles from '../styles/Home.module.scss'
import Layout from "../hoc/layout";
import SignIn from "../shared/auth/signin";
import {getAppCookies, verifyToken} from "../middleware/auth";

export default function Home(props) {
    const {
        token
    } = props
    return (
        <Layout
            title={"Next TS"}
            description={'this is next js'}
            keywords={['js', "nextjs"]}
        >
            <main className={styles.landing}>
                <div className={styles.welcomeBanner}>
                    <div className={styles.welcomeBannerText}>
                        <div className={`title bold uppercase`}>
                            <p>this is Next Js</p>
                        </div>
                        <SignIn/>
                    </div>
                </div>
            </main>
        </Layout>
    )
}

export async function getServerSideProps(context) {
    const {req,res} = context;
    const {token} = getAppCookies(req);
    if(token){
        res.setHeader("location", "/product");
        res.statusCode = 302;
        res.end();
    }
    return {
        props: {},
    };
}
