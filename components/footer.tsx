type Props = {
    className?: string;
};

const Footer: React.FC<Props> = ({ className }) => {
    return (
        <>
            <footer id="footer" className="mt-2" style={{
                backgroundColor: 'transparent',
                border: 0,
                margin: 0,
                padding: 0
            }}>
                {/* Copyrights */}
                <div id="copyrights" style={{ padding: 0, backgroundColor: 'transparent' }}>
                    <div className="container">
                        <div className="row col-mb-30">
                            <div className="col-8 col-md-8 text-md-left" style={{ paddingBottom: 0, paddingTop: '5px' }}>
                                <div>
                                    <iframe src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2FLakeManga-108770497622443&tabs&width=373&height=400&small_header=true&adapt_container_width=true&hide_cover=false&show_facepile=true&appId=1641190932770011" width={373} height={80} style={{ border: 'none', overflow: 'hidden' }} scrolling="no" frameBorder={0} allowFullScreen={true} allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share" />
                                </div>

                            </div>
                            <div className="col-4 col-md-4 text-center text-md-right" style={{ padding: '30px 10px 0 10px' }}>
                                Copyrights © 2020 LakeManga<br />
                            </div>
                        </div>
                    </div>
                </div>
                {/* #copyrights end */}
            </footer>
        </>
    )
}

export default Footer;