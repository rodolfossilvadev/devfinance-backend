import admin from "firebase-admin";
import { env } from "./env";

const initializeFirebaseAdmin = (): void => {
  console.log("FIREBASE_CLIENT_EMAIL:", JSON.stringify(FIREBASE_CLIENT_EMAIL));
console.log("FIREBASE_PROJECT_ID:", JSON.stringify(FIREBASE_PROJECT_ID));
console.log("FIREBASE_PRIVATE_KEY LENGTH:", FIREBASE_PRIVATE_KEY?.length);

  if (admin.apps.length > 0) return;

  const {
    FIREBASE_CLIENT_EMAIL,
    FIREBASE_PRIVATE_KEY,
    FIREBASE_PROJECT_ID,
  } = env;

  if (!FIREBASE_CLIENT_EMAIL || !FIREBASE_PRIVATE_KEY || !FIREBASE_PROJECT_ID) {
    throw new Error("Falha ao iniciar Firebase - Faltando as credenciais");
  }

  try {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: FIREBASE_PROJECT_ID,
        clientEmail: FIREBASE_CLIENT_EMAIL,
        privateKey: FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"), 
      }),
    });
  } catch (err) {
    console.error("Falha ao conectar Firebase!", err);
    process.exit(1);
  }
};

export default initializeFirebaseAdmin;
