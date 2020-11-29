import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const SlideBar: React.FC = () => {

    const [listSlide, setListSlide] = useState([]);

    useEffect(() => {
        // fetch('http://66.152.189.94:8083/v1/client/get-list-slides?offset=0&limit=10')
        fetch('http://66.152.189.94:8083/v1/client/get-list-newest?is_hot=1&limit=10&offset=0')
            .then(res => res.json())
            .then(res => {
                // setListSlide(res.data);
                setListSlide(res.data.List);
            });
    }, []);

    let listItems;
    if (listSlide) {
        listItems = listSlide.map((story) =>
            <div className="portfolio-item" key={story.id}>
                <div className="portfolio-image home-image-slide">
                    {/* <Link href={`/truyen/${story.id}`}>
                        <a >
                            <img src={story.image} alt={story.title} style={{ maxHeight: '11.5rem' }} />
                        </a>
                    </Link> */}
                    <a href={`/truyen/${story.id}`}>
                        <img src={story.image} alt={story.title} style={{ maxHeight: '11.5rem', height: '11.5rem' }} />
                    </a>
                </div>
                <div className="slide-caption">
                    <h3 style={{ margin: 0 }} title={story.title}>
                        {/* <Link href={`/truyen/${story.id}`}>
                            <a>
                                {story.title}
                            </a>
                        </Link> */}
                        <a href={`/truyen/${story.id}`} title={story.title}>
                            {story.title}
                        </a>
                    </h3>
                    {/* <Link href={`/truyen/${story.title}/chuong/${story.chapter[0].id}`}>
                        <a title={story.chapter[0].name} className="limit-text">{story.chapter[0].name}</a>
                    </Link> */}
                    <a href={`/truyen/${story.title}/chuong/${story.chapter[0].id}`} title={story.chapter[0].name} className="limit-text">{story.chapter[0].name}</a>
                </div>
            </div>
        );
    }

    return (
        <>
            <div className="slide" id="slide">
                <div id="oc-portfolio" className="owl-carousel portfolio-carousel carousel-widget" data-margin="2" data-loop="true"
                    data-autoplay="3000" data-nav="true" data-pagi="false" data-items-xs="2" data-items-sm="3" data-items-md="6"
                    data-items-lg="8" data-items-xl="8">
                    {listItems ? listItems : ''}
                </div>
            </div>
        </>
    );
}

export default SlideBar;
