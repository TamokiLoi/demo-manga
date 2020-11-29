import Footer from './footer';
import Header from './header';
import TopBar from './topBar';

type LayoutProps = {
    className?: string;
    token?: string;
};

const Layout: React.FunctionComponent<LayoutProps> = ({ children }) => {
    return (
        <>
            <div id="wrapper" className="clearfix">
                <TopBar />
                <Header />
                <main>{children}</main>
                <Footer />
            </div>
        </>
    );
};

export default Layout;