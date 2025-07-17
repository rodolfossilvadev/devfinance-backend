import app from "./app";
import { prismaConnect } from "./config/prisma";
import { initializeGlobalCategories } from "./services/globalCategories.service";
import initializeFirebaseAdmin from "./config/firebase";

initializeFirebaseAdmin();

const startServer = async () => {
  try {
    await prismaConnect();
    await initializeGlobalCategories();

    const PORT = process.env.PORT ? Number(process.env.PORT) : 3333;

    await app.listen({ port: PORT, host: "0.0.0.0" });
    console.log(`Servidor rodando na porta ${PORT}`);
  } catch (err) {
    console.error(err);
  }
};

startServer();
