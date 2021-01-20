import dynamic from 'next/dynamic'
import styles from "../../styles/Home.module.scss"
import PageLoader from "../../partials/pageLoader";
import DataLoading from "../../partials/dataLoading";

const Layout = dynamic(() => import("../../hoc/layout"),
    {loading: () => <PageLoader/>}
)
const ProductCard = dynamic(() => import("../../shared/productCard"),
    {loading: () => <DataLoading/>}
)


const Product = () => {
    return (
        <Layout
            title={"Next TS:Products"}
            description={'listing of products'}
            keywords={['js', "nextjs"]}
        >
            <section className={styles.products}>
                <div className={styles.productList}>
                    <ProductCard/>
                    <ProductCard/>
                    <ProductCard/>
                    <ProductCard/>
                    <ProductCard/>
                    <ProductCard/>
                    <ProductCard/>
                    <ProductCard/>
                    <ProductCard/>
                    <ProductCard/>
                    <ProductCard/>
                    <ProductCard/>
                    <ProductCard/>
                    <ProductCard/>
                    <ProductCard/>
                    <ProductCard/>
                </div>
            </section>

        </Layout>
    );
};

export default Product;
