import styled from 'styled-components';

const CheckboxContainer = styled.div`
  .ant-checkbox-checked::after {
    border-color: ${(props) => props.primary};
  }

  .ant-checkbox-checked .ant-checkbox-inner {
    border-color: ${(props) => props.primary};
    background-color: #ffffff;
  }

  .ant-checkbox-wrapper:hover .ant-checkbox-inner,
  .ant-checkbox:hover .ant-checkbox-inner,
  .ant-checkbox-input:focus + .ant-checkbox-inner {
    border-color: ${(props) => props.primary};
  }
`;

export default CheckboxContainer;
