// src/public/components/Hello.js
import * as React from "react";
import type { Ninjas, Ninja } from '../../utils/generate-grid-items';

const NinjaBox = (props: { ninja: Ninja }) => {
  const { name, flagAndCity, avatar } = props.ninja;

  const [finalName, setName] = React.useState(name)

  return (<>
    <h1 onClick={() => setName('my life is so... weird')}>{finalName}</h1>
  </>)
}

const NinjasList = (props: { data?: Ninjas}) => {
  if (!props.data) {
    return (<>{'No Ninjas Found'}</>);
  }
  return (<>{props.data && props.data.ninjas.map(ninja => <NinjaBox ninja={ninja} />)}</>)

}

export default NinjasList;