import { orderBy } from 'lodash';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import CONSTANT from '../lib/constant';
import TABS_DATA from '../lib/constant-data/tabs-data';
import AdBanner from './adBanner';

const RightBar: React.FC = () => {

    const [listToday, setListToDay] = useState([]);
    const [listGenres, setListGenres] = useState([]);
    const [selectTab, setSelectTab] = useState('tabs-1');

    useEffect(() => {
        fetch('http://66.152.189.94:8083/v1/client/get-list-top?offset=0&limit=10&top_by=day')
            .then(res => res.json())
            .then(res => {
                setListToDay(res.data);
            });
        fetch('http://66.152.189.94:8083/v1/client/get-list-genres')
            .then(res => res.json())
            .then(res => {
                res.data = orderBy(res.data, [function (o) {
                    return o.name.length;
                }, "name"], ["asc", "asc"])
                setListGenres(res.data);
            });
        setSelectTab('tabs-1')
    }, []);

    let listItemToday;
    if (listToday) {
        listItemToday = listToday.map((story, index) => {
            if ((index + 1) < 4) {
                return (
                    <div className="entry col-12 mb-1" key={story.id}>
                        <div className="row no-gutters">
                            <div className="col-auto">
                                <div className="entry-image manga-panel-img">
                                    {/* <Link href={story.url}>
                                        <a>
                                            <img src={story.image} alt={story.title} style={{ maxHeight: '5.3125rem' }} />
                                        </a>
                                    </Link> */}
                                    <a href={story.url}>
                                        <img src={story.image} alt={story.title} style={{ maxHeight: '5.3125rem' }} />
                                    </a>
                                </div>
                            </div>
                            <div className="col" style={{ paddingLeft: '10px' }}>
                                <div className="entry-title manga-panel-title">
                                    <h3 style={{ fontSize: '0.9rem' }}>
                                        {/* <Link href={story.url}>
                                            <a>{story.title}</a>
                                        </Link> */}
                                        <a href={story.url}>{story.title}</a>
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
                                {
                                    // story.chapter[1] && <Link href={story.chapter[1].url}>
                                    //     <a title={story.chapter[1].name} className="link-chapter limit-text">
                                    //         <span> » </span> {story.chapter[1].name}
                                    //     </a>
                                    // </Link>
                                    story.chapter[1] && <a href={story.chapter[1].url} title={story.chapter[1].name} className="link-chapter limit-text">
                                        <span> » </span> {story.chapter[1].name}
                                    </a>
                                }
                                <span style={{ display: 'block' }} className="number-view">
                                    {/* <i className="fa fa-eye"> {story.views}</i> */}
                                    <strong>
                                        {CONSTANT.VIEWS}
                                    </strong> : <span className="font-info">
                                        {story.views}
                                    </span>
                                </span>
                            </div>
                        </div>
                    </div>
                )
            }
        }
        );
    }

    let listItemGenres
    if (listGenres) {
        listItemGenres = listGenres.map((genre) => {
            const urlGenre = genre.name.toLowerCase().split(' ').join('-');
            return (
                // <Link href={`/tim-kiem/the-loai=${urlGenre}-${genre.id}`} key={genre.id}>
                //     <a style={{ fontSize: '10px' }}>
                //         {genre.name}
                //     </a>
                // </Link>
                <a href={`/tim-kiem/the-loai=${urlGenre}-${genre.id}`} key={genre.id} style={{ fontSize: '10px' }}>
                    {genre.name}
                </a>
            )
        });
    }

    const listItemTabs = (
        <div className="tabs mb-0 clearfix" id="sidebar-tabs">
            <ul className="tab-nav clearfix">
                {
                    TABS_DATA.CONTENT_TABS.map((tab, index) =>
                        <li onClick={() => setSelectTab(tab.key)}
                            style={{ cursor: 'pointer' }}
                            className={(selectTab == tab.key) ? 'ui-tabs-active ui-state-active' : ''}
                            key={index}
                        >
                            <a>{tab.name}</a>
                        </li>
                    )
                }
            </ul>
            <div className="tab-container">
                <div className="tab-content clearfix">
                    <div className="posts-sm row">
                        {
                            selectTab == TABS_DATA.CONTENT_TABS[0].key && listItemToday
                        }
                        {
                            selectTab == TABS_DATA.CONTENT_TABS[1].key && listItemToday
                        }
                        {
                            selectTab == TABS_DATA.CONTENT_TABS[2].key && listItemToday
                        }
                    </div>
                </div>
            </div>
        </div>
    )

    return (
        <>
            {/* adWordBanner */}
            <div className="mb-3">
                <AdBanner height={'6.05rem'} />
            </div>

            {/* taskbar most popular */}
            <div id="manga_popular" className="widget clearfix" style={{ marginTop: 0 }}>
                <div className="breadcrumb-title mb-1" style={{ borderColor: '#A6083D', marginBottom: 0 }}>
                    <h3 className="title title-manga" title={CONSTANT.STORY_FEATURE} style={{ backgroundColor: '#A6083D' }}>
                        <span className="title-taskbar">{CONSTANT.STORY_FEATURE}</span>
                    </h3>
                </div>
            </div>

            {/* list top: day, week, month */}
            <div id="tab" className="widget clearfix mt-1">
                {listItemTabs}
            </div>

            {/* taskbar genres */}
            <div className="widget clearfix mt-2">
                <div className="breadcrumb-title mb-1" style={{ borderColor: '#3498db' }}>
                    <h3 className="title title-manga" title={CONSTANT.GENRES} style={{ backgroundColor: '#3498db' }}>
                        <span className="title-taskbar">{CONSTANT.GENRES}</span>
                    </h3>
                </div>
            </div>

            {/* list genres */}
            <div className="widget-content">
                <div className="cool-tag-cloud">
                    <div className="ctcdefault">
                        <div className="ctcleft">
                            <div className="arial" style={{ textTransform: 'none' }}>
                                {listItemGenres ? listItemGenres : ''}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* adWordBanner */}
            {/* <div className="mb-3 mt-3">
                <AdBanner height={'6.05rem'} />
            </div> */}
        </>
    );
}

export default RightBar;