type Props = {
    height?: any;
};

const AdBanner: React.FC<Props> = ({ height }) => {

    return (
        <>
            <img src="http://demo.mangabooth.com/wp-content/uploads/2017/10/ads-1.jpg"
                alt="ads"
                width="100%"
                className={(height ? 'fix-height-img-banner' : '')}
            />
        </>
    );
}

export default AdBanner;