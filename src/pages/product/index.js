import Layout from "../../hoc/layout";
import styles from "../../styles/Home.module.scss"
import ProductCard from "../../shared/productCard";

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
