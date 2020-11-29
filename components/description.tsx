import React from 'react';
import { useFormatHtml } from '../lib/use-format-html';

type Props = {
    html: string;
};

const Description: React.FC<Props> = ({ html }) => (
    <>
        <div dangerouslySetInnerHTML={useFormatHtml(html)} />
    </>
);

export default Description;
