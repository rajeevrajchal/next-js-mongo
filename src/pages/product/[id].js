import React from 'react';
import Layout from "../../hoc/layout";
import {useRouter} from 'next/router'
import style from '../../styles/Home.module.scss'
import styles from "../../styles/Home.module.scss";
import Image from "next/image";

const ProductDetail = () => {
    const router = useRouter()
    const {id} = router.query
    console.log(id)
    return (
        <Layout
            title={"Next TS:Product Detail"}
            description={'listing of products'}
            keywords={['js', "nextjs"]}
        >
            <section className={style.productDetails}>
                <div className="flex wrap">
                    <div className={style.productImages}>
                        <Image
                            alt={"logo"}
                            src={`https://cdn.pixabay.com/photo/2014/05/02/21/50/laptop-336378__480.jpg`}
                            width={250}
                            height={250}
                            objectFit="contain"
                            loading="lazy"
                        />
                    </div>
                    <div className={style.productDescription}>
                        <div className={styles.productDesc}>
                            <div className="sub-title bold">Macbook Air 2015</div>
                            <div className="sub-title bold">Product Id {id}</div>
                            <div className="description flex justify-between mt-sm">
                                <div className="label">
                                    Price
                                </div>
                                <div className="value bold">
                                    300$
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="description mt-xl">
                    Every Mac comes with a one-year limited warranty and up to
                    90 days of complimentary telephone technical support. Extend
                    your coverage to three years from your Mac original purchase
                    date with the AppleCare Protection Plan. You’ll get direct,
                    one-stop access to Apple’s award-winning technical support for
                    questions about your Mac, macOS, and Apple-branded applications
                    such as Photos, iMovie, GarageBand, Pages, Numbers, Keynote, and
                    more. In addition, you’ll get 24/7 priority access to Apple experts
                    via chat or phone through getsupport.apple.com. You can even get local
                    repair service when you visit other countries around the world.
                </div>
            </section>
        </Layout>
    );
};

export default ProductDetail;
