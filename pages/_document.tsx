import Document, { Head, Html, Main, NextScript } from 'next/document';

export default class CustomDocument extends Document {
    render() {
        return (
            <Html dir="ltr" lang="en">
                <Head>
                </Head>
                <body className="stretched">
                    <Main />
                    <NextScript />
                </body>

                {/* Go To Top */}
                <div id="gotoTop" className="icon-angle-up"></div>

                {/* JavaScripts */}
                {/* <script src="/js/jquery.js"></script>
                <script src="/js/plugins.min.js"></script> */}

                {/* Footer Scripts */}
                {/* <script src="/js/functions.js"></script> */}

                {/* Custom Scripts */}
                {/* <script src="/js/custom.js"></script> */}

                {/* common js */}
                <script src="/js/common.min.js"></script>
            </Html>
        );
    }
}
