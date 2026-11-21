import { test } from 'node:test'
import assert from 'node:assert/strict'
import {
  nodeText,
  findNavigationTrail,
  buildBreadcrumbNodes,
  extractFaqNodes,
  extractHowToNodes,
  buildArticleNode,
  buildDocsSchemaGraph,
  type DocsNavItem
} from './docsSchema.ts'

const SITE = 'https://mubaidr.github.io/gem-team'
const PATH = '/getting-started/installation'
const PAGE_URL = `${SITE}${PATH}`

const nav: DocsNavItem[] = [
  {
    title: 'Getting Started',
    path: '/getting-started',
    children: [
      { title: 'Concepts', path: '/getting-started/concepts' },
      { title: 'Installation', path: PATH }
    ]
  },
  { title: 'Agents', path: '/agents', children: [{ title: 'Reviewer', path: '/agents/reviewer' }] }
]

test('nodeText flattens minimark headings and paragraphs including nested inline nodes', () => {
  const heading: unknown = ['h2', { id: 'what' }, ['What is ', ['strong', {}, ['Gem Team']], '?']]
  assert.equal(nodeText(heading), 'What is Gem Team?')
  assert.equal(nodeText(['p', {}, 'Plain text.']), 'Plain text.')
  assert.equal(nodeText(null), '')
})

test('findNavigationTrail returns the section-to-page chain for a nested route', () => {
  const trail = findNavigationTrail(nav, PATH)
  assert.deepEqual(
    trail.map(item => item.title),
    ['Getting Started', 'Installation']
  )
  assert.deepEqual(findNavigationTrail(nav, '/unknown'), [])
})

test('buildBreadcrumbNodes emits Home -> section -> page with correct positions and absolute URLs', () => {
  const nodes = buildBreadcrumbNodes(nav, PATH, SITE)
  assert.equal(nodes.length, 1)
  const node = nodes[0]
  assert.equal(node['@type'], 'BreadcrumbList')
  assert.equal(node['@id'], `${PAGE_URL}#breadcrumb`)
  assert.deepEqual(node.itemListElement, [
    { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': `${SITE}/` },
    { '@type': 'ListItem', 'position': 2, 'name': 'Getting Started', 'item': `${SITE}/getting-started` },
    { '@type': 'ListItem', 'position': 3, 'name': 'Installation', 'item': PAGE_URL }
  ])
})

test('buildBreadcrumbNodes handles home and unknown paths without throwing', () => {
  assert.deepEqual(buildBreadcrumbNodes(nav, '/', SITE)[0].itemListElement, [
    { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': `${SITE}/` }
  ])
  const unknown = buildBreadcrumbNodes(nav, '/missing', SITE)[0].itemListElement as unknown[]
  assert.deepEqual(unknown, [{ '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': `${SITE}/` }])
})

test('extractFaqNodes turns question headings into FAQPage questions with answers', () => {
  const body = {
    children: [
      ['h2', { id: 'what' }, ['What Just Happened?']],
      ['p', {}, ['Gem Team ran the plan.']],
      ['h2', { id: 'why' }, ['Why Two Tiers?']],
      ['p', {}, ['Premium models plan, cheap models execute.']],
      ['h2', { id: 'next' }, ['Next Steps']],
      ['p', {}, ['Read the guide.']]
    ]
  } as unknown as { children?: unknown[] }
  const nodes = extractFaqNodes(body, PAGE_URL)
  assert.equal(nodes.length, 1)
  assert.equal(nodes[0]['@type'], 'FAQPage')
  assert.equal(nodes[0]['@id'], `${PAGE_URL}#faq`)
  const main = nodes[0].mainEntity as Array<Record<string, unknown>>
  assert.equal(main.length, 2)
  assert.equal(main[0].name, 'What Just Happened?')
  assert.deepEqual(main[0].acceptedAnswer, {
    '@type': 'Answer',
    'text': 'Gem Team ran the plan.'
  })
  assert.equal(main[1].name, 'Why Two Tiers?')
})

test('extractFaqNodes ignores prose headings that are not questions', () => {
  const body = { children: [['h2', {}, ['Purpose']], ['p', {}, ['Text.']]] } as unknown as {
    children?: unknown[]
  }
  assert.deepEqual(extractFaqNodes(body, PAGE_URL), [])
})

test('extractHowToNodes builds HowTo steps from an ordered list on an instruction page', () => {
  const body = {
    children: [
      ['h2', { id: 'steps' }, ['Step 1: Install Gem Team']],
      ['ol', {}, [['li', {}, ['Install APM.']], ['li', {}, ['Run apm install.']], ['li', {}, ['Verify.']]]]
    ]
  } as unknown as { children?: unknown[] }
  const nodes = extractHowToNodes(body, { title: 'Installation', path: PATH }, PAGE_URL)
  assert.equal(nodes.length, 1)
  assert.equal(nodes[0]['@type'], 'HowTo')
  assert.equal(nodes[0]['@id'], `${PAGE_URL}#howto`)
  const steps = nodes[0].step as Array<Record<string, unknown>>
  assert.equal(steps.length, 3)
  assert.deepEqual(steps[0], { '@type': 'HowToStep', 'position': 1, 'name': 'Step 1', 'text': 'Install APM.' })
})

test('extractHowToNodes skips non-instruction pages and too-short lists', () => {
  const body = { children: [['ol', {}, [['li', {}, ['One.']]]]] } as unknown as { children?: unknown[] }
  assert.deepEqual(extractHowToNodes(body, { title: 'Overview', path: '/guide/features' }, PAGE_URL), [])
  assert.deepEqual(extractHowToNodes(undefined, { title: 'Installation' }, PAGE_URL), [])
})

test('buildArticleNode links the article to the WebPage, site and organization', () => {
  const node = buildArticleNode(
    { title: 'Installation' },
    PAGE_URL,
    SITE,
    'Install Gem Team via APM.'
  )
  assert.equal(node['@type'], 'Article')
  assert.equal(node['@id'], `${PAGE_URL}#article`)
  assert.equal(node.headline, 'Installation')
  assert.equal(node.description, 'Install Gem Team via APM.')
  assert.deepEqual(node.mainEntityOfPage, { '@id': `${PAGE_URL}#webpage` })
  assert.deepEqual(node.isPartOf, { '@id': `${SITE}/#website` })
  assert.deepEqual(node.author, { '@id': `${SITE}/#organization` })
})

test('buildDocsSchemaGraph combines all node types and survives missing page/nav data (consumer seam)', () => {
  const graph = buildDocsSchemaGraph({
    page: { title: 'Installation', description: 'Install Gem Team.', path: PATH },
    navigation: nav,
    path: PATH,
    siteUrl: SITE
  })
  const serialized = JSON.stringify(graph)
  const parsed = JSON.parse(serialized) as Array<Record<string, unknown>>
  assert.ok(parsed.length >= 3)
  for (const node of parsed) {
    assert.ok(typeof node['@type'] === 'string', 'every node must declare @type')
    assert.ok(typeof node['@id'] === 'string', 'every node must declare @id')
  }
  const types = parsed.map(node => node['@type'])
  assert.ok(types.includes('Article'))
  assert.ok(types.includes('BreadcrumbList'))
  assert.ok(types.includes('Organization'))

  const degraded = buildDocsSchemaGraph({
    page: {},
    navigation: undefined,
    path: '/missing',
    siteUrl: SITE
  })
  assert.ok(degraded.length >= 2)
  assert.ok(degraded.every(node => typeof node['@type'] === 'string'))
})
