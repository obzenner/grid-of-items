import * as React from "react";
import styled, { keyframes, css } from 'styled-components';

import type { Ninjas, Ninja } from '../../utils/generate-grid-items';
import TrackVisibility from 'react-on-screen';

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
`;


const NinjaContentWrapper = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  justify-content: center;

  h4, h5
   {
    width: 100%;
    min-height: 25px;
    text-align: center;
  }
`;

const NinjaAvatar = styled.div`
  display: flex;
  width: 90%;
  height: 200px;
  overflow: hidden;

  img {
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

const NinjaBox = (props: { ninja: Ninja, isVisible?: boolean }) => {
  const [isAvatarVisible, showAvatar] = React.useState(false);
  const { name, flagAndCity, avatar } = props.ninja;
  return (<NinjaWrapper>
      <NinjaContentWrapper> 
        <h4>{props.isVisible && name}</h4>
        <NinjaAvatar>
          {props.isVisible && <AvatarWrapper isAvatarVisible={isAvatarVisible} onLoad={() => {
            showAvatar(true)
          }} src={avatar} />}
        </NinjaAvatar>
        <h5>{props.isVisible && flagAndCity}</h5>
      </NinjaContentWrapper>
  </NinjaWrapper>)
}


// Ninja List
const NinjasList = (props: { data?: Ninjas}) => {
  if (!props.data) {
    return (<>{'No Ninjas Found'}</>);
  }
  return (<NinjasWrapper>{props.data && props.data.ninjas.map(ninja => {
    return (<TrackVisibility key={ninja.name} once offset={500}>
      <NinjaBox ninja={ninja} />
    </TrackVisibility>)
  }
  )}</NinjasWrapper>)

}

export default NinjasList;