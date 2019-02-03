import React from 'react'
import { StaticQuery, graphql } from 'gatsby'

import Layout from '../components/layout'
import SEO from '../components/seo'

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <p>This site is currently under construction.</p>
    {/* This code is messy and just a proof of concept */}
    <StaticQuery
      query={eventsQuery}
      render={data => (
        <>
          <h2>Upcoming Meetups</h2>
          {!data.upcomingEvents ? (
            <p>Nothing announced yet.</p>
          ) : (
            data.upcomingEvents.edges.map(({ node }) => (
              <li key={node.id}>
                <a href={node.link}>{node.name}</a> ({node.local_date}{' '}
                {node.local_time})
              </li>
            ))
          )}
          <hr />
          <h2>Past Meetups</h2>
          {!data.pastEvents ? (
            <p>Nothing announced yet.</p>
          ) : (
            data.pastEvents.edges.map(({ node }) => (
              <li key={node.id}>
                <a href={node.link}>{node.name}</a> ({node.local_date}{' '}
                {node.local_time})
              </li>
            ))
          )}
        </>
      )}
    />
  </Layout>
)

export default IndexPage

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
    local_time
    local_date
  }
`
