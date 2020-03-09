import styled from 'styled-components';

const NeutralLink = styled.a`
  color: ${props => (props.disabled ? '#c9c9c9 !important' : '#68a4ec')};
  margin-left: 5px;

  &:hover {
    color: white !important;
  }
`;

export { NeutralLink };
