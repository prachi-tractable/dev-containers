import { createServer } from './server'

const server = createServer()

server.listen(parseInt(process.env.PORT), () => {
    console.log(`Server listening at http://localhost:${process.env.PORT}`)
})
