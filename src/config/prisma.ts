import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const prismaConnect = async() => {

    try{
        await prisma.$connect();
        console.log("DB conectado com sucesso!")
    }
    catch(err){
        console.error("Falha ao conectar com o DB!")

    }
}

export default prisma