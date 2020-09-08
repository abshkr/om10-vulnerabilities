import styled from 'styled-components';

export const TankViewContainer = styled.div`
  margin-top: 10px;

  .ant-tabs-bar {
    margin-bottom: 10px;
  }
`;

export const SearchSuffixContainer = styled.div`
  color: #e0e0e0;
`;

export const ToolbarContainer = styled.div`
  display: flex;
  align-items: flex-end;
`;

export const GeneralContainer = styled.div`
  width: calc(40vw - 50px);
  display: flex;
  flex-direction: column;

  .ant-descriptions {
    width: 100% !important;
  }

  .ant-descriptions-bordered.ant-descriptions-small .ant-descriptions-item-label,
  .ant-descriptions-bordered.ant-descriptions-small .ant-descriptions-item-content {
    padding: 4px !important;
  }

  .ant-descriptions-item-label {
    font-size: 12px !important;
  }

  .ant-descriptions-item-content {
    font-size: 12px !important;
  }
`;
