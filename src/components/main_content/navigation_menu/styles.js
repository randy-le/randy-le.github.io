import styled from 'styled-components'
import { animated } from 'react-spring'

const Frame = styled('div')`
  position: relative;
  padding: 10px 0px 0px 0px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow-x: hidden;
  vertical-align: middle;
  color: black;
  fill: black;
`

const Title = styled('span')`
  vertical-align: middle;
  cursor: pointer;
  margin-left: 10px;
`

const Content = styled(animated.div)`
  will-change: transform, opacity, height;
  margin-left: 6px;
  padding: 0px 0px 0px 14px;
  border-left: 1px dashed rgba(255, 255, 255, 0.4);
  overflow: hidden;
`

const toggle = {
  width: '1em',
  height: '1em',
  marginRight: 10,
  cursor: 'pointer',
  verticalAlign: 'middle'
}

export { Frame, Content, toggle, Title }
