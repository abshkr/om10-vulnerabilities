import styled from 'styled-components';

const PageContainer = styled.div`
  & .ant-page-header {
    padding-top: 0px;
    padding-left: 5px;
    padding-right: 0px;
    width: 35vw !important;
  }

  .ant-breadcrumb a {
    pointer-events: none;
    cursor: default;
  }
`;

const PageHeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const PageHeaderExtras = styled.div`
  & .ant-btn {
    margin-left: 5px;
  }
`;

const PageInjector = styled.div`
  padding: 10px;
  background: ${props => (props.isBlank ? 'none' : '#fff')};
  border-radius: 4px;
  box-shadow: ${props =>
    props.isBlank ? 'none' : '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'};
`;

export { PageContainer, PageInjector, PageHeaderContainer, PageHeaderExtras };
