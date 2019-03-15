import { modularScale, margin, lighten } from 'polished'

import '@/fonts/iosevka.css'

export const scale = unit => modularScale(unit)

export const colors = {
  bright: '#ffffff',
  rosy: '#FF79C6',
  beach: '#FFB86C',
  shnurple: '#BD93F9',
  skyward: '#8BE9FD',
  snark: '#44475A',
}

export const waves = [
  { points: 4, colors: [colors.shnurple, colors.skyward] },
  { points: 4, colors: [colors.rosy, colors.shnurple] },
  { points: 4, colors: [colors.beach, colors.rosy] },
]

export const fonts = {
  regular: {
    fontFamily: 'Iosevka, Consolas, Menlo, monospace',
    fontWeight: 400,
    fontStyle: 'normal',
  },
  bold: {
    fontFamily: 'Iosevka, Consolas, Menlo, monospace',
    fontWeight: 700,
    fontStyle: 'normal',
  },
  italic: {
    fontFamily: 'Iosevka, Consolas, Menlo, monospace',
    fontWeight: 500,
    fontStyle: 'italic',
  },
}

export const typography = {
  body: {
    ...fonts.regular,
    color: colors.bright,
    fontSize: 18,
  },
  sectionHeader: {
    ...margin(0, 0, scale(0), 0),
    ...fonts.bold,
    fontSize: scale(1.4),
  },
  eventLink: {
    fontSize: scale(1),
    color: colors.rosy,
  },
  callToActionLink: {
    ...fonts.bold,
    color: colors.beach,
    textDecoration: 'underline',
  },
  pastEventLink: {
    color: lighten(0.3, colors.snark),
  },
  locationLink: {
    color: lighten(0.3, colors.snark),
  },
}
