import admin from "firebase-admin";
import { env } from "./env";

const initializeFirebaseAdmin = (): void => {
  if (admin.apps.length > 0) return;

  const {
    FIREBASE_CLIENT_EMAIL,
    FIREBASE_PRIVATE_KEY,
    FIREBASE_PROJECT_ID,
  } = env;

  // Logs após carregar as envs
  console.log("FIREBASE_CLIENT_EMAIL:", FIREBASE_CLIENT_EMAIL ? "***OK***" : "***MISSING***");
  console.log("FIREBASE_PROJECT_ID:", FIREBASE_PROJECT_ID ? "***OK***" : "***MISSING***");
  console.log("FIREBASE_PRIVATE_KEY LENGTH:", FIREBASE_PRIVATE_KEY?.length || 0);

  if (!FIREBASE_CLIENT_EMAIL || !FIREBASE_PRIVATE_KEY || !FIREBASE_PROJECT_ID) {
    throw new Error("Falha ao iniciar Firebase - Faltando credenciais");
  }

  try {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: FIREBASE_PROJECT_ID,
        clientEmail: FIREBASE_CLIENT_EMAIL,
        privateKey: FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
      }),
    });
    console.log("Firebase inicializado com sucesso 🚀");
  } catch (err) {
    console.error("Falha ao conectar Firebase!", err);
    process.exit(1);
  }
};

export default initializeFirebaseAdmin;
