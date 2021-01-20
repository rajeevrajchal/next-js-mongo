import Image from 'next/image'
import Link from 'next/link'
import styles from './nav.module.scss'
import {useRef, useState, useEffect} from 'react'

const Nav = () => {
    const [scrolled, setScrolled] = useState(false);
    const navRef = useRef();
    navRef.current = scrolled;

    useEffect(() => {
        const handleScroll = () => {
            const show = window.scrollY > 20;
            if (show) {
                setScrolled(true)
            } else {
                setScrolled(false);
            }
        }
        document.addEventListener('scroll', handleScroll)
        return () => {
            document.removeEventListener('scroll', handleScroll)
        }
    }, []);
    return (
        <nav className={`${styles.navbar} ${scrolled ? `${styles.scrolled}` : ''} flex justify-between align-between items-center`}>
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
                    <Link href={"/product"}>
                        Product
                    </Link>
                </div>
                <div className="nav-menu-item capitalize sub-title bold mr-lg">
                    <Link href={"/user"}>
                        User
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Nav;
