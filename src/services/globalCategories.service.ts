import { type Category, TransectionType } from "@prisma/client";
import prisma from "../config/prisma";

type GlobalCategoryInput = Pick <Category, "name"| "color"| "type" >

const globalCategories: GlobalCategoryInput[] = [
  // Despesas
  { name: "Alimentação", color: "#FF5733", type: TransectionType.expense },
  { name: "Transporte", color: "#33A8FF", type: TransectionType.expense },
  { name: "Moradia", color: "#33FF97", type: TransectionType.expense },
  { name: "Saúde", color: "#F033FF", type: TransectionType.expense },
  { name: "Educação", color: "#FF3366", type: TransectionType.expense },
  { name: "Lazer", color: "#FFBA33", type: TransectionType.expense },
  { name: "Compras", color: "#33FFF6", type: TransectionType.expense },
  { name: "Outros", color: "#B033FF", type: TransectionType.expense },

  // Receitas
  { name: "Salário", color: "#33FF97", type: TransectionType.income },
  { name: "Freelance", color: "#33A8FF", type: TransectionType.income },
  { name: "Investimentos", color: "#FFBA33", type: TransectionType.income },
  { name: "Outros", color: "#B033FF", type: TransectionType.income },
];


export const initializeGlobalCategories = async(): Promise<Category[]> => {      
  const createdCategories:Category[] = [];

  for(const category of globalCategories){
    try{
      const existing = await prisma.category.findFirst({
        where: {
          name: category.name,
          type: category.type
        }
      })
       if(!existing){
        const newCategoy = await prisma.category.create({data: category });
        console.log(`Criada: ${newCategoy.name}`);
        createdCategories.push(newCategoy);

      }else{
       createdCategories.push(existing);

      }
    }catch(err){
      console.error("Erro ao criar categoria!")
    }

  }
        console.log("Todas as categorias inicializadas!")



  return createdCategories
}