import { RichText as Lexical } from '@payloadcms/richtext-lexical/react'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'

export function RichText({ data, className }: { data?: unknown; className?: string }) {
  if (!data) return null
  return <Lexical data={data as SerializedEditorState} className={`prose-rt ${className ?? ''}`} />
}
