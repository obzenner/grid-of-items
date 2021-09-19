import * as React from "react";
import styled, { keyframes, css } from 'styled-components';
import { sortBy } from 'lodash';

import type { Ninjas, Ninja } from '../../utils/generate-grid-items';
import { useInView } from 'react-intersection-observer';

// Sort and filter functions: TODO => Sort and filter functions: Move to folders and write tests
const sortByParam = (data: Ninja[] | null, sortParam: string) => {
  return sortBy(data, sortParam);
}

// TODO: Improve performance
const filterNinjas = (data: Ninja[] | null, filterValues: { [key: string]: string }, filterParams: string[]) => {
  return data.reduce((acc, ninja) => {
    // go through the sort params, check if they match and write result to accumulator
    const isAMatch = filterParams.reduce((match, param) => {
      const validator = ninja[param].toLowerCase().includes(filterValues[param].toLowerCase());
      match = [...match, validator];
      return match;
    }, []);

    // if all values in accumulator add up to boolean, set the "visible" attribute to true
    ninja.visible = isAMatch.every(v => Boolean(v));

    return [...acc, ninja];
  }, []);
}

const Spin = keyframes`
  100% { 
    transform: rotateY(360deg); 
  } 
`;

const MenuWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px 0;
`;

const NinjasWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  max-width: 800px;
  margin: auto;
`;

type NinjaWrapperProps = {
  triggerFlip: boolean
}

const NinjaWrapper = styled.div<NinjaWrapperProps>`
  display: flex;
  flex-wrap: wrap;
  width: 185px;
  margin: 5px;
  justify-content: center;
  border: 1px solid #efefef;
  border-radius: 4px;

  ${props => props.triggerFlip && css`
    animation: ${Spin} 0.7s linear;
  `}
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

const SortButton = styled.button`
  background: none;
  margin: 0 4px;
  border-radius: 4px;
  cursor: pointer;
`;

const FilterLabel = styled.label`
  margin: 0 5px;

  input[type="text"] {
    margin-left: 4px;
    border-radius: 4px;
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
  const [triggerFlip, doTriggerFlip] = React.useState(false);
  const { ref, inView } = useInView({ trackVisibility: true, delay: 300, triggerOnce: true });

  const { name, flagAndCity, avatar } = props.ninja;

  return (props.ninja.visible && <NinjaWrapper triggerFlip={triggerFlip} ref={ref}>
    <NinjaContentWrapper>
      <NinjaAvatar>
        {inView && <AvatarWrapper isAvatarVisible={isAvatarVisible} onLoad={() => {
          showAvatar(inView)
          doTriggerFlip(inView)
        }} src={avatar} />}
      </NinjaAvatar>
      <h4>{inView && name}</h4>
      <h5>{inView && flagAndCity}</h5>
    </NinjaContentWrapper>
  </NinjaWrapper>)
}

// Ninja List
const NinjasList = (props: { data?: Ninjas }) => {
  if (!props.data || !props.data.ninjas) {
    return (<h3>{'No Ninjas Found'}</h3>);
  }

  // add visibility prop for filtering
  const ninjasWithVisibility = (): Ninja[] => {
    return props.data.ninjas.map(ninja => {
      ninja.visible = true;
      return ninja;
    })
  }

  const [ninjas, setNinjas] = React.useState<Ninja[] | null>(ninjasWithVisibility || null);
  const [nameFilterValue, setNameFilterValue] = React.useState('');
  const [locationFilterValue, setLocationFilterValue] = React.useState('');

  return (<>
    <MenuWrapper>
      <SortButton onClick={() => {
        setNinjas(sortByParam(ninjas, 'flagAndCity'));
      }}>Sort by location</SortButton>
      <SortButton onClick={() => {
        setNinjas(sortByParam(ninjas, 'name'));
      }}>Sort by name</SortButton>
      <FilterLabel>
        Filter by name:
        <input
          type="text"
          value={nameFilterValue}
          onChange={async (event) => {
            setNameFilterValue(event.target.value);
            const filtered = filterNinjas(ninjas, {name: event.target.value, flagAndCity: locationFilterValue}, ['name', 'flagAndCity']);
            setNinjas(filtered);
          }} />
      </FilterLabel>
      <FilterLabel>
        Filter by location:
        <input
          type="text"
          value={locationFilterValue}
          onChange={(event) => {
            setLocationFilterValue(event.target.value);
            const filtered = filterNinjas(ninjas, {name: nameFilterValue, flagAndCity: event.target.value}, ['name', 'flagAndCity']);
            setNinjas(filtered);
          }} />
      </FilterLabel>
    </MenuWrapper>
    <NinjasWrapper>
      {ninjas && ninjas.map(ninja => {
        return (<NinjaBox key={ninja.name} ninja={ninja} />)
      })}
    </NinjasWrapper>
  </>)

}

export default NinjasList;