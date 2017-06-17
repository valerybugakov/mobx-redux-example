import React from 'react'
import styled from 'styled-components'
import { inject } from 'redux/utils'
import Field from './Field'

const Container = styled.div`
  padding: 15px 0;

  & input {
    margin-top: 10px;
    min-width: 150px;
    margin-right: 15px;
    font-size: 16px;
  }
`

const AnotherForm = ({ formData, setAnotherFormField }) => (
  <Container>
    <div>Another form</div>
    <Field
      name="firstName"
      data={formData}
      Component="input"
      onChange={setAnotherFormField}
    />
    <Field
      name="lastName"
      data={formData}
      Component="input"
      onChange={setAnotherFormField}
    />
    <hr />
  </Container>
)


export default inject((state, { setAnotherFormField }) => ({
  setAnotherFormField,
  formData: state.anotherForm,
}))(AnotherForm)
