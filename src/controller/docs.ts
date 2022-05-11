import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify'

import Markdoc from '@markdoc/markdoc'

const source = `# Headers`
const ast = Markdoc.parse(source)
const content = Markdoc.transform(ast)
const htmlRender = `
  <!DOCTYPE html>
    <html>
      <body>
        ${Markdoc.renderers.html(content)}
      </body>
    </html>
`

interface DocsRequest extends FastifyRequest {
  Params: { docs: string }
}

export async function docs(fastify: FastifyInstance) {
  // GET /
  fastify.get<DocsRequest>('/docs', async function (request, reply: FastifyReply) {
    reply.header('Content-Type', 'text/html')
    reply.status(200).send(htmlRender)
  })
}
