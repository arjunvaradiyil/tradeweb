import type { Access } from 'payload'

export const isLoggedIn: Access = ({ req }) => Boolean(req.user)

// Public sees published docs only; logged-in editors see drafts too.
export const publishedOrEditor: Access = ({ req }) => {
  if (req.user) return true
  return { _status: { equals: 'published' } }
}
