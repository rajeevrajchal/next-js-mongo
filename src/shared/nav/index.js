import Image from 'next/image'
import Link from 'next/link'
import styles from './nav.module.scss'

const Nav = () => {
    return (
        <nav className={`${styles.navbar} flex justify-between align-between items-center`}>
            <div className="logo">
                <Image
                    alt={"logo"}
                    src={`/vercel.svg`}
                    width={150}
                    height={20}
                    quality={75}
                />
            </div>
            <div className="nav-menus flex">
                <div className="nav-menu-item capitalize sub-title bold mr-lg">
                    <Link href={"/"}>
                        Home
                    </Link>
                </div>
                <div className="nav-menu-item capitalize sub-title bold mr-lg">
                    About
                </div>
                <div className="nav-menu-item capitalize sub-title bold mr-lg">
                    <Link href={"/dashboard"}>
                        Dashboard
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Nav;
