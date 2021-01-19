import Head from 'next/head';
import Footer from "../shared/footer";
import Nav from "../shared/nav";

const Layout = (pageProps) => {
    const {
        children,
        title,
        description,
        keywords,
        type,
        url,
        image,
        origin
    } = pageProps
    return (
        <>
            <Head>
                <meta charSet="utf-8"/>
                <title>{title}</title>
                <meta name="robots" content="index, follow"/>
                <meta name="description" content={description}/>
                <meta name="keywords" content={keywords}/>
                <meta
                    property="twitter:image:src"
                    content={`${origin}${image}?v=${Math.floor(Date.now() / 100)}`}
                />
                <meta property="twitter:card" content="summary"/>
                <meta property="twitter:url" content={url}/>
                <meta property="twitter:title" content={title}/>
                <meta property="twitter:description" content={description}/>
                <meta
                    property="og:image"
                    content={`${origin}${image}?v=${Math.floor(Date.now() / 100)}`}
                />
                <meta property="og:site_name" content={url}/>
                <meta property="og:type" content={type}/>
                <meta property="og:title" content={title}/>
                <meta property="og:url" content={url}/>
                <meta property="og:description" content={description}/>
                <link rel="icon" href="/favicon.ico"/>
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1, shrink-to-fit=no"
                />
                <link
                    href="https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500;600;700&display=swap"
                    rel="stylesheet"
                />
            </Head>
            <Nav/>
            {
                children
            }
            <Footer/>
        </>
    );
};

export default Layout;
