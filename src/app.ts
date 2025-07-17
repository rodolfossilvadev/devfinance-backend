import Fastify from "fastify";
import routes from "./routes";
import type { FastifyInstance } from "fastify";
import { env } from "./config/env";
import cors from '@fastify/cors'


const app: FastifyInstance = Fastify({
    logger:{
    level: env.NODE_ENV === "dev" ? "info" : "error", 
},
})
app.register(cors, {
  origin: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
});

app.register(routes,{prefix: '/api'})

export default app