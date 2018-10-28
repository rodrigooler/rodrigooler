import { memo } from 'react'
import Column from './Column'
import styled from 'styled-components'

const Nav = styled.nav`
  display: flex;
  flex-direction: row;
  border-color: 1px solid black;
`

export default memo(() => (
  <Nav>
    <Column>
      <a>logo</a>
    </Column>
    <Column>
      <a>Home</a>
      <a>Projects</a>
      <a>Apps</a>
      <a>Donate</a>
      <a>About</a>
      <a>Contact</a>
      <a>Blog</a>
    </Column>
  </Nav>
))
