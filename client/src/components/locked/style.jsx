import styled from 'styled-components';

const LockedContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  transform: -webkit-translate(-50%, -50%);
  transform: -moz-translate(-50%, -50%);
  transform: -ms-translate(-50%, -50%);

  .ant-result-title {
    font-weight: bold;
  }
`;

export default LockedContainer;
