export type SchemaNode = Record<string, unknown> & { '@type': string }

export interface DocsNavItem {
  title?: string
  path?: string
  children?: DocsNavItem[]
}

export interface DocsPageData {
  title?: string
  description?: string
  path?: string
  body?: { children?: unknown[] }
}

export interface DocsSchemaInput {
  page?: DocsPageData | null
  navigation?: DocsNavItem[] | null
  path: string
  siteUrl: string
  description?: string
}

function isElement(node: unknown): node is [string, object, ...unknown[]] {
  return (
    Array.isArray(node)
    && node.length >= 2
    && typeof node[0] === 'string'
    && typeof node[1] === 'object'
    && node[1] !== null
    && !Array.isArray(node[1])
  )
}

export function nodeText(node: unknown): string {
  if (node == null) return ''
  if (typeof node === 'string' || typeof node === 'number') return String(node)
  if (Array.isArray(node)) {
    return isElement(node)
      ? node.slice(2).map(nodeText).join('')
      : node.map(nodeText).join('')
  }
  return ''
}

function elementTag(node: unknown): string {
  return isElement(node) ? node[0] : ''
}

function elementChildren(node: unknown): unknown[] {
  if (!isElement(node)) return []
  const children = node[2]
  return Array.isArray(children) ? children : children == null ? [] : [children]
}

function normalizePath(path: string): string {
  if (!path || path === '/') return '/'
  return `/${path.replace(/^\/+|\/+$/g, '')}`
}

export function absoluteUrl(siteUrl: string, path: string): string {
  const base = siteUrl.replace(/\/+$/, '')
  return normalizePath(path) === '/' ? `${base}/` : `${base}${normalizePath(path)}`
}

export function findNavigationTrail(
  navigation: DocsNavItem[],
  path: string
): DocsNavItem[] {
  const target = normalizePath(path)
  for (const item of navigation || []) {
    if (item.path && normalizePath(item.path) === target) return [item]
    if (item.children?.length) {
      const trail = findNavigationTrail(item.children, target)
      if (trail.length) return [item, ...trail]
    }
  }
  return []
}

export function buildBreadcrumbNodes(
  navigation: DocsNavItem[],
  path: string,
  siteUrl: string
): SchemaNode[] {
  const trail = findNavigationTrail(navigation || [], path)
  const entries = [
    { name: 'Home', path: '/' },
    ...trail.map(item => ({ name: item.title || 'Untitled', path: item.path || '/' }))
  ]
  return [
    {
      '@type': 'BreadcrumbList',
      '@id': `${absoluteUrl(siteUrl, path)}#breadcrumb`,
      'itemListElement': entries.map((entry, index) => ({
        '@type': 'ListItem',
        'position': index + 1,
        'name': entry.name,
        'item': absoluteUrl(siteUrl, entry.path)
      }))
    }
  ]
}

export function extractFaqNodes(
  body: DocsPageData['body'],
  pageUrl: string
): SchemaNode[] {
  const children = Array.isArray(body?.children) ? body.children : []
  const questions: Array<{ name: string, text: string }> = []
  let current: { name: string, parts: string[] } | null = null

  const commit = () => {
    if (!current) return
    const text = current.parts.join(' ').replace(/\s+/g, ' ').trim().slice(0, 600)
    if (text) questions.push({ name: current.name, text })
    current = null
  }

  for (const node of children) {
    if (/^h[1-6]$/.test(elementTag(node))) {
      commit()
      const heading = nodeText(node).trim()
      current = heading.endsWith('?') ? { name: heading, parts: [] } : null
      continue
    }
    if (current) current.parts.push(nodeText(node))
  }
  commit()

  if (!questions.length) return []
  return [
    {
      '@type': 'FAQPage',
      '@id': `${pageUrl}#faq`,
      'mainEntity': questions.map(question => ({
        '@type': 'Question',
        'name': question.name,
        'acceptedAnswer': { '@type': 'Answer', 'text': question.text }
      }))
    }
  ]
}

export function extractHowToNodes(
  body: DocsPageData['body'],
  page: DocsPageData,
  pageUrl: string
): SchemaNode[] {
  const children = Array.isArray(body?.children) ? body.children : []
  const headings = children
    .filter(node => /^h[1-6]$/.test(elementTag(node)))
    .map(nodeText)
  const context = [page.title, page.path, ...headings].filter(Boolean).join(' ')
  if (!/(install|quick start|first steps|walkthrough|step\b|how to|clone|local development)/i.test(context)) {
    return []
  }

  let steps: string[] = []
  for (const node of children) {
    if (elementTag(node) !== 'ol') continue
    const items = elementChildren(node)
      .filter(child => elementTag(child) === 'li')
      .map(nodeText)
      .map(text => text.replace(/\s+/g, ' ').trim().slice(0, 300))
      .filter(Boolean)
    if (items.length > steps.length) steps = items
  }
  if (steps.length < 2) return []

  return [
    {
      '@type': 'HowTo',
      '@id': `${pageUrl}#howto`,
      'name': page.title || 'Steps',
      'description': page.description || '',
      'step': steps.map((text, index) => ({
        '@type': 'HowToStep',
        'position': index + 1,
        'name': `Step ${index + 1}`,
        text
      }))
    }
  ]
}

export function buildArticleNode(
  page: DocsPageData,
  pageUrl: string,
  siteUrl: string,
  description: string
): SchemaNode {
  return {
    '@type': 'Article',
    '@id': `${pageUrl}#article`,
    'headline': page.title || 'Documentation',
    description,
    'url': pageUrl,
    'inLanguage': 'en',
    'mainEntityOfPage': { '@id': `${pageUrl}#webpage` },
    'isPartOf': { '@id': `${siteUrl}/#website` },
    'author': { '@id': `${siteUrl}/#organization` },
    'publisher': { '@id': `${siteUrl}/#organization` }
  }
}

export function buildDocsSchemaGraph(input: DocsSchemaInput): SchemaNode[] {
  const siteUrl = input.siteUrl
  const page = input.page || {}
  const pageUrl = absoluteUrl(siteUrl, input.path)
  const description = input.description ?? page.description ?? ''
  const organization: SchemaNode = {
    '@type': 'Organization',
    '@id': `${siteUrl}/#organization`,
    'name': 'Gem Team',
    'url': `${siteUrl}/`
  }

  return [
    organization,
    buildArticleNode(page, pageUrl, siteUrl, description),
    ...buildBreadcrumbNodes(input.navigation || [], input.path, siteUrl),
    ...extractFaqNodes(page.body, pageUrl),
    ...extractHowToNodes(page.body, page, pageUrl)
  ]
}
