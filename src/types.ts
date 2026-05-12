export type Project = {
  id: string
  index: string
  title: string
  subtitle: string
  year: string
  role: string
  stack: string[]
  status: 'live' | 'paused' | 'inDev' | 'private'
  description: string
  cover: string
  gallery: string[]
  videos?: string[]
  link?: { label: string; href: string }
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
