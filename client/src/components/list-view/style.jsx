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

  .ant-list-loading {
    background: white !important;
    border-radius: 5px !important;
    margin-right: 10px !important;
  }
`;

const ViewContainer = styled.div`
  width: 75vw;
  marginleft: 2;
`;

const CardContainer = styled.div`
  .ant-card {
    margin-bottom: 5px;
    border-radius: 5px;
    background: ${(props) => props.background || '#fff'};
    border: ${(props) => (props.selected ? '1px solid #0054A4' : '#fff')} !important;
  }
`;

export { ListViewContainer, ViewContainer, CardContainer };
