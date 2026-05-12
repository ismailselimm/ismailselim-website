export type Project = {
  id: string
  index: string
  title: string
  tagline: string
  year: string
  role: string
  stack: string[]
  status: 'live' | 'paused' | 'inDev' | 'private'
  description: string
  highlights?: string[]
  cover: string
  coverAspect?: 'square' | 'portrait' | 'landscape'
  gallery?: string[]
  link: { label: string; href: string }
}

export type Experience = {
  company: string
  title: string
  dateRange: string
  current?: boolean
  bullets: string[]
}

export type Skill = {
  name: string
  level: number
  category: 'core' | 'web' | 'data' | 'tools'
}
