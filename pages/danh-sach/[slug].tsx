import { format } from 'date-fns';
import { orderBy } from 'lodash';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState } from 'react';
import AdBanner from '../../components/adBanner';
import Description from '../../components/description';
import Meta from '../../components/meta';
import PaginationCustom from '../../components/pagination';
import SlideBar from '../../components/slideBar';
import CONSTANT from '../../lib/constant';
import PAGINATION_DATA from '../../lib/constant-data/pagination-data';
import { sitePages } from '../../lib/site-settings/site-pages';

type Props = {
    data: any;
};

const SearchPage: React.FC<Props> = ({ data }) => {

    const router = useRouter();
    const page = sitePages['search'];
    const { Keyword, List, Total, } = data;
    const [listGenres, setListGenres] = useState([]);
    const [keySearch, setKeySearch] = useState('');

    useEffect(() => {
        fetch('http://66.152.189.94:8083/v1/client/get-list-genres')
            .then(res => res.json())
            .then(res => {
                res.data = orderBy(res.data, [function (o) {
                    return o.name.length;
                }, "name"], ["asc", "asc"])
                setListGenres(res.data);
            });
    }, []);

    useEffect(() => {
        formatKeySearch(router.query.slug);
    }, [router]);

    const formatKeySearch = useCallback((slug) => {
        if (slug.includes('?')) {
            setKeySearch(`${slug.split('?')[0]}`)
        } else {
            setKeySearch(`${slug}`)
        }
    }, [router]);

    let listItemStoryBySearch
    if (List) {
        listItemStoryBySearch = List.map((story) =>
            <div className="entry col-12 col-md-6 manga-panel" key={story.id}>
                <div className="row row-manga-panel">
                    <div className="col-4 col-md-4">
                        <div className="entry-image mb-0 manga-panel-img">
                            {/* <Link href={story.url} >
                                <a>
                                    <img src={story.image} alt={story.title} />
                                </a>
                            </Link> */}
                            <a href={story.url}>
                                <img src={story.image} alt={story.title} />
                            </a>
                        </div>
                    </div>
                    <div className="col-8 col-md-8 no-pad" style={{ marginLeft: '-5px', paddingRight: '5px' }}>

                        <div className="entry-title title-sm mt-md-0 manga-panel-title" title={story.title}>
                            <h3 title={story.title}>
                                {/* <Link href={story.url} >
                                    <a>{story.title}</a>
                                </Link> */}
                                <a href={story.url}>{story.title}</a>
                            </h3>
                        </div>
                        {/* <Link href={story.chapter[0].url} >
                            <a title={story.chapter[0].name} className="link-chapter limit-text">
                                <span> » </span> {story.chapter[0].name}
                            </a>
                        </Link> */}
                        <a href={story.chapter[0].url} title={story.chapter[0].name} className="link-chapter limit-text">
                            <span> » </span> {story.chapter[0].name}
                        </a>
                        <span>
                            <strong>{CONSTANT.AUTHOR}</strong> : {
                                // <Link href={`/tim-kiem/tac-gia=${story.author.name.toLowerCase().split(' ').join('-')}-${story.id}`}>
                                //     <a className="badge badge-info">
                                //         {story.author.name}
                                //     </a>
                                // </Link>
                                <a href={`/tim-kiem/tac-gia=${story.author.name.toLowerCase().split(' ').join('-')}-${story.id}`} className="badge badge-info">
                                    {story.author.name}
                                </a>
                            }
                        </span>
                        <br />
                        <span>
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
                                {/* {moment(story.updated_at).format("DD/MM/YYYY, LT")} */}
                                {format(new Date(story.updated_at), 'dd/MM/yyyy, HH:MM')}
                            </span>
                        </span>
                        <div id="description_content" className="hide-content">
                            <Description html={story.description} />
                        </div>
                        {/* <Link href={story.url} >
                            <a className="btn-link btn-show-more non-display-1024">
                                {CONSTANT.SHOW_MORE}
                            </a>
                        </Link> */}
                        <a href={story.url} className="btn-link btn-show-more non-display-1024">
                            {CONSTANT.SHOW_MORE}
                        </a>
                    </div>
                </div>
            </div>
        );
    }

    let listItemGenres
    if (listGenres) {
        listItemGenres = listGenres.map((genre) => {
            const urlGenre = genre.name.toLowerCase().split(' ').join('-');
            return (
                // <Link href={`/tim-kiem/the-loai=${urlGenre}-${genre.id}`} key={genre.id}>
                //     <li>
                //         <a className={(keySearch.split("=").pop().split('-').pop() == genre.id) ? 'highlight' : ''}>{genre.name}</a>
                //     </li>
                // </Link>
                <li key={genre.id}>
                    <a href={`/tim-kiem/the-loai=${urlGenre}-${genre.id}`} className={(keySearch.split("=").pop().split('-').pop() == genre.id) ? 'highlight' : ''}>{genre.name}</a>
                </li>
            )
        });
    }

    return (
        <>
            <Meta title={`${page?.page_title} - ${Keyword}`} description={page?.page_description} />
            <section id="content">
                <div className="content-wrap content-wrap-custom" style={{ padding: '0px 0px 20px !important' }}>
                    {/* slide */}
                    {/* <div className="container clearfix" style={{padding: '0 6px'}}>
                        <SlideBar />
                    </div> */}

                    {/* content-main */}
                    <div className="container clearfix search-filter-page">
                        <div className="row gutter-40">
                            <div className="col-lg-12">

                                {/* adWordBanner */}
                                <div className="mb-3">
                                    <AdBanner />
                                </div>

                                {/* breadcrumb */}
                                <div className="breadcrumb-title mb-2">
                                    <h1 className="title title-manga" title={CONSTANT.HOME}>
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
                                        <span>
                                            {CONSTANT.LIST}
                                        </span>
                                        <span style={{ color: 'white' }}> » </span>
                                        {
                                            router.query.slug == 'truyen-moi' &&
                                            (
                                                <span>
                                                    {CONSTANT.STORY_NEW}
                                                </span>
                                            )
                                        }
                                        {
                                            router.query.slug == 'truyen-hot' &&
                                            (
                                                <span>
                                                    {CONSTANT.STORY_HOT}
                                                </span>
                                            )
                                        }
                                        {
                                            router.query.slug == 'truyen-du-bo' &&
                                            (
                                                <span>
                                                    {CONSTANT.STORY_COMPLETE}
                                                </span>
                                            )
                                        }
                                    </h1>
                                </div>

                                {/* list manga by search or filter */}
                                <div className="mt-5 list-manga-panel">
                                    <div className="row mb-0 row-first">
                                        {listItemStoryBySearch}
                                        {
                                            List.length == 0 && (
                                                <div className="col-12 text-center">
                                                    <p style={{ marginBottom: 0 }}><strong>Không tìm thấy dữ liệu</strong></p>
                                                </div>
                                            )
                                        }
                                    </div>
                                </div>

                                {/* total and pagination */}
                                <div className="mt-2">
                                    <div className="row">
                                        <div className="col-12 col-md-6">
                                            <span className="button button-small total-btn" style={{ marginLeft: '0px', pointerEvents: 'none' }}>
                                                {CONSTANT.TOTAL} : {Total} <span className="text-low">{CONSTANT.STORY}</span>
                                            </span>
                                        </div>
                                        <div className="col-12 col-md-6 text-right">
                                            <PaginationCustom total={Total} urlSearch="/danh-sach/" keySearch={keySearch} />
                                        </div>
                                    </div>
                                </div>

                                {/* filter list */}
                                <div className="mt-2 filter-list">
                                    <div className="row">
                                        <div className="col-12">
                                            <ul className="tag tag-name">
                                                {listItemGenres}
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                {/* adWordBanner */}
                                <div className="mb-3 mt-3">
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

export async function getServerSideProps({ params, query }) {

    if (!query.offset) {
        query['offset'] = PAGINATION_DATA.OFFSET;
        query['limit'] = PAGINATION_DATA.LIMIT;
        query['page'] = PAGINATION_DATA.CURRENT_PAGE;
    }

    let keySearch;
    switch (params.slug.split('=')[0]) {
        case 'truyen-moi':
            keySearch = `?is_new=1`;
            break;
        case 'truyen-hot':
            keySearch = `?is_hot=1`;
            break;
        case 'truyen-du-bo':
            keySearch = `?status=1`;
            break;
    }

    const res = await fetch(`http://66.152.189.94:8083/v1/client/get-list-newest/${keySearch}&limit=${query.limit}&offset=${query.offset}&page=${query.page}`)
    const { data } = await res.json();
    return {
        props: {
            data,
        },
    };
}

export default SearchPage;
