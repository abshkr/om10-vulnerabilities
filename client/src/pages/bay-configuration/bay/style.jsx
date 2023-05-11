import styled from 'styled-components';

const OverviewContainer = styled.div`
  display: flex;
  align-content: center;
  align-items: center;
  height: -webkit-fill-available;
  overflow-y: auto;

  & .rd3t-tree-container {
    height: calc(100vh - 260px);
  }
`;

export { OverviewContainer };
