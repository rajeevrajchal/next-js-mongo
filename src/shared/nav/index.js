import Image from 'next/image'
import Link from 'next/link'
import styles from './nav.module.scss'
import {useRef, useState, useEffect} from 'react'
import {getAppCookies,setLogout} from "../../middleware/auth";

const Nav = (props) => {
    const {
        token
    } = props
    const [scrolled, setScrolled] = useState(false);
    const [loginUser, setLoginUser] = useState({})
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

    useEffect(() => {
        setLoginUser(JSON.parse(localStorage.getItem('loginUser')))
    },[])

    const handleLogout = async (e) => {
        await localStorage.removeItem('loginUser')
        setLogout(e)
    }
    return (
        <nav
            className={`${styles.navbar} ${scrolled ? `${styles.scrolled}` : ''} flex justify-between align-between items-center`}>
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
                {
                    loginUser &&
                  (
                        <div onClick={(e) => handleLogout(e)} className="nav-menu-item capitalize sub-title bold mr-lg pointer">
                            Logout
                        </div>
                    )
                }
            </div>
        </nav>
    );
};

export default Nav;

export async function getServerSideProps(context) {
    const {req} = context;
    const {token} = getAppCookies(req);
    return {
        props: {
            token:token,
        },
    };
}

