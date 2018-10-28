import { memo } from 'react'
import styled from 'styled-components'

const Avatar = styled.div`
  background-image: url('https://avatars2.githubusercontent.com/u/5496931?s=460&v=4');
  background-position: center center;
  background-repeat: no-repeat;
  background-size: 100%;
  border-radius: 100px;
  height: 200px;
  width: 200px;
`

export default memo(Avatar)
