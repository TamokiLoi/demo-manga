import Link from 'next/link';

type Props = {
    className?: string;
};

const TopBar: React.FC<Props> = ({ className }) => {
    return (
        <>
            <div id="top-bar">
                <div className="container clearfix">
                    <div className="row justify-content-between" style={{ paddingTop: '2px' }}>
                        <div className="col-8 col-md-auto no-pad">
                            <div className="container" style={{ paddingLeft: '6px' }}>
                                {/* Logo */}
                                <div id="logo" className="mx-auto">
                                    {/* <Link href="/">
                                        <a>
                                            <img src="/images/manga/logo-lakemanga-1.png" alt="logo-lakemanga" style={{ height: '3rem' }} />
                                        </a>
                                    </Link> */}
                                    <a href="/">
                                        <img src="/images/manga/logo-lakemanga-1.png" alt="logo-lakemanga" style={{ height: '3rem' }} />
                                    </a>
                                </div>
                                {/* #logo end */}
                            </div>
                        </div>
                        <div className="col-4 col-md-auto no-pad">
                            {/* Top Link and Social */}
                            <div className="top-links on-click" style={{ borderBottom: 'none' }}>
                                <ul id="top-social" className="top-links-container">
                                    <li>
                                        <a href="#" className="si-facebook link-disabled">
                                            <span className="ts-icon"><i className="icon-user" /></span>
                                            <span className="ts-text">Login</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://www.facebook.com/LakeManga-108770497622443/" className="si-facebook">
                                            <span className="ts-icon"><i className="icon-facebook" /></span>
                                            <span className="ts-text">FanPage</span>
                                        </a>
                                    </li>
                                </ul>
                            </div>{/* .top-links and social end */}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default TopBar;