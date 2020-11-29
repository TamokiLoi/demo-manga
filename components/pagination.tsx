import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState } from 'react';
import PAGINATION_DATA from '../lib/constant-data/pagination-data';

type Props = {
    total: number;
    urlSearch: string;
    keySearch: string;
    className?: string;
};

const PaginationCustom: React.FC<Props> = ({ total, urlSearch, keySearch, className }) => {

    const router = useRouter();
    const [localClassName, setLocalClassName] = useState('justify-content-end');
    const [paginationData, setPaginationData] = useState({
        total: PAGINATION_DATA.TOTAL_PAGE,
        totalPage: PAGINATION_DATA.TOTAL_PAGE,
        limit: PAGINATION_DATA.LIMIT,
        offset: PAGINATION_DATA.OFFSET,
        page: PAGINATION_DATA.CURRENT_PAGE,
        nextPage: PAGINATION_DATA.NEXT_PAGE,
        prevPage: PAGINATION_DATA.PREV_PAGE,
        keySearch: PAGINATION_DATA.KEY_SEARCH
    });

    useEffect(() => {
        if (className) {
            setLocalClassName(className)
        }
    }, [router]);

    useEffect(() => {
        setPaginationData(formatPaginationData(total, router.query, keySearch));
    }, [total, keySearch]);

    const formatPaginationData = useCallback((total, query, keySearch) => {
        if (!query.limit) {
            query['limit'] = PAGINATION_DATA.LIMIT;
            query['offset'] = PAGINATION_DATA.OFFSET;
            query['page'] = PAGINATION_DATA.CURRENT_PAGE;
        }
        const totalPage = +Math.ceil(total / query.limit);
        const page = +query.page;
        return {
            total: total,
            totalPage: totalPage,
            limit: +query.limit,
            offset: +query.offset,
            page: page,
            nextPage: (page < totalPage) ? +(page + 1) : PAGINATION_DATA.NEXT_PAGE,
            prevPage: (page > 1) ? +(page - 1) : PAGINATION_DATA.PREV_PAGE,
            keySearch: keySearch,
        }
    }, []);

    let listItemPagination;
    if (paginationData.totalPage) {
        const arrPagination = [];
        if (paginationData['totalPage']) {
            for (let i = 0; i < paginationData.totalPage; i++) {
                const nextPage = (i + 1) + 1;
                const prevPage = (i + 1) - 1;
                arrPagination.push(
                    {
                        page: i + 1,
                        offset: PAGINATION_DATA.LIMIT * i,
                        limit: PAGINATION_DATA.LIMIT,
                        nextPage: (nextPage > paginationData.totalPage) ? 0 : nextPage,
                        prevPage: prevPage,
                    }
                )

            }
        }
        const currentPage = (+router.query.page) ? +router.query.page : 1;

        listItemPagination = arrPagination.map((pagination, index) => {
            if (currentPage != arrPagination.length) {
                if (((index - 2) < currentPage) && (currentPage <= (index + 3))) {
                    return (
                        <li className={"page-item " + ((pagination.page == currentPage) ? 'active' : '')} key={index}>
                            {/* <Link href={`${urlSearch}${paginationData.keySearch}?limit=${pagination.limit}&offset=${pagination.offset}&page=${pagination.page}`} >
                                <a className="page-link">{pagination.page}</a>
                            </Link> */}
                            <a href={`${urlSearch}${paginationData.keySearch}?limit=${pagination.limit}&offset=${pagination.offset}&page=${pagination.page}`} className="page-link">{pagination.page}</a>
                        </li>
                    )
                }
            } else {
                if (((arrPagination.length - 5) < pagination.page) && (pagination.page <= arrPagination.length)) {
                    return (
                        <li className={"page-item " + ((pagination.page == router.query.page) ? 'active' : '')} key={index}>
                            {/* <Link href={`${urlSearch}${paginationData.keySearch}?limit=${pagination.limit}&offset=${pagination.offset}&page=${pagination.page}`} >
                                <a className="page-link">{pagination.page}</a>
                            </Link> */}
                            <a href={`${urlSearch}${paginationData.keySearch}?limit=${pagination.limit}&offset=${pagination.offset}&page=${pagination.page}`} className="page-link">{pagination.page}</a>
                        </li>
                    )
                }
            }
        })
    }

    return (
        <>
            {
                (total > 0) &&
                <ul className={'pagination ' + localClassName} style={{ margin: '5px 0px 0px 0px' }}>

                    <li className="page-item" style={(+router.query.page == 1) ? { pointerEvents: 'none' } : {}}>
                        {/* <Link href={`${urlSearch}${paginationData.keySearch}?limit=${+router.query.limit}&offset=${0}&page=1`} >
                            <a className="page-link" title="1">{PAGINATION_DATA.FIRST_PAGE_ICON}</a>
                        </Link> */}
                        <a href={`${urlSearch}${paginationData.keySearch}?limit=${+router.query.limit}&offset=${0}&page=1`} className="page-link" title="1">{PAGINATION_DATA.FIRST_PAGE_ICON}</a>
                    </li>
                    <li className="page-item" style={(+router.query.page == 1) ? { pointerEvents: 'none' } : {}}>
                        {/* <Link href={`${urlSearch}${paginationData.keySearch}?limit=${+router.query.limit}&offset=${(+router.query.page - 2) * +router.query.limit}&page=${+router.query.page - 1}`} >
                            <a className="page-link"> {PAGINATION_DATA.PREV_PAGE_ICON} </a>
                        </Link> */}
                        <a href={`${urlSearch}${paginationData.keySearch}?limit=${+router.query.limit}&offset=${(+router.query.page - 2) * +router.query.limit}&page=${+router.query.page - 1}`} className="page-link"> {PAGINATION_DATA.PREV_PAGE_ICON} </a>
                    </li>
                    {listItemPagination}
                    <li className="page-item" style={(+router.query.page == paginationData.totalPage) ? { pointerEvents: 'none' } : {}}>
                        {/* <Link href={`${urlSearch}${paginationData.keySearch}?limit=${+router.query.limit}&offset=${+router.query.page * +router.query.limit}&page=${+router.query.page + 1}`} >
                            <a className="page-link">{PAGINATION_DATA.NEXT_PAGE_ICON}</a>
                        </Link> */}
                        <a href={`${urlSearch}${paginationData.keySearch}?limit=${+router.query.limit}&offset=${+router.query.page * +router.query.limit}&page=${+router.query.page + 1}`} className="page-link">{PAGINATION_DATA.NEXT_PAGE_ICON}</a>
                    </li>
                    <li className="page-item" style={(+router.query.page == paginationData.totalPage) ? { pointerEvents: 'none' } : {}}>
                        {/* <Link href={`${urlSearch}${paginationData.keySearch}?limit=${+router.query.limit}&offset=${(paginationData.totalPage - 1) * +router.query.limit}&page=${paginationData.totalPage}`} >
                            <a className="page-link" title={paginationData.totalPage.toString()}>{PAGINATION_DATA.LAST_PAGE_ICON} ({paginationData.totalPage})</a>
                        </Link> */}
                        <a href={`${urlSearch}${paginationData.keySearch}?limit=${+router.query.limit}&offset=${(paginationData.totalPage - 1) * +router.query.limit}&page=${paginationData.totalPage}`} className="page-link" title={paginationData.totalPage.toString()}>{PAGINATION_DATA.LAST_PAGE_ICON} ({paginationData.totalPage})</a>
                    </li>
                </ul>
            }
        </>
    );
};

export default PaginationCustom;