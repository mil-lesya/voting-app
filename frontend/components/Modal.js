import React from 'react'
import styled from 'styled-components'
import colors from '../assets/constants/colors'

const Modal = ({
                 backgroundStyle,
                 containerStyle,
                 visible,
                 setVisible,
                 children,
               }) => {
  return (
      <Background
        style={backgroundStyle}
        visible={visible}
        onClick={() => setVisible(false)}
      >
        <Container onClick={(e) => e.stopPropagation()} style={containerStyle}>
          {children}
        </Container>
      </Background>
  )
}
const Background = styled.div`
  display: ${(props) => (props.visible ? 'flex' : 'none')};
  z-index: 99;
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: ${colors.white};
  border-radius: 5px;
  padding: 50px;
  font-family: 'Noto Sans';
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 24px;
  color: ${colors.primary};
  cursor: auto;
`

export default Modal