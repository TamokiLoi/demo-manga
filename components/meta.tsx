import Head from 'next/head';
import React from 'react';
import { useConvertHtmlToText } from '../lib/convert-html-to-text';

type SeoProps = {
    title: string;
    description: string;
    canonical?: string;
    css?: string;
    js?: string;
    image?: string;
};

const Meta: React.FC<SeoProps> = ({
    title,
    description,
    canonical,
    css,
    js,
    image,
}) => (
        <Head>
            <meta
                name="viewport"
                content="width=device-width,minimum-scale=1,initial-scale=1"
            />
            <meta property="og:type" content="website" />
            <meta name="og:title" property="og:title" content={title} />
            <meta
                name="og:description"
                property="og:description"
                content={useConvertHtmlToText(description)}
            />
            <meta name="description" content={useConvertHtmlToText(description)} />
            <meta property="og:site_name" content="lakemanga.com" />
            <meta property="og:url" content="lakemanga.com" />
            <meta name="twitter:card" content="lakemanga" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={useConvertHtmlToText(description)} />
            <meta name="twitter:site" content="lakemanga" />
            <meta name="twitter:creator" content="lakemanga" />
            {css && <link rel="stylesheet" href={`${css}`} />}
            {image ? (
                <meta property="og:image" content={`${image}`} />
            ) : (
                    <meta
                        property="og:image"
                        content="/images/manga/logo-lake-manga.png"
                    />
                )}
            {image && <meta name="twitter:image" content={`${image}`} />}
            {canonical && <link rel="canonical" href={`${canonical}`} />}
            {js && <script type="text/javascript" src={`${js}`}></script>}

            <link rel="icon" type="image/png" href="/images/manga/logo-lake-manga.png" />
            <link rel="stylesheet" href="/css/common.min.css" type="text/css" />

            <title>{title}</title>
        </Head>
    );

export default Meta;
