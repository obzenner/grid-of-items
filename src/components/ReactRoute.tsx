import * as React from 'react';

interface Props { description: string };

export default (props: Props) => {
    const { description } = props;
    return <h1>{description} <a href="/">Return to main</a></h1>;
};