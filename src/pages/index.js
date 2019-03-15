import React, { Fragment } from 'react'
import { StaticQuery, graphql } from 'gatsby'
import styled from 'styled-components'
import format from 'date-fns/format'
import locale from 'date-fns/locale/de'
import {
  padding,
  position,
  transparentize,
  shade,
  lighten,
  darken,
} from 'polished'

import { colors, waves, scale, typography } from '@/theme'

import Layout from '@/components/Layout'
import SEO from '@/components/Seo'
import DistortedBox from '@/components/DistortedBox'
import SlackLogo from '@/components/SlackLogo'
import MeetupLogo from '@/components/MeetupLogo'
import OverflowList from '@/components/OverflowList'
import Wave from '@/components/Wave'
import {
  Text,
  Link,
  WidthConstraint,
  Spacer,
  Button,
  Flex,
} from '@/components/Ui'

import useWindowSize from '@/hooks/useWindowSize'

const CallToAction = ({ image, text, action }) => (
  <Flex
    direction="column"
    alignItems="center"
    flex={1}
    css={{
      '& ~ &': {
        marginLeft: scale(3),
        paddingLeft: scale(3),
        borderLeft: `1px solid ${lighten(0.2, colors.snark)}`,
      },
    }}
  >
    <div css={{ ...padding(0, scale(5)) }}>{image}</div>

    <Spacer unit={2} />

    <div>{text}</div>

    <Spacer unit={2} flex />
    {action}
  </Flex>
)

const Header = styled.header({
  ...padding(scale(2), scale(3), scale(0)),
  position: 'relative',
  zIndex: 1,
})

const Middle = styled.section({
  position: 'relative',
  flex: 1,
  ...padding(scale(5), scale(3), scale(6)),
})

const Footer = styled.footer({
  color: colors.snark,
  backgroundColor: colors.bright,
  position: 'relative',
  zIndex: 1,
  ...padding(scale(4), scale(3), scale(6)),
})

const NextEvent = ({ children }) => (
  <div
    css={{
      position: 'relative',
    }}
  >
    <DistortedBox
      css={{
        filter: `
          drop-shadow(0 5px 10px ${transparentize(
            0.4,
            shade(0.3, colors.rosy)
          )})
          drop-shadow(0 2px 2px rgba(0, 0, 0, 0.2))
        `,
      }}
    />

    <Flex
      alignItems="center"
      justifyContent="center"
      css={{
        ...position('absolute', 0),
        ...padding(30, 50, 50, 30),
      }}
    >
      <main
        css={{
          fontSize: scale(0),
          color: colors.snark,
        }}
      >
        {children}
      </main>
    </Flex>
  </div>
)

const IndexPage = ({
  upcomingEvents: {
    edges: [{ node: upcomingEvent }],
  },
  pastEvents,
}) => {
  const { width } = useWindowSize()
  const description = `
Home of the reac.cologne community meetup.
Join us for "${upcomingEvent.name}" on ${format(
    upcomingEvent.localDate,
    'MMMM do'
  )}!
`
  console.log(description)

  return (
    <Layout>
      <SEO title="Home" description={description} />
      <Header>
        {waves.map((wave, index, { length }) => (
          <Wave
            {...wave}
            key={`wave-${index}`}
            width={width}
            height={500 + (length - index) * 5}
            css={{ position: 'absolute', top: 0, left: 0 }}
          />
        ))}

        <WidthConstraint>
          <Text
            type="sectionHeader"
            as="h1"
            css={{
              textShadow: `1px 1px 2px ${darken(0.1, colors.rosy)}`,
            }}
          >
            {'<React.Cologne />'}
          </Text>

          <NextEvent>
            <div>{'// Next Event'}</div>

            <Spacer />

            <Link href={upcomingEvent.link} style={typography.eventLink}>
              <div>{upcomingEvent.name}</div>
            </Link>

            <div css={{ marginTop: 7 }}>
              {'am '}
              <Text bold>
                {format(upcomingEvent.localDate, 'DD.MM.YYYY', { locale })}
              </Text>
              {' um '}
              <Text bold>{upcomingEvent.localTime}</Text>
            </div>

            <Spacer unit={2} />

            <Link
              style={typography.locationLink}
              href={`https://maps.google.com/?q=${
                upcomingEvent.venue.address
              }, ${upcomingEvent.venue.city}`}
            >
              @ {upcomingEvent.venue.name}, {upcomingEvent.venue.address}
              {' in '}
              {upcomingEvent.venue.city}
            </Link>
          </NextEvent>
        </WidthConstraint>
      </Header>

      <Middle>
        <WidthConstraint>
          <Text
            type="sectionHeader"
            as="h2"
            italic
            css={{
              textShadow: `1px 1px 2px ${darken(0.1, colors.snark)}`,
            }}
          >
            {'// Get involved'}
          </Text>
          <Spacer unit={3} />
          <Flex>
            <CallToAction
              image={<SlackLogo />}
              text="The React Cologne meetup is a community effort. We want to build a meetup for the community, by the community. Join our Slack workspace to get invovled in the meetup or just to chat a little. Everyone is welcome!"
              action={
                <Link
                  href="https://reactcologne-slack.herokuapp.com/"
                  style={typography.callToActionLink}
                >
                  {'> Join Slack'}
                </Link>
              }
            />

            <CallToAction
              image={<MeetupLogo />}
              text="Join the meetup group to stay updated on upcoming events and connect to other attendees."
              action={
                <Link
                  href="https://www.meetup.com/React-Cologne/"
                  style={typography.callToActionLink}
                >
                  {'> Join Meetup Group'}
                </Link>
              }
            />
          </Flex>
        </WidthConstraint>

        <Wave
          flip
          colors={['#FFFFFF']}
          points={4}
          heightFactor={0.5}
          width={width}
          height={100}
          css={{ position: 'absolute', bottom: 0, left: 0 }}
        />
      </Middle>

      <Footer>
        <WidthConstraint>
          <Text type="sectionHeader" as="h2" italic>
            {'// Past events'}
          </Text>

          {pastEvents && (
            <OverflowList
              maxItems={3}
              items={pastEvents.edges}
              itemRenderer={({ node }) => (
                <div key={node.id} css={{ '& + &': { marginTop: scale(1) } }}>
                  <Text as="small" style={{ display: 'block' }}>
                    {format(node.localDate, 'DD.MM.YYYY', { locale })}
                  </Text>
                  <Link style={typography.pastEventLink} href={node.link}>
                    {node.name}
                  </Link>
                </div>
              )}
              overflowRenderer={({ remainingItems, setShowAll }) => (
                <Fragment>
                  <Spacer />
                  <Text as={Button} onClick={() => setShowAll(true)}>
                    and {remainingItems} more
                  </Text>
                </Fragment>
              )}
            />
          )}
        </WidthConstraint>
      </Footer>
    </Layout>
  )
}

export default () => (
  <StaticQuery query={eventsQuery} render={data => <IndexPage {...data} />} />
)

const eventsQuery = graphql`
  query EventsListQuery {
    upcomingEvents: allMeetupcomEvent(filter: { status: { eq: "upcoming" } }) {
      edges {
        node {
          ...eventFields
        }
      }
    }
    pastEvents: allMeetupcomEvent(filter: { status: { eq: "past" } }) {
      edges {
        node {
          ...eventFields
        }
      }
    }
  }

  fragment eventFields on meetupcom__event {
    id
    name
    link
    localTime: local_time
    localDate: local_date

    venue {
      name
      address: address_1
      city
    }
  }
`
