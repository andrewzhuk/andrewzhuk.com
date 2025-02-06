import React, { useEffect, useState } from 'react'

interface TableItem {
  url: string
  title: string
  items?: TableItem[]
}

interface TableOfContentsProps {
  items: TableItem[]
}

const TableOfContents = ({ items }: TableOfContentsProps) => {
  const [activeId, setActiveId] = useState<string>('')

  useEffect(() => {
    const handleScroll = () => {
      // Find all the headings
      const headings = Array.from(document.querySelectorAll('h1[id], h2[id], h3[id]'))

      for (const heading of headings) {
        const rect = heading.getBoundingClientRect()

        // If the heading is in the top third of the screen
        if (rect.top >= 0 && rect.top <= window.innerHeight / 3) {
          setActiveId(heading.id)
          break
        }
      }
    }

    const headings = document.querySelectorAll('h1[id], h2[id], h3[id]')
    if (headings.length > 0) {
      setActiveId(headings[0].id)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    const element = document.getElementById(id)
    if (element) {
      const headerOffset = 100
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'auto'
      })

      setActiveId(id)
    }
  }

  const renderItems = (items: TableItem[], level = 0) => {
    return (
      <ul className="toc-list">
        {items.map((item) => {
          const id = item.url.slice(1)
          const isActive = id === activeId

          return (
            <li key={item.url} className="toc-item">
              <a
                href={item.url}
                onClick={(e) => handleClick(e, id)}
                className={`toc-link level-${level} ${isActive ? 'active' : ''}`}
              >
                <div className="toc-indicator" />
                <span>{item.title}</span>
              </a>
              {item.items && item.items.length > 0 && (
                <div>{renderItems(item.items, level + 1)}</div>
              )}
            </li>
          )
        })}
      </ul>
    )
  }

  return (
    <nav className="toc-nav">
      <div className="toc-track" />
      {renderItems(items)}
    </nav>
  )
}

export default TableOfContents
