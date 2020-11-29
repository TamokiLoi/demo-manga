import { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState } from 'react';
import AdBanner from '../../../../components/adBanner';
import ChapterListNavigation from '../../../../components/chapter-list-navigation';
import Meta from '../../../../components/meta';
import Warning18Plus from '../../../../components/warning-18plus';
import CONSTANT from '../../../../lib/constant';
import { GetStaticPaths, GetStaticProps } from 'next';

type Props = {
    data: any;
};

const ChapterPage: NextPage<Props> = ({ data }) => {

    const router = useRouter();

    const chapterDetail = data.chapter;
    const storyDetail = data.story;
    const images = chapterDetail.image;
    const { chapters } = storyDetail;

    const [loadImageEl, setLoadImageEl] = useState(null);
    const [isShowWarningByGenres, setIsShowWarningByGenres] = useState(storyDetail.is18_plus);

    useEffect(() => {
        setLoadImageEl(null);
    }, [router]);

    useEffect(() => {
        setIsShowWarningByGenres(storyDetail.is18_plus);
        const listItemImage = images.map((image, index) =>
            <img
                key={index}
                src={image}
                alt={`${chapterDetail.name} image ${index + 1}`}
                className="lazyLoadImage"
            />
        );
        setLoadImageEl(listItemImage);
    }, [data]);

    return (
        <>
            <Meta
                title={`${storyDetail.title} - ${chapterDetail.name} - ${CONSTANT.MANGA} - ${CONSTANT.READ_MANGA_ONLINE} - ${CONSTANT.LAKEMANGA}`}
                description={`${storyDetail.description}`}
                image={images[0]}
            />
            <section id="content">
                <div className="content-wrap manga-chapter-page content-wrap-chapter-custom" style={{ padding: '10px 0 20px 0 !important' }}>

                    {/* content-main */}
                    <div className="container clearfix index-page">
                        <div className="row gutter-40">

                            {/* content-main */}
                            <div className="col-lg-12">

                                {/* adWordBanner */}
                                <div className="mb-3">
                                    <AdBanner />
                                </div>

                                {/* breadcrumb-top */}
                                <div className="breadcrumb-title mb-2 breadcrumb-custom">
                                    <h2 className="title title-manga" title="<%= chapterDetail.name %>">
                                        <span>
                                            {/* <Link href="/">
                                                <a title={CONSTANT.HOME} className="breadcrumbs-home">
                                                    <span>{CONSTANT.HOME}</span>
                                                </a>
                                            </Link> */}
                                            <a title={CONSTANT.HOME} className="breadcrumbs-home">
                                                <span>{CONSTANT.HOME}</span>
                                            </a>
                                        </span>
                                        <span style={{ color: 'white' }}> » </span>
                                        <span>
                                            {/* <Link href={storyDetail.ulr}>
                                                <a title={storyDetail.title} className="breadcrumbs-home">
                                                    <span>{storyDetail.title}</span>
                                                </a>
                                            </Link> */}
                                            <a href={storyDetail.ulr} title={storyDetail.title} className="breadcrumbs-home">
                                                <span>{storyDetail.title}</span>
                                            </a>
                                        </span>
                                        <span style={{ color: 'white' }}> » </span>
                                        <span>{chapterDetail.name}</span>
                                    </h2>
                                </div>

                                {/* info-chapter */}
                                <div className="info-chapter row mb-2">
                                    <div className="info-chapter-bg col-12" style={{ paddingTop: '5px', paddingBottom: '5px' }}>
                                        <h1 className="chapter-name">{storyDetail.title} - {chapterDetail.name}</h1>
                                    </div>
                                </div>

                                {/* warning by genres */}
                                {
                                    (isShowWarningByGenres == 1) &&
                                    (
                                        <div className="mt-2 mb-2">
                                            <Warning18Plus />
                                        </div>
                                    )
                                }

                                {/* option-list-chapter-top */}
                                <ChapterListNavigation chapters={chapters} chapterDetail={chapterDetail} />

                                {/* chapter-detail */}
                                <div className="mb-2 chapter-detail">
                                    <div className="row">
                                        <div className="col-12 chapter-detail-read">
                                            {loadImageEl}
                                        </div>
                                    </div>
                                </div>

                                {/* option-list-chapter-bottom */}
                                <ChapterListNavigation chapters={chapters} chapterDetail={chapterDetail} />

                                {/* adWordBanner */}
                                <div className="mb-3">
                                    <AdBanner />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export async function getServerSideProps({ params }) {
    const res = await fetch(`http://66.152.189.94:8083/v1/client/chapter/${params.idChapter.split('-').pop()}`)
    const { data } = await res.json();
    return {
        props: {
            data,
        },
    };
}

// export const getStaticPaths: GetStaticPaths = async (query) => {
//     console.log(query);
    
//     const res = await fetch(`http://66.152.189.94:8083/v1/client/story/25`)
//     const { data } = await res.json();
//     const { storyDetail } = data;
//     const { chapters } = storyDetail;
//     let list = [];
//     chapters.map((chapter) => {
//         list.push({
//             params: {
//                 idStory: `${storyDetail.url.split('/').pop()}`,
//                 idChapter: `${chapter.url.split('/').pop()}`
//             }
//         })
//     })
//     const paths = list;
//     // console.log(list);
    
//     return {
//         paths: paths,
//         fallback: false,
//     };
// };

// export const getStaticProps: GetStaticProps = async ({params}) => {
//     const res = await fetch(`http://66.152.189.94:8083/v1/client/chapter/${params.idChapter.split('-').pop()}`)
//     const { data } = await res.json();
//     return {
//         props: {
//             data: data,
//         },
//     };
// }

export default ChapterPage;
