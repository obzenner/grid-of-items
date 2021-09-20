import * as React from "react";

// Styles
import {
  MenuWrapper,
  NinjaWrapper,
  NinjasWrapper,
  NinjaContentWrapper,
  NinjaAvatar,
  SortButton,
  FilterLabel,
  AvatarWrapper
} from '../components/styled/NinjasStyled';

import type { Ninjas, Ninja } from '../../utils/generate-grid-items';
import { useInView } from 'react-intersection-observer';

import { sortByParam, filterNinjas } from '../helpers/NinjasHelpers';

// Individual Ninja card
const NinjaBox = (props: { ninja: Ninja }) => {
  const [isAvatarVisible, showAvatar] = React.useState(false);
  const [triggerFlip, doTriggerFlip] = React.useState(false);

  // intersection-observer to track ninjas visibility.
  // TODO: Ninjas can be grouped in wrappers with several ninjas to avoid tracking every individual card.
  const { ref, inView } = useInView({ trackVisibility: true, delay: 300, triggerOnce: true });

  const { name, flagAndCity, avatar } = props.ninja;

  return (props.ninja.visible && <NinjaWrapper triggerFlip={triggerFlip} ref={ref}>
    <NinjaContentWrapper>
      <NinjaAvatar>
        {inView && <AvatarWrapper isAvatarVisible={isAvatarVisible} onLoad={() => {
          showAvatar(inView)
          // flip animation :)
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
  const FILTER_PARAMS = ['name', 'flagAndCity'];

  if (!props.data || !props.data.ninjas) {
    return (<h3>{'No Ninjas Found'}</h3>);
  }

  // adds visibility prop that is used for filtering to maximize the use of React's virtual DOM
  // TODO: This should live outside of this file. The app should recieve correct data right away.
  const ninjasWithVisibility = (): Ninja[] => {
    return props.data.ninjas.map(ninja => {
      ninja.visible = true;
      return ninja;
    })
  }

  // Hooks
  const [ninjas, setNinjas] = React.useState<Ninja[] | null>(ninjasWithVisibility || null);
  const [nameFilterValue, setNameFilterValue] = React.useState('');
  const [locationFilterValue, setLocationFilterValue] = React.useState('');

  // Render
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
            const filterValues = {name: event.target.value, flagAndCity: locationFilterValue}
            const filteredNinjas = filterNinjas(ninjas, filterValues, FILTER_PARAMS);
            setNinjas(filteredNinjas);
          }} />
      </FilterLabel>
      <FilterLabel>
        Filter by location:
        <input
          type="text"
          value={locationFilterValue}
          onChange={(event) => {
            setLocationFilterValue(event.target.value);
            const filterValues = {name: nameFilterValue, flagAndCity: event.target.value};
            const filteredNinjas = filterNinjas(ninjas, filterValues, FILTER_PARAMS);
            setNinjas(filteredNinjas);
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