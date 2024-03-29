import { useRef, useState, useMemo, useEffect, MouseEvent } from 'react'
import { useTransition } from '@react-spring/web'
import { Main, Container, Message, Button, Content, Life } from './NotificationHubComponents'
import CloseSharpIcon from '@mui/icons-material/CloseSharp';
import './NotificationHub.scss';

let id = 0

interface NotificationHubProps {
  config?: {
    tension: number
    friction: number
    precision: number
  }
  timeout?: number
  children: (add: AddFunction) => void
}

type AddFunction = (msg: string) => void

interface Item {
  key: number
  msg: string
}

function Notifications({
  config = { tension: 125, friction: 20, precision: 0.1 },
  timeout = 3000,
  children,
}: NotificationHubProps) {
  const refMap = useMemo(() => new WeakMap(), [])
  const cancelMap = useMemo(() => new WeakMap(), [])
  const [items, setItems] = useState<Item[]>([])

  const transitions = useTransition(items, {
    from: { opacity: 0, height: 0, life: '100%' },
    keys: item => item.key,
    enter: item => async (next, cancel) => {
      cancelMap.set(item, cancel)
      await next({ opacity: 1, height: refMap.get(item).offsetHeight })
      await next({ life: '0%' })
    },
    leave: [{ opacity: 0 }, { height: 0 }],
    onRest: (result, ctrl, item) => {
      setItems(state =>
        state.filter(i => {
          return i.key !== item.key
        })
      )
    },
    config: (item, index, phase) => key => phase === 'enter' && key === 'life' ? { duration: timeout } : config,
  })

  useEffect(() => {
    children((msg: string) => {
      setItems(state => [...state, { key: id++, msg }])
    })
  }, [])

  return (
    <Container>
      {transitions(({ life, ...style }, item) => (
        <Message style={style}>
          <Content ref={(ref: HTMLDivElement) => ref && refMap.set(item, ref)}>
            <Life style={{ right: life }} />
            <p>{item.msg}</p>
            <Button
              className={ `button` }
              onClick={(e: MouseEvent) => {
                e.stopPropagation()
                if (cancelMap.has(item) && life.get() !== '0%') cancelMap.get(item)()
              }}>
              <CloseSharpIcon/>
            </Button>
          </Content>
        </Message>
      ))}
    </Container>
  )
}

export default function NotificationHub ( props: any ) {
  const ref = useRef<null | AddFunction>(null)

  const handleClick = ( message: string ) => {
    ref.current?.( message )
  }

  ( window as any ).createNotification = handleClick;

  return (
    <Notifications
        children={(add: AddFunction) => {
            ref.current = add
        }}
    />
  )
}
