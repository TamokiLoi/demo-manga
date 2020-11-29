import _, { orderBy } from 'lodash';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import CONSTANT from '../lib/constant';
import { FormSearch } from './form-search';

const Header: React.FC = () => {

    const router = useRouter();

    const [listGenres, setListGenres] = useState([]);
    const [isShowMegaMenuGenres, setIsShowMegaMenuGenres] = useState(false);
    const [listItemsCurrent, setListItemsCurrent] = useState();

    let listMutilGenres = [];

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

    if (listGenres.length > 0) {
        listMutilGenres = _.chunk(listGenres, Math.ceil(listGenres.length / 6));
        setListGenres([]);
    }

    let listItems;
    if (listMutilGenres.length > 0) {
        listItems = listMutilGenres.map((listGenres, index) =>
            <ul className="sub-menu-container mega-menu-column col-lg-2" key={index}>
                {
                    listGenres.map((genre) => {
                        const urlGenre = genre.name.toLowerCase().split(' ').join('-');
                        return (
                            <li className="menu-item" key={genre.id}>
                                {/* <Link href={`/tim-kiem/the-loai=${urlGenre}-${genre.id}`} key={genre.id}>
                                    <a className="menu-link" style={{ padding: '4px 10px' }}>
                                        <div>{genre.name}</div>
                                    </a>
                                </Link> */}
                                <a href={`/tim-kiem/the-loai=${urlGenre}-${genre.id}`} key={genre.id} className="menu-link" style={{ padding: '4px 10px' }}>
                                    <div>{genre.name}</div>
                                </a>
                            </li>
                        )
                    })
                }
            </ul>
        );
        if (listItems) {
            setListItemsCurrent(listItems);
        }
    }

    const handleShowMenuOnMobile = () => {
        if (isShowMegaMenuGenres) {
            document.getElementById('megaMenuGenres').style.display = 'none';
            document.getElementById('btnMegaMenuGenres').classList.remove('icon-rotate-90')
        } else {
            document.getElementById('megaMenuGenres').style.display = 'block';
            document.getElementById('btnMegaMenuGenres').classList.add('icon-rotate-90')
        }
        setIsShowMegaMenuGenres(!isShowMegaMenuGenres);
    }

    return (
        <>
            <header id="header" className="header-size-sm" style={{ borderBottom: 'none' }}>
                <div id="header-wrap" className="border-f5">
                    <div className="container" style={{ padding: '0 5px' }}>
                        <div className="header-row justify-content-between flex-row-reverse flex-lg-row">
                            <div className="header-misc" style={{ marginLeft: 0 }}>
                                {/* Top Search */}
                                <FormSearch />
                                {/* #top-search end */}
                            </div>
                            <div id="primary-menu-trigger">
                                <svg className="svg-trigger" viewBox="0 0 100 100">
                                    <path d="m 30,33 h 40 c 3.722839,0 7.5,3.126468 7.5,8.578427 0,5.451959 -2.727029,8.421573 -7.5,8.421573 h -20">
                                    </path>
                                    <path d="m 30,50 h 40" />
                                    <path d="m 70,67 h -40 c 0,0 -7.5,-0.802118 -7.5,-8.365747 0,-7.563629 7.5,-8.634253 7.5,-8.634253 h 20">
                                    </path>
                                </svg>
                            </div>

                            {/* Primary Navigation */}
                            <nav className="primary-menu">
                                <ul className="menu-container">
                                    <li className={"menu-item " + (router.pathname == '/' && 'current')}>
                                        {/* <Link href="/">
                                            <a className="menu-link" style={{ paddingLeft: 0 }}>
                                                <div>{CONSTANT.HOME}</div>
                                            </a>
                                        </Link> */}
                                        <a href="/" className="menu-link" style={{ paddingLeft: 0 }}>
                                            <div>{CONSTANT.HOME}</div>
                                        </a>
                                    </li>
                                    <li className={"menu-item " + (router.query.slug == 'truyen-moi' && 'current')}>
                                        {/* <Link href="/danh-sach/truyen-moi">
                                            <a className="menu-link" style={{ paddingLeft: 0 }}>
                                                <div>{CONSTANT.STORY_NEW}</div>
                                            </a>
                                        </Link> */}
                                        <a href="/danh-sach/truyen-moi" className="menu-link" style={{ paddingLeft: 0 }}>
                                            <div>{CONSTANT.STORY_NEW}</div>
                                        </a>
                                    </li>
                                    <li className={"menu-item " + (router.query.slug == 'truyen-hot' && 'current')}>
                                        {/* <Link href="/danh-sach/truyen-hot">
                                            <a className="menu-link" style={{ paddingLeft: 0 }}>
                                                <div>{CONSTANT.STORY_HOT}</div>
                                            </a>
                                        </Link> */}
                                        <a href="/danh-sach/truyen-hot" className="menu-link" style={{ paddingLeft: 0 }}>
                                            <div>{CONSTANT.STORY_HOT}</div>
                                        </a>
                                    </li>
                                    <li className={"menu-item " + (router.query.slug == 'truyen-du-bo' && 'current')}>
                                        {/* <Link href="/danh-sach/truyen-du-bo">
                                            <a className="menu-link" style={{ paddingLeft: 0 }}>
                                                <div>{CONSTANT.STORY_COMPLETE}</div>
                                            </a>
                                        </Link> */}
                                        <a href="/danh-sach/truyen-du-bo" className="menu-link" style={{ paddingLeft: 0 }}>
                                            <div>{CONSTANT.STORY_COMPLETE}</div>
                                        </a>
                                    </li>
                                    <li className="menu-item mega-menu">
                                        <a className="menu-link" href="#" style={{ pointerEvents: 'none', paddingLeft: 0 }}>
                                            <div>{CONSTANT.GENRES}</div>
                                        </a>
                                        <div className="mega-menu-content" id="megaMenuGenres">
                                            <div className="container">
                                                <div className="row">
                                                    {listItemsCurrent}
                                                </div>
                                            </div>
                                        </div>
                                        <button className="sub-menu-trigger icon-chevron-right" id="btnMegaMenuGenres" onClick={() => handleShowMenuOnMobile()}></button>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
                <div className="header-wrap-clone" />
            </header>
        </>
    );
}

export default Header;