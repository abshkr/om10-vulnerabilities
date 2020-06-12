import styled from 'styled-components';

const ListViewContainer = styled.div`
  display: flex;

  .ant-form-item-label > label {
    color: rgb(0, 84, 164);
    font-weight: 500;
  }

  .ant-list-items {
    margin-right: 10px !important;
  }

  .ant-list-item-meta-title h4 {
    color: #0054a4 !important;
  }

  .ant-list-item-meta {
    align-content: center;
    align-items: center;
  }
`;

const ViewContainer = styled.div`
  width: 75vw;
  marginleft: 2;

  .ant-tabs-bar {
    margin-bottom: 7px;
  }

  .ant-tabs .ant-tabs-top-content,
  .ant-tabs .ant-tabs-bottom-content {
    border-radius: 5px;
    height: calc(100vh - 240px);
  }

  .ant-card-body {
    padding: 5px;
  }

  .ant-card-actions > li {
    margin-bottom: 5px;
    padding-right: 5px;
  }

  .ant-card {
    border-radius: 5px;
  }
`;

const CardContainer = styled.div`
  .ant-card {
    margin-bottom: 5px;
    border-radius: 5px;
    background: ${(props) => props.background || '#fff'};
    border: ${(props) => (props.selected ? '1px solid #0054A4' : '#fff')} !important;
  }

  .ant-avatar {
    background: ${(props) => props.avatar || '#4269a7'};
    color: ${(props) => props.avatar === '#fff' && 'black'};
  }
`;

const DescriptionContainer = styled.div`
  color: black;
  font-size: 12;
`;

export { ListViewContainer, ViewContainer, CardContainer, DescriptionContainer };
