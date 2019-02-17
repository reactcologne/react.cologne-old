import React from 'react'
import styled from 'styled-components'

import { colors, fonts, typography, scale } from '@/theme'

export const Text = styled.span(({ type, color, bold, italic }) => {
  const typo = typography[type] || {}
  return {
    ...typo,
    color,
    fontWeight: bold ? fonts.bold.fontWeight : typo.fontWeight,
    fontStyle: italic ? fonts.italic.fontStyle : typo.fontStyle,
  }
})

export const Flex = styled.div(
  ({
    display = 'flex',
    direction,
    justifyContent,
    wrap,
    alignItems,
    alignContent,
    basis,
    grow,
    shrink,
    order,
    alignSelf,
    flex,
  }) => ({
    flexDirection: direction,
    flexWrap: wrap,
    flexBasis: basis,
    flexGrow: grow,
    flexShrink: shrink,
    display,
    justifyContent,
    alignItems,
    alignContent,
    order,
    flex,
  })
)

export const Link = ({ href, children, ...props }) => (
  <a
    href={href}
    {...props}
    css={{
      ...fonts.bold,
    }}
    target="_blank"
    rel="noopener noreferrer"
  >
    {children}
  </a>
)

export const WidthConstraint = styled.div({
  maxWidth: 800,
  margin: '0 auto',
})

export const Spacer = styled.div(({ unit = 0, horizontal, flex }) => ({
  [horizontal ? 'width' : 'height']: scale(unit),
  flexGrow: flex && 1,
  flexShrink: 0,
}))

export const UnstyledButton = styled.button({
  padding: 0,
  background: 'none',
  border: 'none',
  color: 'inherit',
  font: 'inherit',
  cursor: 'pointer',
})

export const Button = styled(UnstyledButton)({
  ':hover': {
    color: colors.rosy,
  },
})
