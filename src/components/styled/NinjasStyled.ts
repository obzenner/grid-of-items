import styled, { keyframes, css } from 'styled-components';

const Spin = keyframes`
  100% { 
    transform: rotateY(360deg); 
  } 
`;

const MenuWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px auto;

  @media (max-width: 768px) {
    flex-direction: column;
    max-width: 200px;
  }
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

type AvatarWrapperProps = {
  isAvatarVisible: boolean
}

const AvatarWrapper = styled.img<AvatarWrapperProps>`
  opacity: ${props => props.isAvatarVisible ? '1' : '0'};
  transition: opacity 0.7s ease-in-out;
`;

const SortButton = styled.button`
  background: none;
  margin: 5px 4px;
  border-radius: 4px;
  cursor: pointer;
  max-width: 200px;
`;

const FilterLabel = styled.label`
  margin: 5px 5px;

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    max-width: 200px;
  }

  input[type="text"] {
    margin-left: 4px;
    border-radius: 4px;
  }
`;

export {
  MenuWrapper,
  NinjaWrapper,
  NinjasWrapper,
  NinjaContentWrapper,
  NinjaAvatar,
  SortButton,
  FilterLabel,
  AvatarWrapper
}