import type { FastifyReply, FastifyRequest } from "fastify";
import admin from "firebase-admin";
import initializeFirebaseAdmin from "../config/firebase";

initializeFirebaseAdmin();

declare module "fastify" {
  interface FastifyRequest {
    userId?: string;
  }
}

export const authMiddleware = async (
  request: FastifyRequest,
  reply: FastifyReply
): Promise<void> => {
  const authHeader = request.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    reply.code(401).send({ error: "Token de autorização não fornecido!" });
    return;
  }

  const token = authHeader.replace("Bearer ", "");

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    request.userId = decodedToken.uid;
  } catch (err) {
    request.log.error("Erro ao verificar token!", err);
    reply.code(401).send({ error: "Token expirado ou inválido!" });
  }
  console.log("Headers recebidos:", request.headers.authorization);

};
