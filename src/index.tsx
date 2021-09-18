import * as React from 'react';
import ReactDOM from 'react-dom';

interface IndexProps { welcome: string };

const Index = (props: IndexProps) => {
  return <div>{props.welcome}</div>;
};

ReactDOM.render(<Index welcome={'Hello world!'} />, document.getElementById('root'));