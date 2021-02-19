import {useEffect} from 'react'
import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
    static async getInitialProps(ctx) {
        console.log(ctx)
        const initialProps = await Document.getInitialProps(ctx)
        const {pathname} = ctx
        return { ...initialProps }
    }

    render() {
        const currentLang = ["fr", "fr_CA", "fr_ca", "fr-CA"].includes("fr")
            ? "fr-CA" : "en";

        return (
            <Html lang={currentLang}>
                <Head />
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}

export default MyDocument