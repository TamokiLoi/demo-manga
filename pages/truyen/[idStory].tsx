import { format } from 'date-fns';
import { NextPage } from 'next';
import Link from 'next/link';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import AdBanner from '../../components/adBanner';
import Description from '../../components/description';
import Meta from '../../components/meta';
import RightBar from '../../components/rightBar';
import SlideBar from '../../components/slideBar';
import Warning18Plus from '../../components/warning-18plus';
import CONSTANT from '../../lib/constant';

type Props = {
    data: any;
    deviceType: any;
};

const StoryPage: NextPage<Props> = ({ data, deviceType }) => {

    const { storyDetail } = data;
    const { chapters } = storyDetail;
    const { authors } = storyDetail;
    const { genres } = storyDetail;

    const [isShowMore, setIsShowMore] = useState(false);
    const [isToggleBtnShowMore, setIsToggleBtnShowMore] = useState(false);
    const [isShowWarningByGenres, setIsShowWarningByGenres] = useState(storyDetail.is18_plus);
    const [renderRightBar, setRenderRightBar] = useState(null);

    const divDescriptionEl = useRef(null);
    const spanShowMoreEl = useRef(null);

    useEffect(() => {
        (divDescriptionEl.current.innerHTML.length > 370) ? setIsShowMore(true) : setIsShowMore(false);
        setIsShowWarningByGenres(storyDetail.is18_plus);
    }, [data]);

    let listItemAuthor;
    if (authors) {
        listItemAuthor = authors.map((author, index) => {
            const urlAuthor = author.name.toLowerCase().split(' ').join('-');
            return (
                <span key={`${author.id} - ${index + 1}`} style={{ marginRight: '5px' }}>
                    {/* <Link href={`/tim-kiem/tac-gia=${urlAuthor}-${author.id}`}>
                        <a className="badge badge-info">
                            {author.name}
                        </a>
                    </Link> */}
                    <a href={`/tim-kiem/tac-gia=${urlAuthor}-${author.id}`} className="badge badge-info">
                        {author.name}
                    </a>
                </span>
            )
        });
    }

    let listItemGenres;
    if (genres) {
        listItemGenres = genres.map((genre, index) => {
            const urlGenre = genre.name.toLowerCase().split(' ').join('-');
            return (
                <span key={`${genre.id} - ${index + 1}`} style={{ marginRight: '5px' }}>
                    {/* <Link href={`/tim-kiem/the-loai=${urlGenre}-${genre.id}`}>
                        <a className="badge badge-info">
                            {genre.name}
                        </a>
                    </Link> */}
                    <a href={`/tim-kiem/the-loai=${urlGenre}-${genre.id}`} className="badge badge-info">
                        {genre.name}
                    </a>
                </span>
            )
        });
    }

    let listItemChapter
    if (chapters) {
        listItemChapter = chapters.map((chapter, index) =>
            <div className="row" key={`${chapter.id} - ${index + 1}`}>
                <div className="col-8 col-md-8">
                    {/* <Link href={chapter.url}>
                        <a className="chapter-name text-nowrap link-infor" title={chapter.name}>
                            {chapter.name}
                        </a>
                    </Link> */}
                    <a href={chapter.url} className="chapter-name text-nowrap link-infor" title={chapter.name}>
                        {chapter.name}
                    </a>
                </div>
                <div className="col-md-2 manga-view">
                    {chapter.views}
                </div>
                <div className="col-4 col-md-2">
                    {format(new Date(chapter.created_at), 'dd/MM/yyyy')}
                </div>
            </div>
        );
    }

    const handleToggleBtnShowMore = () => {
        setIsToggleBtnShowMore(!isToggleBtnShowMore)
        if (isToggleBtnShowMore) {
            spanShowMoreEl.current.innerHTML = CONSTANT.SHOW_MORE;
            divDescriptionEl.current.classList.add('hide-content');
        } else {
            spanShowMoreEl.current.innerHTML = CONSTANT.SHOW_LESS;
            divDescriptionEl.current.classList.remove('hide-content');
        }
    }

    useEffect(() => {
        handleRenderRightbar(deviceType);
    }, [deviceType.desktop]);

    const handleRenderRightbar = useCallback((deviceType) => {
        const newRenderRightBar = deviceType.desktop ? (
            <div className="col-lg-4 content-right">
                <RightBar />
            </div>
        ) : null;
        setRenderRightBar(newRenderRightBar);
    }, []);

    return (
        <>
            <Meta
                title={`${storyDetail.title} - ${CONSTANT.UPDATED} ${storyDetail.chapters[0].name} - ${CONSTANT.MANGA} - ${CONSTANT.READ_MANGA_ONLINE} - ${CONSTANT.LAKEMANGA}`}
                description={`${storyDetail.description}`}
                image={storyDetail.image}
            />
            <section id="content">
                <div className="content-wrap content-wrap-custom" style={{ padding: '0px 0px 20px !important' }}>
                    {/* slide */}
                    {/* <div className="container clearfix" style={{padding: '0 6px'}}>
                        <SlideBar />
                    </div> */}

                    {/* content-main */}
                    <div className="container clearfix index-page">
                        <div className="row gutter-40">
                            {/* content-left */}
                            <div className="col-lg-8 content-left">

                                {/* adWordBanner */}
                                <div className="mb-3">
                                    <AdBanner />
                                </div>

                                {/* breadcrumb */}
                                <div className="breadcrumb-title mb-2">
                                    <h2 className="title title-manga" title={storyDetail.title}>
                                        <span>
                                            {/* <Link href="/">
                                                <a title={CONSTANT.HOME} className="breadcrumbs-home">
                                                    <span>{CONSTANT.HOME}</span>
                                                </a>
                                            </Link> */}
                                            <a href="/" title={CONSTANT.HOME} className="breadcrumbs-home">
                                                <span>{CONSTANT.HOME}</span>
                                            </a>
                                        </span>
                                        <span style={{ color: 'white' }}> » </span>
                                        <span>{storyDetail.title}</span>
                                    </h2>
                                </div>

                                {/* info manga */}
                                <div className="mt-1 info-manga-panel">
                                    <div className="entry entry-info-manga row">
                                        <div className="col-12 text-center">
                                            <h1>{storyDetail.title}</h1>
                                        </div>
                                        <div className="col-12 col-md-12 no-pad image-manga-div">
                                            <div className="entry-image mb-0 image-manga">
                                                <img src={storyDetail.image} alt={storyDetail.title} style={{ width: '14.0625rem', margin: '0 auto' }} />
                                            </div>
                                        </div>
                                        <div className="col-12 col-md-12 description-content">
                                            <h3 className="story-alternative mb-0 h-description"><strong className="color-red">{CONSTANT.DESCRIPTION} :</strong></h3>
                                            <div style={{ margin: 0 }} id="description_content" className="hide-content" ref={divDescriptionEl}>
                                                <Description html={storyDetail.description} />
                                            </div>
                                            <p className="mb-0 text-center" style={{ marginTop: '5px' }}>
                                                {
                                                    isShowMore &&
                                                    <button className="btn btn-outline-info" onClick={() => handleToggleBtnShowMore()}>
                                                        {
                                                            !isToggleBtnShowMore &&
                                                            <i className="icon-angle-down" />
                                                        }
                                                        {
                                                            isToggleBtnShowMore &&
                                                            <i className="icon-angle-up" />
                                                        } <span className="toggle_text" ref={spanShowMoreEl}>
                                                            {CONSTANT.SHOW_MORE}
                                                        </span>
                                                    </button>
                                                }
                                            </p>
                                        </div>
                                        <div className="col-12 col-md-12">
                                            <ul className="manga-info-text">
                                                <li>
                                                    <h2 className="story-alternative mb-0">
                                                        <strong>{CONSTANT.ALTERNATIVE}</strong> : {storyDetail.alternative}
                                                    </h2>
                                                </li>
                                                <li>
                                                    <p className="mb-0">
                                                        <strong>{CONSTANT.AUTHOR}</strong> : {listItemAuthor}
                                                    </p>
                                                </li>
                                                <li>
                                                    <p className="mb-0">
                                                        <strong>{CONSTANT.GENRES}</strong> : {listItemGenres}
                                                    </p>
                                                </li>
                                                <li>
                                                    <p className="mb-0">
                                                        <strong>
                                                            {CONSTANT.SOURCE}
                                                        </strong> : <span className="badge badge-secondary">
                                                            {storyDetail.source}
                                                        </span>
                                                    </p>
                                                </li>
                                                {
                                                    storyDetail.source_raw &&
                                                    <li>
                                                        <p className="mb-0">
                                                            <strong>
                                                                {CONSTANT.SOURCE_RAW}
                                                            </strong> : <span className="badge badge-secondary">
                                                                {storyDetail.source_raw}
                                                            </span>
                                                        </p>
                                                    </li>
                                                }
                                                {
                                                    storyDetail.translate_team &&
                                                    <li>
                                                        <p className="mb-0">
                                                            <strong>
                                                                {CONSTANT.TRANSLATION_TEAM}
                                                            </strong> : <span className="badge badge-secondary">
                                                                {storyDetail.translate_team}
                                                            </span>
                                                            {/* TODO: update after */}
                                                            {/* <span>
                                                                <a href="#" class="link-infor" style="pointer-events: none;">
                                                                    <%# storyDetail.translate_team %>
                                                                </a>
                                                            </span>, */}
                                                        </p>
                                                    </li>
                                                }
                                                <li>
                                                    <p className="mb-0">
                                                        <strong>
                                                            {CONSTANT.STATUS}
                                                        </strong> : {
                                                            (storyDetail.status == 0) &&
                                                            <span className="badge badge-primary">
                                                                {CONSTANT.ON_GOGING}
                                                            </span>
                                                        }
                                                        {
                                                            (storyDetail.status == 1) &&
                                                            <span className="badge badge-success">
                                                                {CONSTANT.ON_COMPLETE}
                                                            </span>
                                                        }
                                                        {
                                                            (storyDetail.status == 2) &&
                                                            <span className="badge badge-danger">
                                                                {CONSTANT.ON_PENDING}
                                                            </span>
                                                        }
                                                    </p>
                                                </li>
                                                <li>
                                                    <p className="mb-0">
                                                        <strong>
                                                            {CONSTANT.VIEWS}
                                                        </strong> : <span className="font-info">
                                                            {storyDetail.views}
                                                        </span>
                                                    </p>
                                                </li>
                                                <li>
                                                    <p className="mb-0">
                                                        <strong>
                                                            {CONSTANT.COUNT_BOOKMARK}
                                                        </strong> : <span className="font-info">
                                                            {storyDetail.views}
                                                        </span>
                                                    </p>
                                                </li>
                                                <li>
                                                    <p className="mb-0">
                                                        <strong>
                                                            {CONSTANT.LAST_UPDATED}
                                                        </strong> : <span className="font-info">
                                                            {format(new Date(storyDetail.updated_at), 'dd/MM/yyyy, HH:mm')}.
                                                        </span>
                                                    </p>
                                                </li>
                                                {/* TODO: update later */}
                                                {/* <li>
                                                    <p className="mb-0">
                                                        <button className="btn-link btn-followed">
                                                            <i className="fa fa-plus"></i>
                                                            Bookmark</button>
                                                    </p>
                                                </li> */}
                                                <li>
                                                    {/* <Link href={chapters[chapters.length - 1].url}>
                                                        <a className="btn btn-outline-info btn-read-story" style={{ marginRight: '5px' }}>
                                                            {CONSTANT.READ_FIRST_CHAPTER}
                                                        </a>
                                                    </Link>
                                                    <Link href={chapters[0].url}>
                                                        <a className="btn btn-outline-info btn-read-story">
                                                            {CONSTANT.READ_LAST_CHAPTER}
                                                        </a>
                                                    </Link> */}
                                                    <a href={chapters[chapters.length - 1].url} className="btn btn-outline-info btn-read-story" style={{ marginRight: '5px' }}>
                                                        {CONSTANT.READ_FIRST_CHAPTER}
                                                    </a>
                                                    <a href={chapters[0].url} className="btn btn-outline-info btn-read-story">
                                                        {CONSTANT.READ_LAST_CHAPTER}
                                                    </a>
                                                </li>
                                            </ul>
                                            {/* warning by genres */}
                                        </div>
                                    </div>
                                </div>

                                {/* warning by genres */}
                                {
                                    (isShowWarningByGenres == 1) &&
                                    (
                                        <div className="mt-3 mb-3">
                                            <Warning18Plus />
                                        </div>
                                    )
                                }

                                {/* list chapters */}
                                <div className="mt-3 mb-3">
                                    <div className="row entry-info-manga">
                                        <div className="col-12 manga-chapter-list-title">
                                            <div className="row" style={{ fontWeight: 'bold' }}>
                                                <div className="col-8 col-md-8">
                                                    {CONSTANT.LIST_CHAPTER} ({storyDetail.chapters.length})
                                                </div>
                                                <div className="col-md-2 manga-view">
                                                    {CONSTANT.VIEW}
                                                </div>
                                                <div className="col-4 col-md-2 text-center" style={{ padding: '0 8px' }}>
                                                    {CONSTANT.DATE_UPLOAD}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-12" id="manga-chapter-list">
                                            {listItemChapter}
                                        </div>
                                    </div>
                                </div>

                                {/* adWordBanner */}
                                {/* <div className="mb-3">
                                    <AdBanner />
                                </div> */}
                            </div>

                            {/* content-right */}
                            {renderRightBar}

                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export async function getServerSideProps({ params }) {
    const res = await fetch(`http://66.152.189.94:8083/v1/client/story/${params.idStory.split('-').pop()}`)
    const { data } = await res.json()
    return {
        props: {
            data,
        },
    };
}

// export async function getStaticPaths() {
//     // Return a list of possible value for id
//     const res = await fetch(`http://66.152.189.94:8083/v1/client/get-list-newest?offset=0&limit=1000000`)
//     const { data } = await res.json();
//     const { List, Total } = data;
//     const list = [];
//     List.map((story) => {
//         list.push({
//             params: {
//                 idStory: `${story.url.split('/').pop()}`
//             }
//         })
//     })
//     const paths = list;
//     return {
//         paths,
//         fallback: false
//     }
// }


// export async function getStaticProps({ params }) {
//     const res = await fetch(`http://66.152.189.94:8083/v1/client/story/${params.idStory.split('-').pop()}`)
//     const { data } = await res.json()
//     return {
//         props: {
//             data,
//         },
//     };
// }

export default StoryPage;
