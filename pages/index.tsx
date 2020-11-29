import { format } from 'date-fns';
import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';
import AdBanner from '../components/adBanner';
import Meta from '../components/meta';
import PaginationCustom from '../components/pagination';
import RightBar from '../components/rightBar';
import CONSTANT from '../lib/constant';
import PAGINATION_DATA from '../lib/constant-data/pagination-data';
import SlideBar from '../components/slideBar';
import { sitePages } from '../lib/site-settings/site-pages';

type Props = {
    data: any;
    deviceType: any;
};

const IndexPage: React.FC<Props> = ({ data, deviceType }) => {

    const page = sitePages['home'];
    const { List, Total } = data;

    const [renderRightBar, setRenderRightBar] = useState(null);

    const listItemStoriesNew = List.map((story) =>
        <div className="entry col-12 col-md-6 mb-2 manga-panel" key={story.id}>
            <div className="row row-manga-panel">
                <div className="col-4 col-md-4">
                    <div className="entry-image mb-0 manga-panel-img">
                        {/* <Link href={story.url}>
                            <a>
                                <img src={story.image} alt={story.title} style={{ maxHeight: '8.375rem' }} />
                            </a>
                        </Link> */}
                        <a href={story.url}>
                            <img src={story.image} alt={story.title} style={{ maxHeight: '8.375rem' }} />
                        </a>
                    </div>
                </div>
                <div className="col-8 col-md-8 no-pad" style={{ marginLeft: '-5px', paddingRight: '5px' }}>
                    <div className="entry-title title-sm mt-md-0 manga-panel-title">
                        <h3 title={story.title}>
                            {/* <Link href={story.url}>
                                <a >
                                    {story.title}
                                </a>
                            </Link> */}
                            <a href={story.url}>
                                {story.title}
                            </a>
                        </h3>
                    </div>
                    {/* <Link href={story.chapter[0].url}>
                        <a title={story.chapter[0].name} className="link-chapter limit-text">
                            <span> » </span> {story.chapter[0].name}
                        </a>
                    </Link> */}
                    <a href={story.chapter[0].url} title={story.chapter[0].name} className="link-chapter limit-text">
                        <span> » </span> {story.chapter[0].name}
                    </a>
                    {/* {
                        story.chapter[1] && (
                            <Link href={story.chapter[1].url}>
                                <a title={story.chapter[1].name} className="link-chapter limit-text">
                                    <span> » </span> {story.chapter[1].name}
                                </a>
                            </Link>
                        )
                    } */}
                    <span>
                        {/* <strong>{CONSTANT.AUTHOR}</strong> : <Link href={`/tim-kiem/tac-gia=${story.author.name.toLowerCase().split(' ').join('-')}-${story.author.id}`}>
                            <a className="badge badge-info">
                                {story.author.name}
                            </a>
                        </Link> */}
                        <strong>{CONSTANT.AUTHOR}</strong> : <a href={`/tim-kiem/tac-gia=${story.author.name.toLowerCase().split(' ').join('-')}-${story.author.id}`} className="badge badge-info">
                            {story.author.name}
                        </a>
                    </span>
                    <br />
                    <span className="number-view">
                        <strong>
                            {CONSTANT.VIEWS}
                        </strong> : <span className="font-info">
                            {story.views}
                        </span>
                    </span>
                    <br />
                    <span className="updated-at-page-search">
                        <strong>
                            {CONSTANT.LAST_UPDATED}
                        </strong> : <span className="font-info">
                            {format(new Date(story.updated_at), 'dd/MM/yyyy, HH:mm')}
                        </span>
                    </span>
                    <br />
                    {/* <Link href={story.url} >
                        <a className="btn-link btn-show-more">
                            {CONSTANT.SHOW_MORE}
                        </a>
                    </Link> */}
                    <a href={story.url} className="btn-link btn-show-more">
                        {CONSTANT.SHOW_MORE}
                    </a>
                </div>
            </div>
        </div>
    );

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
            <Meta title={page?.page_title} description={page?.page_description} />
            <section id="content">
                <div className="content-wrap index-page content-wrap-custom" style={{ padding: '0px 0px 20px !important' }}>
                    {/* slide */}
                    <div className="container clearfix" style={{padding: '0 6px'}}>
                        <SlideBar />
                    </div>

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
                                    <h3 className="title title-manga" title={CONSTANT.STORY_LATEST_UPDATED} style={{ width: '100%' }}>
                                        <span className="title-taskbar">{CONSTANT.STORY_LATEST_UPDATED}</span>
                                    </h3>
                                </div>

                                {/* list-manga-index-page */}
                                <div className="mt-3 mb-3 list-manga-index-page">
                                    <div className="row mb-0">
                                        {listItemStoriesNew}

                                        {/* <div className="btn-read-more">
                                            <a href="/" className="btn btn-info" style={{ width: '100%' }}>
                                                {CONSTANT.SHOW_MORE}
                                            </a>
                                        </div> */}

                                        {/* <div className="col-12">
                                            <PaginationCustom total={Total} urlSearch="/" keySearch='' className='justify-content-center' />
                                        </div> */}
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

export async function getStaticProps({ params }) {
    const res = await fetch(`http://66.152.189.94:8083/v1/client/get-list-newest?limit=10&offset=0`)
    const { data } = await res.json()
    return {
        props: {
            data,
        },
    };
}

// export async function getServerSideProps({ query }) {
//     const offset = query['offset'] ? query['offset'] : PAGINATION_DATA.OFFSET;
//     const limit = query['limit'] ? query['limit'] : PAGINATION_DATA.LIMIT;
//     const page = query['page'] ? query['page'] : PAGINATION_DATA.CURRENT_PAGE;
//     const res = await fetch(`http://66.152.189.94:8083/v1/client/get-list-newest?limit=${limit}&offset=${offset}&page=${page}`)
//     const { data } = await res.json();
//     return {
//         props: {
//             data,
//         },
//     }
// }

export default IndexPage;
