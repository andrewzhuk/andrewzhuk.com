import React, { useState, useRef, useEffect, useLayoutEffect } from 'react'
import type { PostNode, ProjectNode, GraphQLEdge } from '../types'
import useDebouncedCallback from '../hooks/useDebouncedCallback'
import Item from './item'
import classNames from 'classnames'

type ItemsProps =
  | { type: 'post'; items: GraphQLEdge<PostNode>[] }
  | { type: 'project'; items: GraphQLEdge<ProjectNode>[] }

/**
 * @description - Grid component
 */
const Items = ({ type, items }: ItemsProps) => {
  const itemsContainerRef = useRef<HTMLDivElement | null>(null)
  const [arrows, setArrows] = useState({ left: false, right: false })

  const toggleArrow = (): void => {
    if (itemsContainerRef.current === null) return
    const hasScrollbar =
      itemsContainerRef.current.clientWidth < itemsContainerRef.current.scrollWidth
    const scrolledFromLeft =
      itemsContainerRef.current.offsetWidth + itemsContainerRef.current.scrollLeft
    const scrolledToRight = scrolledFromLeft >= itemsContainerRef.current.scrollWidth
    const scrolledToLeft = itemsContainerRef.current.scrollLeft === 0

    setArrows({
      left: hasScrollbar && !scrolledToLeft,
      right: hasScrollbar && !scrolledToRight
    })
  }
  const debouncedToggleArrow = useDebouncedCallback(() => {
    toggleArrow()
  }, 150)

  useLayoutEffect(() => {
    toggleArrow()
  }, [])

  useEffect(() => {
    // Make sure element supports addEventListener
    // On
    const isSupported = window && window.addEventListener
    if (!isSupported) return
    // Set first arrows
    const refCurrent = itemsContainerRef.current
    // Add event listener
    const events = [
      // { event: 'resize', callback: debouncedToggleArrow },
      { event: 'scroll', callback: debouncedToggleArrow }
    ]
    if (refCurrent) {
      events.forEach(({ event, callback }) => {
        refCurrent.addEventListener(event, callback)
      })
    }
    // add event listener for body resize
    window.addEventListener('resize', debouncedToggleArrow)
    return () => {
      // Remove event listener on unmount
      if (refCurrent) {
        events.forEach(({ event, callback }) => {
          refCurrent.removeEventListener(event, callback)
        })
      }
      window.removeEventListener('resize', debouncedToggleArrow)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  /**
   * Increase/decrease the current page value
   * @param {String} direction (Optional) The direction to advance
   */
  const scrollItems = (direction: string): void => {
    if (itemsContainerRef.current === null) return
    const items = itemsContainerRef.current?.parentElement?.querySelector('.items')
    if (items === null || items === undefined) return

    const operator = direction === 'right' ? '+' : '-'
    const scrollLeft = eval(
      'items.scrollLeft' + operator + 'itemsContainerRef.current?.clientWidth'
    )
    items &&
      items.scroll({
        left: scrollLeft,
        behavior: 'smooth'
      })
  }

  const Button = ({ direction }: { direction: string }): JSX.Element => {
    const isVisible = direction === 'right' ? arrows.right : arrows.left
    return (
      <div
        className={classNames('navigation-wrapper', {
          left: direction === 'left',
          right: direction === 'right',
          hidden: !isVisible,
          visible: isVisible
        })}
      >
        <div className="navigation">
          <div
            className="button"
            {...{
              'aria-label': direction === 'right' ? 'Next Items' : 'Previous Items'
            }}
            role="button"
            {...(!isVisible && { 'aria-hidden': true, 'aria-disabled': true })}
            tabIndex={isVisible ? 0 : -1}
            onClick={() => scrollItems(direction)}
          >
            {direction === 'right' ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 19.5 8.25 12l7.5-7.5"
                />
              </svg>
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="">
      <div className="items-slider">
        <Button direction="left" />
        <div className="wrapper-items">
          <div
            ref={itemsContainerRef}
            aria-label="Items list"
            role="region"
            className="items carousel"
          >
            <div className="gap" />
            {items &&
              items.map((item) => {
                switch (type) {
                  case 'post':
                    return (
                      <Item
                        key={item.node.frontmatter.slug}
                        type="post"
                        node={item.node as PostNode}
                      />
                    )
                  case 'project':
                    return (
                      <Item
                        key={item.node.frontmatter.slug}
                        type="project"
                        node={item.node as ProjectNode}
                      />
                    )
                }
              })}
            <div className="gap" />
          </div>
        </div>
        <Button direction="right" />
      </div>
    </div>
  )
}

export default Items
