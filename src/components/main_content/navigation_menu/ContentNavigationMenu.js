import { MinusIcon, PlusIcon } from 'evergreen-ui'
import React, { memo, useState } from 'react'
import { useSpring, a } from 'react-spring'
import { useMeasure, usePrevious } from './helpers'
import { Frame, Title, Content, toggle } from './styles'
import './ContentNavigationMenu.scss'

const Tree = memo(({ children, name, style, defaultOpen = false, active, onClick }) => {
  const [isOpen, setOpen] = useState(defaultOpen)
  const previous = usePrevious(isOpen)
  const [bind, { height: viewHeight }] = useMeasure()
  const { height, opacity, transform } = useSpring({
    from: { height: 0, opacity: 0, transform: 'translate3d(20px,0,0)' },
    to: { height: isOpen ? viewHeight : 0, opacity: isOpen ? 1 : 0, transform: `translate3d(${isOpen ? 0 : 20}px,0,0)` }
  })

  const handleIcon = () => {
    const icon = `${children ? (isOpen ? 'Minus' : 'Plus') : 'Close'}`
    let style = { 
      ...toggle, 
      opacity: children ? 1 : 0.3,
    }

    switch ( icon ) {
      case `Minus`:
        return <MinusIcon style={style} size={20} onClick={() => setOpen(!isOpen)}/>
      case `Plus`:
        return <PlusIcon style={style} size={20} onClick={() => setOpen(!isOpen)}/>
      default:
        return null;
    }
  }

  return (
    <Frame>
      { handleIcon() }
      <Title 
        style={ { ...style, fontWeight: active ? `bold`: null, color: active ? `#115644` : null } } 
        onClick={ () => { 
          if ( `${children ? ( isOpen ? 'Minus' : 'Plus') : 'Close'}` !== `Close` ) {
             setOpen( !isOpen );
          } else if ( onClick ) {
            onClick(name);
          }
        } }>
          {name}
      </Title>
      <Content style={{ opacity, height: isOpen && previous === isOpen ? 'auto' : height }}>
        <a.div style={{ transform }} {...bind} children={children} />
      </Content>
    </Frame>
  )
})

function ContentNavigationMenu ( content, handleMenuClick ) {
  return (
    <div className={ `content-navigation-container` }>
      <div className={ `content-navigation-menu` }>
        <Tree name="About" active={content === `About`} onClick={ handleMenuClick }/>
        <Tree name="Components & Designs">
          <Tree name="Flip Card & Image Fade" active={content === `Flip Card & Image Fade`} onClick={ handleMenuClick }/> { /* Dogs */ }
          <Tree name="Masonry Grid" active={content === `Masonry Grid`} onClick={ handleMenuClick }/> { /* Basketball */ }
          <Tree name="View Pager" active={content === `View Pager`} onClick={ handleMenuClick }/> { /* Anime/Manga */ }
          <Tree name="Notifications" active={content === `Notifications`} onClick={ handleMenuClick }/> { /* Horde */ }
        </Tree>
        <Tree name="Contact Information" active={content === `Contact Information`} onClick={ handleMenuClick }/>
      </div>
    </div>
  )
}

export default ContentNavigationMenu;
