import Layout from "../components/layout";
import { useMedia } from '../lib/use-media';

function MyApp({ Component, pageProps }) {

  const mobile = useMedia('(max-width: 580px)');
  const tablet = useMedia('(max-width: 991px)');
  const desktop = useMedia('(min-width: 992px)');

  return (
    <Layout>
      <Component {...pageProps} deviceType={{ mobile, tablet, desktop }} />
    </Layout>
  )
}

export default MyApp
