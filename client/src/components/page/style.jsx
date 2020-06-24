import styled from 'styled-components';

const PageContainer = styled.div`
  & .ant-page-header {
    padding-top: 10px;
    padding-left: 5px;
    padding-right: 0px;
    padding-bottom: 3px;
  }

  .ant-breadcrumb a {
    pointer-events: none;
    cursor: default;
  }

  width: 100%;
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
  border: ${(props) => (props.minimal || props.transparent ? 'none' : '1px solid #d9d9d9')};
  padding: ${(props) => (props.minimal || props.transparent ? 'none' : '10px')};
  background: ${(props) => (props.minimal || props.transparent ? 'none' : '#fff')};
  border-radius: 2px;
  margin-bottom: 25px;
  box-shadow: ${(props) =>
    props.minimal || props.transparent
      ? 'none'
      : '0 2px 0 rgba(54,45,89,0.15), 0 0 100px rgba(54,45,89,0.2)'};
`;

export { PageContainer, PageInjector, PageHeaderContainer, PageHeaderExtras };
