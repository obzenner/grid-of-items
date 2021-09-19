import * as React from "react";
import styled from 'styled-components';
import { sortBy } from 'lodash';

import type { Ninjas, Ninja } from '../../utils/generate-grid-items';
import { useInView } from 'react-intersection-observer';

const NinjasWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  max-width: 800px;
  margin: auto;
`;

const NinjaWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 185px;
  margin: 5px;
  justify-content: center;
  border: 1px solid #efefef;
  border-radius: 4px;
`;


const NinjaContentWrapper = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  justify-content: center;

  h4, h5
   {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0;
    width: 100%;
    height: 35px;
    text-align: center;
  }
`;

const NinjaAvatar = styled.div`
  display: flex;
  width: 100%;
  height: 200px;
  overflow: hidden;

  img {
    margin: auto;
    height: 100%;
  }
`;


type AvatarWrapperProps = {
  isAvatarVisible: boolean
}

const AvatarWrapper = styled.img<AvatarWrapperProps>`
  opacity: ${props => props.isAvatarVisible ? '1' : '0'};
  transition: opacity 0.7s ease-in-out;

`;

const NinjaBox = (props: { ninja: Ninja }) => {
  const [isAvatarVisible, showAvatar] = React.useState(false);
  const { ref, inView } = useInView({ trackVisibility: true, delay: 300, triggerOnce: true });

  const { name, flagAndCity, avatar } = props.ninja;

  return (<NinjaWrapper ref={ref}>
    <NinjaContentWrapper>
      <NinjaAvatar>
        {inView && <AvatarWrapper isAvatarVisible={isAvatarVisible} onLoad={() => {
          showAvatar(inView)
        }} src={avatar} />}
      </NinjaAvatar>
      <h4>{inView && name}</h4>
      <h5>{inView && flagAndCity}</h5>
    </NinjaContentWrapper>
  </NinjaWrapper>)
}

const sortByParam= (data: Ninja[] | null, sortParam: string) => {
  return sortBy(data, sortParam);
}

// Ninja List
const NinjasList = (props: { data?: Ninjas }) => {
  const [ninjas, setNinjas] = React.useState<Ninja[] | null>(props.data && props.data.ninjas || null);
  const [isNameSorted, sortByName] = React.useState(true)
  const [isLocationSorted, sortByLocation] = React.useState(false)

  if (!props.data) {
    return (<>{'No Ninjas Found'}</>);
  }
  return (<div>
    <button onClick={() => {
      sortByName(!isNameSorted);
      sortByLocation(isNameSorted);
      setNinjas(sortByParam(ninjas, 'name'));
    }}>Sort by name: {`${isNameSorted}`}</button>
    <button onClick={() => {
      sortByLocation(!isLocationSorted);
      sortByName(isLocationSorted);
      setNinjas(sortByParam(ninjas, 'flagAndCity'));
    }}>Sort by location: {`${isLocationSorted}`}</button>
    <NinjasWrapper>
      {ninjas && ninjas.map(ninja => {
        return (<NinjaBox key={ninja.name} ninja={ninja} />)
      })}
    </NinjasWrapper>
  </div>)

}

export default NinjasList;