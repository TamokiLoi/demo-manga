import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState } from 'react';
import CONSTANT from '../lib/constant';

type Props = {
    chapterDetail;
    chapters;
};

const ChapterListNavigation: React.FC<Props> = ({ chapterDetail, chapters }) => {

    const router = useRouter();

    const [preUrl, setPreUrl] = useState('');
    const [nextUrl, setNextUrl] = useState('');
    const [selectedChapter, setSelectedChapter] = useState(chapterDetail.url);

    useEffect(() => {
        let index;
        for (let i = 0; i < chapters.length; i++) {
            if (chapters[i].id == chapterDetail.id) {
                index = i;
            }
        }
        ((index - 1) >= 0) ? setNextUrl(chapters[index - 1].url) : setNextUrl(null);
        ((index + 1) < chapters.length) ? setPreUrl(chapters[index + 1].url) : setPreUrl(null);
        setSelectedChapter(chapterDetail.url);
    }, [chapters]);

    let listItemChapter;
    if (chapters) {
        listItemChapter = chapters.map((chapter) =>
            <option
                key={chapter.id}
                value={chapter.url}
                defaultValue={chapter.url}
                className="text-nowrap"
            >
                {chapter.name}
            </option>
        );
    }

    const handleChapterLink = useCallback((event) => {
        router.push(`/truyen/${router.query.idStory}/chuong/${event.target.value.split('/').pop()}`)
    }, []);

    return (
        <>
            <div className="option-list-chapter mb-2">
                <div className="row">
                    <div className="col-4 col-md-4 pre-url">
                        {
                            preUrl &&
                            // <Link href={preUrl}>
                            //     <a className="button button-mini btn-mini-ltr" style={{ margin: 0, textTransform: 'inherit' }}>
                            //         {CONSTANT.PRE_CHAPTER}
                            //     </a>
                            // </Link>
                            <a href={preUrl} className="button button-mini btn-mini-ltr" style={{ margin: 0, textTransform: 'inherit' }}>
                                {CONSTANT.PRE_CHAPTER}
                            </a>
                        }
                    </div>
                    <div className="col-4 col-md-4 list-url">
                        <select id="dynamic_select_top" className="select-chapter" onChange={handleChapterLink} value={selectedChapter}>
                            {listItemChapter}
                        </select>
                    </div>
                    <div className="col-4 col-md-4 next-url">
                        {
                            nextUrl &&
                            // <Link href={nextUrl}>
                            //     <a className="button button-mini btn-mini-ltr" style={{ margin: 0, textTransform: 'inherit' }}>
                            //         {CONSTANT.NEXT_CHAPTER}
                            //     </a>
                            // </Link>
                            <a href={nextUrl} className="button button-mini btn-mini-ltr" style={{ margin: 0, textTransform: 'inherit' }}>
                                {CONSTANT.NEXT_CHAPTER}
                            </a>
                        }
                    </div>
                </div>
            </div>
        </>
    );
}

export default ChapterListNavigation;