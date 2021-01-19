import styles from '../styles/Home.module.scss'
import Layout from "../hoc/layout";

export default function Home() {
    return (
        <Layout
            title={"Next TS"}
            description={'this is next js'}
            keywords={['js', "nextjs"]}
        >
            <main className={styles.landing}>
                <div className={styles.welcomeBanner}>
                    <div className={`${styles.welcomeBannerText} title bold uppercase`}>
                        <p>this is Next Js</p>
                    </div>
                </div>
            </main>
        </Layout>
    )
}
