import { Injectable } from "@nestjs/common";
import { PlatesService } from "../../plates/service/plates.service";
import { GoogleGenerativeAI } from "@google/generative-ai";

@Injectable()
export class RecomendationsService {
    private genAI: GoogleGenerativeAI;
    private model: any;

    constructor(private readonly platesService: PlatesService) {

        this.genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');
        this.model = this.genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
    }

    async getRecommendation(meal: string) {

        const drinks = await this.platesService.findByCategoria('Bebida');

        if (!drinks || drinks.length === 0) {
            return { recommendation: "Desculpe, não temos bebidas disponíveis no momento." };
        }

        const drinksList = drinks.map(d => `${d.name} (R$ ${d.price})`).join(', ');

        const prompt = `
      Atue como um Sommelier de um restaurante chique.
      O cliente vai comer: "${meal}".
      
      Nossas opções de bebida disponíveis hoje são apenas estas: 
      [${drinksList}]
      
      Regras:
      1. Escolha a MELHOR opção da lista acima para harmonizar.
      2. Explique o motivo de forma curta e elegante (máximo 2 frases).
      3. Se nada combinar perfeitamente, sugira a opção mais neutra.
      4. NÃO invente bebidas que não estejam na lista.
    `;
        const result = await this.model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        return {
            client_meal: meal,
            recommendation: text
        };
    }
}