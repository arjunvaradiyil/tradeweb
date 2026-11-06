// TEMPORARY diagnostic: reports whether Payload can start and, if not, a sanitized error. Remove after the deploy works.
import { getPayloadClient } from '@/lib/payload'

export const dynamic = 'force-dynamic'

const clean = (s: string) => s.replace(/mongodb(\+srv)?:\/\/[^\s'"]+/gi, '[mongodb-uri]').replace(/:\/\/[^@\s/]+@/g, '://[credentials]@').slice(0, 500)

export async function GET() {
  const env = { DATABASE_URL: Boolean(process.env.DATABASE_URL), DATABASE_URL_scheme: (process.env.DATABASE_URL ?? '').split(':')[0], PAYLOAD_SECRET: Boolean(process.env.PAYLOAD_SECRET) }
  try {
    const payload = await getPayloadClient()
    await payload.find({ collection: 'users', limit: 1, depth: 0 })
    return Response.json({ ok: true, env })
  } catch (e) {
    const err = e as { name?: string; code?: string; message?: string; cause?: { message?: string; name?: string } }
    return Response.json({ ok: false, env, name: err.name, code: err.code, message: clean(err.message ?? ''), cause: err.cause ? { name: err.cause.name, message: clean(err.cause.message ?? '') } : undefined }, { status: 500 })
  }
}
