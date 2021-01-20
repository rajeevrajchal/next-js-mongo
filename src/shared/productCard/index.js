import styles from '../../styles/Home.module.scss'
import Image from "next/image"
import Link from "next/link"

const ProductCard = () => {
    return (
        <Link href={'/product/1'}>
        <div className={`card ${styles.productCard} pointer`}>
            <div className={styles.productImg}>
                <Image
                    alt={"logo"}
                    src={`https://cdn.pixabay.com/photo/2014/05/02/21/50/laptop-336378__480.jpg`}
                    width={250}
                    height={100}
                    objectFit="cover"
                    loading="lazy"
                />
            </div>
            <div className={styles.productDesc}>
                <div className="sub-title bold">Macbook Air 2015</div>
                <div className="description flex justify-between mt-sm">
                    <div className="label">
                        Price
                    </div>
                    <div className="value bold">
                        300$
                    </div>
                </div>
                <div className="description mt-sm">
                    Mac book air with 8gb RAM and 256gb SSD
                </div>
            </div>
        </div>
        </Link>
    );
};

export default ProductCard;
