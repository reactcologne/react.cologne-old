import React, { Fragment } from 'react'
import 'modern-normalize'
import styled, { createGlobalStyle } from 'styled-components'

import { colors, typography } from '@/theme'

const GlobalStyle = createGlobalStyle({
  body: {
    backgroundColor: colors.snark,
    ...typography.body,
    WebkitFontSmoothing: 'antialiased',
  },
})

const PageContainer = styled.div({
  width: '100vw',
  height: '100vh',
  display: 'flex',
  flexDirection: 'column',
})

const Layout = ({ children }) => (
  <Fragment>
    <GlobalStyle />
    <PageContainer>{children}</PageContainer>
  </Fragment>
)

export default Layout
