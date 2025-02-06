interface TableItem {
  url: string
  title: string
  items?: TableItem[]
}

const cleanTitle = (text: string) => {
  return text
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/__(.*?)__/g, '$1')
    .replace(/`(.*?)`/g, '$1')
    .replace(/:\w+:/g, '')
    .trim()
}

const generateTableOfContents = (mdxBody: string): TableItem[] => {
  if (!mdxBody) return []

  const headingRegex = /^(#{1,3})\s(.+)$/gm
  const matches = [...mdxBody.matchAll(headingRegex)]

  const toc: TableItem[] = []
  let currentH1: TableItem | null = null
  let currentH2: TableItem | null = null

  matches.forEach((match) => {
    const level = match[1].length
    const title = cleanTitle(match[2])
    const id = title.toLowerCase().replace(/\s+/g, '-')
    const item: TableItem = { url: `#${id}`, title }

    switch (level) {
      case 1:
        currentH1 = item
        currentH2 = null
        toc.push(item)
        break
      case 2:
        if (currentH1) {
          if (!currentH1.items) currentH1.items = []
          currentH2 = item
          currentH1.items.push(item)
        } else {
          currentH2 = item
          toc.push(item)
        }
        break
      case 3:
        if (currentH2) {
          if (!currentH2.items) currentH2.items = []
          currentH2.items.push(item)
        } else if (currentH1) {
          if (!currentH1.items) currentH1.items = []
          currentH1.items.push(item)
        } else {
          toc.push(item)
        }
        break
    }
  })

  return toc
}

export default generateTableOfContents
