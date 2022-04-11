import React from "react"
import styled from "styled-components"

const Container = styled.div`
  background-color: black;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  row-gap: 2px;
  column-gap: 2px;
  border: 2px solid black;
  height: fit-content;
`

export default function Board({ children, restProps }) {
  return <Container {...restProps}>{children}</Container>
}
