import styled from 'styled-components';

const PageContainer = styled.div`
  margin-bottom: 50px;
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
  border: ${props => (props.isBlank ? 'none' : '1px solid #d9d9d9')};
  padding: 10px;
  background: ${props => (props.isBlank ? 'none' : '#fff')};
  border-radius: 2px;
  box-shadow: ${props => (props.isBlank ? 'none' : '0 2px 0 rgba(0, 0, 0, 0.015)')};
`;

export { PageContainer, PageInjector, PageHeaderContainer, PageHeaderExtras };
