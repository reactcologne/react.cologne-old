import React, { Fragment, useState } from 'react'

const OverflowList = ({
  items,
  itemRenderer,
  maxItems = Infinity,
  overflowRenderer,
}) => {
  const [showAll, setShowAll] = useState(false)

  if (showAll) {
    return items.map(itemRenderer)
  } else {
    const remainingItems = items.length - maxItems
    return (
      <Fragment>
        {items.slice(0, maxItems).map(itemRenderer)}
        {overflowRenderer({ remainingItems, setShowAll })}
      </Fragment>
    )
  }
}

export default OverflowList
