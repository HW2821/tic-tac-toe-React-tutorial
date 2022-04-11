import React from "react"
import styled from "styled-components"

const Container = styled.div`
  background-color: white;
  font-weight: 700;
  font-size: 2.5rem;
  text-align: center;
  user-select: none;
  width: 3rem;
  height: 3rem;
  cursor: pointer;
`

export default function Tile({ player, handleTileClick }) {
  return <Container onClick={handleTileClick}>{player}</Container>
}
