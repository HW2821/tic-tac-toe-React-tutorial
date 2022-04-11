import React from "react"
import styled from "styled-components"

const Container = styled.div``
const Title = styled.h3``
const List = styled.ol``
const ListItem = styled.li`
  padding: 5px;
`

export default function TimeTravel({ children, player, winner, ...restProps }) {
  return (
    <Container>
      <Title>{winner ? `Winner is ${winner}` : `Next Player: ${player}`}</Title>
      <List>{children}</List>
    </Container>
  )
}

TimeTravel.Step = ({ step, handleTimeClick }) => {
  return (
    <ListItem onClick={handleTimeClick}>
      {step === 0 ? <button>Go to game start</button> : <button>Go to move #{step}</button>}
    </ListItem>
  )
}
