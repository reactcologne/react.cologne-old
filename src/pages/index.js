import React, { Fragment } from 'react'
import { StaticQuery, graphql } from 'gatsby'
import styled from 'styled-components'
import format from 'date-fns/format'
import locale from 'date-fns/locale/de'
import dedent from 'dedent'
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

const Header = styled.header`
  padding: 2rem 3rem 0;
  position: relative;
  z-index: 1;

  @media (max-width: 600px) {
    padding: 1rem 1.5rem 0;
  }
`

const HeaderBoxContent = styled.main`
  font-size: 1rem;
  color: ${colors.snark};

  @media (max-width: 600px) {
    margin-top: 2.5rem;
  }
`

const VenueLink = styled(Link)`
  font-size: 1rem;
  color: ${colors.rosy};

  @media (max-width: 600px) {
    color: #fff;
  }
`

const Middle = styled.section`
  position: relative;
  flex: 1;
  padding: 6rem 3rem;
`

const Footer = styled.footer({
  color: colors.snark,
  backgroundColor: colors.bright,
  position: 'relative',
  zIndex: 1,
  ...padding(scale(4), scale(3), scale(6)),
})

const NextEvent = ({ event }) => (
  <HeaderBox>
    <div>{'// Next Event'}</div>

    <Spacer />

    <Link href={event.link} style={typography.eventLink}>
      <div>{event.name}</div>
    </Link>

    <div css={{ marginTop: 7 }}>
      {'am '}
      <Text bold>{format(event.localDate, 'DD.MM.YYYY', { locale })}</Text>
      {' um '}
      <Text bold>{event.localTime}</Text>
    </div>

    <Spacer unit={2} />

    <VenueLink
      href={`https://maps.google.com/?q=${event.venue.address}, ${
        event.venue.city
      }`}
    >
      @ {event.venue.name}, {event.venue.address}
      {' in '}
      {event.venue.city}
    </VenueLink>
  </HeaderBox>
)

const HeaderBox = ({ children }) => (
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
      <HeaderBoxContent>{children}</HeaderBoxContent>
    </Flex>
  </div>
)

const upcomingEvent = {
  name: "React Cologne #15 – Comeback IRL",
  link: "https://www.meetup.com/de-DE/React-Cologne/events/285961248/",
  localDate: "2022-06-23",
  localTime: "18:30",
  venue: {
    address: "Balthasarstraße 79",
    name: "QOSSMIC GmbH",
    city: "Köln"
  }
}

const IndexPage = () => {
  const { width } = useWindowSize()

  return (
    <Layout>
      {upcomingEvent ? (
        <SEO
          title="Home"
          description={dedent`
            Home of the react.cologne community meetup.
            Join us for "${upcomingEvent.name}" on ${format(
            upcomingEvent.localDate,
            'MMMM do'
          )}!`}
        />
      ) : (
        <SEO
          title="Home"
          description={dedent`
            Home of the react.cologne community meetup
          `}
        />
      )}
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

        <Text
          type="sectionHeader"
          as="h1"
          css={{
            position: 'relative',
            zIndex: 1,
            textShadow: `1px 1px 2px ${darken(0.1, colors.rosy)}`,
          }}
        >
          {'<React.Cologne />'}
        </Text>

        <WidthConstraint>
          {upcomingEvent ? (
            <NextEvent event={upcomingEvent} />
          ) : (
            <HeaderBox>
              <Text type="sectionHeader" as="h2" italic>
                {'/* No upcoming event, check back soon! */'}
              </Text>
            </HeaderBox>
          )}
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
              text={`
                The React Cologne meetup is a community effort. We want to build a meetup for the community, by the community.
                Join our Slack workspace to get invovled in the meetup or just to chat a little. Everyone is welcome!
              `}
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

export default () => <IndexPage />

// export default () => (
//   <StaticQuery query={eventsQuery} render={data => <IndexPage {...data} />} />
// )

// const eventsQuery = graphql`
//   query EventsListQuery {
//     upcomingEvents: allMeetupcomEvent(filter: { status: { eq: "upcoming" } }) {
//       edges {
//         node {
//           ...eventFields
//         }
//       }
//     }
//     pastEvents: allMeetupcomEvent(filter: { status: { eq: "past" } }) {
//       edges {
//         node {
//           ...eventFields
//         }
//       }
//     }
//   }

//   fragment eventFields on meetupcom__event {
//     id
//     name
//     link
//     localTime: local_time
//     localDate: local_date

//     venue {
//       name
//       address: address_1
//       city
//     }
//   }
// `
