import { debounce } from 'lodash';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import CONSTANT from '../lib/constant';

export const FormSearch: React.FC = () => {

    const router = useRouter();

    const searchRef = useRef(null);
    const [query, setQuery] = useState('');
    const [active, setActive] = useState(false);
    const [results, setResults] = useState([]);
    const [totalSearch, setTotalSearch] = useState(0);
    const [isOnSearch, setIsOnSearch] = useState(null);

    const searchPoint = (query) => `http://66.152.189.94:8083/v1/client/search?keyword=${query}&limit=10`

    useEffect(() => {
        setDefaultState();
    }, [router]);

    const handleSearch = debounce((query) => {
        if (query.length >= 3) {
            setIsOnSearch(true);
            setResults([]);
            fetch(searchPoint(query))
                .then(res => res.json())
                .then((res: any) => {
                    setIsOnSearch(false);
                    setResults(res.data.List);
                    setTotalSearch(res.data.Total);
                    fetchHighlightText(res.data.Keyword, res.data.List);
                })
        } else {
            setResults([]);
        }
    }, 500)

    const setDefaultState = debounce(() => {
        setQuery('');
        setResults([]);
    }, 500);

    const onChange = useCallback((event) => {
        const localQuery = event.target.value;
        setQuery(localQuery);
        handleSearch(localQuery);
    }, []);

    const onFocus = useCallback(() => {
        setActive(true);
        window.addEventListener('click', onClick);
    }, []);

    const onClick = useCallback((event) => {
        if (searchRef.current && !searchRef.current.contains(event.target)) {
            setActive(false);
            window.removeEventListener('click', onClick);
        }
    }, []);

    const fetchHighlightText = useCallback((query, arr) => {
        arr.map((item) => {
            highlightText(query, item.id);
        })
    }, []);

    const highlightText = (text, id) => {
        const inputTextTitle = document.getElementById(`${id}-title`);
        if (inputTextTitle) {
            let innerHTMLTitle = inputTextTitle.innerHTML;
            const indexTitle = innerHTMLTitle.toLowerCase().indexOf(text);
            if (indexTitle >= 0) {
                innerHTMLTitle = innerHTMLTitle.substring(0, indexTitle) + "<span class='highlightText'>" + innerHTMLTitle.substring(indexTitle, indexTitle + text.length) + "</span>" + innerHTMLTitle.substring(indexTitle + text.length);
                inputTextTitle.innerHTML = innerHTMLTitle;
            }

        }
        const inputTextAuthor = document.getElementById(`${id}-author`);
        if (inputTextAuthor) {
            let innerHTMLAuthor = inputTextAuthor.innerHTML;
            const indexAuthor = innerHTMLAuthor.toLowerCase().indexOf(text);
            if (indexAuthor >= 0) {
                innerHTMLAuthor = innerHTMLAuthor.substring(0, indexAuthor) + "<span class='highlightText'>" + innerHTMLAuthor.substring(indexAuthor, indexAuthor + text.length) + "</span>" + innerHTMLAuthor.substring(indexAuthor + text.length);
                inputTextAuthor.innerHTML = innerHTMLAuthor;
            }
        }
    }

    return (
        <>
            <div className="search-container" style={{ width: '19rem', maxWidth: '19rem' }}>
                <input
                    className="form-control mr-sm-2"
                    type="text"
                    placeholder="Nhập truyện cần tìm..."
                    aria-label="Search"
                    value={query}
                    onFocus={onFocus}
                    onChange={onChange}
                    autoComplete="off"
                    style={{ margin: '0 !important' }}
                    ref={searchRef}
                />
                {
                    ((query && isOnSearch != null) &&
                        <div id="search_result" style={(active) ? { display: 'block' } : { display: 'none' }}>
                            <ul style={(results.length > 0) ? { display: 'block' } : { display: 'none' }}>
                                {results.map((result, index) => (
                                    // <Link href={result.url} key={index} >
                                    <a href={result.url} key={index}>
                                        <li className="option">
                                            <img className="search_result_img" src={result.image} />
                                            <div className="search_result_item_right">
                                                <p className="search_result_row1" id={`${result.id}-title`}>
                                                    {result.title}
                                                </p>
                                                <p className="search_result_row2" id={`${result.id}-author`}>
                                                    {result.author_names}
                                                </p>
                                                <p className="search_result_row3">{result.last_chapter.name}</p>
                                            </div>
                                        </li>
                                    </a>
                                    // </Link>
                                ))}
                            </ul>
                            <div id="search_footer" className="searchf">
                                {isOnSearch && <img src="/images/manga/loading-gif.gif" alt="loading-data"></img>}
                                {
                                    (!isOnSearch && results.length > 0) &&
                                    <>
                                        <a href={`/tim-kiem/tu-khoa=${query}`} >
                                            <p style={{ color: 'black' }}>{CONSTANT.SEARCH_RESULT}: {totalSearch} <span className="text-low">{CONSTANT.STORY}</span>.</p>
                                            <p style={{ color: '#ff530d' }}>
                                                {/* <Link href={`/tim-kiem/tu-khoa=${query}`}>
                                                <a style={{ color: '#ff530d' }}>
                                                    Click để xem chi tiết.
                                                </a>
                                            </Link> */}

                                                Click để xem chi tiết.
                                            </p>
                                        </a>
                                    </>
                                }
                                {
                                    (isOnSearch == false && results.length == 0) &&
                                    <>
                                        <p>Không tìm thấy kết quả phù hợp.</p>
                                        <p>Vui lòng thử lại từ khoá khác...</p>
                                    </>
                                }
                            </div>
                        </div>
                    )
                }
            </div>
        </>
    );
};