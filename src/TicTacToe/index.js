import React, { useEffect, useState } from "react"
import styled from "styled-components"
import Board from "./Board"
import Tile from "./Tile"
import TimeTravel from "./TimeTravel"

const Container = styled.div`
  display: flex;
  gap: 1rem;
  padding: 1rem;
`

export default function TicTacToe() {
  const [winner, setWinner] = useState(null)
  const [player, setPlayer] = useState("X")
  const [board, setBoard] = useState(Array.from({ length: 9 }, () => ""))
  const [steps, setSteps] = useState([[...board]])

  const handleTileClick = (key) => {
    const currentTile = board[key]
    if (currentTile || winner) return
    const newBoard = [...board]
    newBoard[key] = player
    setBoard(newBoard)
    setPlayer(player === "X" ? "O" : "X")

    const newSteps = structuredClone(steps)
    newSteps.push(newBoard)
    setSteps(newSteps)
  }

  const handleTimeClick = (key) => {
    const newSteps = steps.slice(0, key + 1)
    setBoard([...newSteps[key]])
    setSteps(newSteps)
    setWinner(null)
    setPlayer(newSteps.length % 2 ? "X" : "O")
  }

  useEffect(() => {
    const result = checkWiner(board)
    setWinner(result || null)
  }, [board])

  return (
    <Container>
      <Board>
        {board.map((p, i) => (
          <Tile key={i} player={p} handleTileClick={() => handleTileClick(i)} />
        ))}
      </Board>
      <TimeTravel player={player} winner={winner}>
        {steps.map((s, i) => (
          <TimeTravel.Step step={i} key={i} handleTimeClick={() => handleTimeClick(i)} />
        ))}
      </TimeTravel>
    </Container>
  )
}

function checkWiner(board) {
  return checkRows() || checkColums() || checkAx()

  function checkRows() {
    const startIndex = [0, 3, 6]
    for (let num of startIndex) {
      let startTile = board[num]

      if (!startTile) continue
      let flag = true
      for (let i = 1; i <= 2; i++) {
        if (startTile !== board[num + i]) flag = false
      }
      if (flag) return startTile
    }
    return false
  }

  function checkColums() {
    const startIndex = [0, 1, 2]
    for (let num of startIndex) {
      let startTile = board[num]
      if (!startTile) continue
      let flag = true
      for (let i = 1; i <= 2; i++) {
        if (startTile !== board[num + i * 3]) {
          flag = false
          break
        }
      }
      if (flag) return startTile
    }
    return false
  }

  function checkAx() {
    const axRight = [0, 4, 8]
    const axLeft = [2, 4, 6]

    let flag = true
    let init = board[axRight[0]]
    for (let num of axRight) {
      if (board[num] !== init) {
        flag = false
        break
      }
    }
    if (flag) return init
    flag = true
    init = board[axLeft[0]]
    for (let num of axLeft) {
      if (board[num] !== init) {
        flag = false
        break
      }
    }

    if (flag) return init
  }
}
