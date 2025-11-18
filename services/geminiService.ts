
import { GoogleGenAI, GenerateContentResponse, Type } from "@google/genai";

// Assume API_KEY is set in the environment
// In a real application, you would not hardcode this.
const API_KEY = process.env.API_KEY;

if (!API_KEY) {
    console.warn("API_KEY environment variable not set. Using a mock service.");
}

const ai = API_KEY ? new GoogleGenAI({ apiKey: API_KEY }) : null;

export const getHSCodeSuggestions = async (productDescription: string): Promise<string> => {
    if (!ai) {
        const mockData = [
            { code: "0901.21.00", description: "Coffee, roasted, not decaffeinated.", dutyUSA: '0%', dutyEU: '0%', restrictions: 'FDA clearance needed for USA' },
            { code: "0901.11.90", description: "Coffee, not roasted, not decaffeinated, other.", dutyUSA: '0%', dutyEU: '0%', restrictions: 'None' },
            { code: "2101.11.00", description: "Extracts, essences and concentrates of coffee.", dutyUSA: '2.5%', dutyEU: '9%', restrictions: 'None' },
        ];
        return new Promise(resolve => setTimeout(() => resolve(JSON.stringify(mockData)), 1000));
    }

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: `Based on the product description "${productDescription}", provide a list of up to 3 likely HS codes. For each code, provide a brief description, a sample import duty percentage for the USA and EU, and any known restrictions (like 'FDA clearance needed'). If no restrictions, say 'None'.`,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.ARRAY,
                    items: {
                        type: Type.OBJECT,
                        properties: {
                            code: { type: Type.STRING, description: "The 8-digit HS code." },
                            description: { type: Type.STRING, description: "A brief description of the HS code." },
                            dutyUSA: { type: Type.STRING, description: "Example import duty for the USA (e.g., '0%')." },
                            dutyEU: { type: Type.STRING, description: "Example import duty for the EU (e.g., '9%')." },
                            restrictions: { type: Type.STRING, description: "Known restrictions or requirements (e.g., 'FDA clearance needed for USA')." }
                        },
                        required: ['code', 'description', 'dutyUSA', 'dutyEU', 'restrictions']
                    }
                }
            }
        });
        return response.text;
    } catch (error) {
        console.error("Error fetching HS code suggestions:", error);
        return JSON.stringify([]);
    }
};

export const getAIPriceInsights = async (product: string, targetMarket: string): Promise<string> => {
    if (!ai) {
        const mockInsights = {
            opportunity: "Prices in the EU market are trending upwards. Consider a 5% price increase for German importers next quarter.",
            warning: "Shipping costs to the UK have increased by 12% due to new port fees. Adjust your logistics budget accordingly.",
            suggestion: "Your current pricing is 3% below the market average in the USA. This provides a competitive edge but could be optimized for higher margins.",
            marketPriceData: [
                { month: 'Jan', 'Market Avg': 4000, 'Your Price': 3900 },
                { month: 'Feb', 'Market Avg': 4100, 'Your Price': 4000 },
                { month: 'Mar', 'Market Avg': 3900, 'Your Price': 3950 },
                { month: 'Apr', 'Market Avg': 4200, 'Your Price': 4100 },
                { month: 'May', 'Market Avg': 4300, 'Your Price': 4250 },
                { month: 'Jun', 'Market Avg': 4500, 'Your Price': 4400 },
              ]
        };
        return new Promise(resolve => setTimeout(() => resolve(JSON.stringify(mockInsights)), 1500));
    }

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: `Provide pricing insights for exporting "${product}" to "${targetMarket}". Give one opportunity, one warning, one suggestion, and also provide an array of mock market price data for the last 6 months (Jan to Jun) containing 'Market Avg' and 'Your Price' per ton in USD.`,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        opportunity: { type: Type.STRING, description: "A positive market opportunity or trend." },
                        warning: { type: Type.STRING, description: "A potential risk, cost increase, or negative trend." },
                        suggestion: { type: Type.STRING, description: "An actionable suggestion to optimize pricing or strategy." },
                        marketPriceData: {
                            type: Type.ARRAY,
                            description: "Mock market price data for 6 months.",
                            items: {
                                type: Type.OBJECT,
                                properties: {
                                    month: { type: Type.STRING },
                                    'Market Avg': { type: Type.NUMBER },
                                    'Your Price': { type: Type.NUMBER },
                                },
                                required: ['month', 'Market Avg', 'Your Price']
                            }
                        }
                    },
                    required: ['opportunity', 'warning', 'suggestion', 'marketPriceData']
                }
            }
        });
        return response.text;
    } catch (error) {
        console.error("Error fetching pricing insights:", error);
        throw new Error("Could not retrieve AI insights at this time.");
    }
};

export const chatWithAIAssistant = async (prompt: string): Promise<string> => {
    if (!ai) {
        const mockResponse = "I am currently in mock mode. To get help, please describe your issue. For example, 'How do I find an importer for textiles?'";
        return new Promise(resolve => setTimeout(() => resolve(mockResponse), 1500));
    }

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                systemInstruction: "You are Exporizz, a helpful AI assistant for exporters. Your goal is to provide clear, concise, and actionable advice to help users succeed in global trade. Format your answers with markdown where appropriate."
            }
        });
        return response.text;
    } catch (error) {
        console.error("Error chatting with AI assistant:", error);
        return "Sorry, I am having trouble connecting right now.";
    }
};

export const getDashboardData = async (product: string): Promise<string> => {
    if (!ai) {
        const mockData = {
            hsCode: "0901.11.90",
            overallRisk: { score: 68, level: "Moderate" },
            documentStatus: 95,
            topCountries: [
                { name: 'USA', value: 400 }, { name: 'Germany', value: 300 }, { name: 'UAE', value: 200 }, { name: 'UK', value: 278 }, { name: 'China', value: 189 },
            ],
            riskDistribution: [
                { name: 'Political', value: 20 }, { name: 'Economic', value: 30 }, { name: 'Logistical', value: 40 }, { name: 'Compliance', value: 10 },
            ],
            importers: [
                 { id: 1, name: 'Global Imports Inc.', country: 'USA', product: product },
                 { id: 2, name: 'EuroTrade GmbH', country: 'Germany', product: product },
                 { id: 3, name: 'Emirates Traders', country: 'UAE', product: product },
            ]
        };
        return new Promise(resolve => setTimeout(() => resolve(JSON.stringify(mockData)), 2000));
    }

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: `Generate a full dashboard data set for exporting "${product}". Provide a single JSON object with the following keys: hsCode (string), overallRisk (object with score: number, level: 'Low'|'Moderate'|'High'), documentStatus (number, 0-100), topCountries (array of 5 objects with name: string, value: number), riskDistribution (array of 4 objects for 'Political', 'Economic', 'Logistical', 'Compliance' with name and value), and importers (array of 3 objects with id, name, country, and product which should be the input product).`,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        hsCode: { type: Type.STRING },
                        overallRisk: {
                            type: Type.OBJECT,
                            properties: {
                                score: { type: Type.NUMBER },
                                level: { type: Type.STRING, enum: ['Low', 'Moderate', 'High'] }
                            },
                             required: ['score', 'level']
                        },
                        documentStatus: { type: Type.NUMBER },
                        topCountries: {
                            type: Type.ARRAY,
                            items: {
                                type: Type.OBJECT,
                                properties: { name: { type: Type.STRING }, value: { type: Type.NUMBER } },
                                required: ['name', 'value']
                            }
                        },
                        riskDistribution: {
                            type: Type.ARRAY,
                            items: {
                                type: Type.OBJECT,
                                properties: { name: { type: Type.STRING }, value: { type: Type.NUMBER } },
                                required: ['name', 'value']
                            }
                        },
                        importers: {
                            type: Type.ARRAY,
                            items: {
                                type: Type.OBJECT,
                                properties: {
                                    id: { type: Type.NUMBER },
                                    name: { type: Type.STRING },
                                    country: { type: Type.STRING },
                                    product: { type: Type.STRING }
                                },
                                required: ['id', 'name', 'country', 'product']
                            }
                        }
                    },
                    required: ['hsCode', 'overallRisk', 'documentStatus', 'topCountries', 'riskDistribution', 'importers']
                }
            }
        });
        return response.text;
    } catch (error) {
        console.error("Error fetching dashboard data:", error);
        throw new Error("Could not retrieve Dashboard data at this time.");
    }
};

export const getImporterDetails = async (name: string, country: string, product: string): Promise<string> => {
    if (!ai) {
        const mockDetails = {
            name, country,
            bio: "A leading importer of fine goods, specializing in sourcing high-quality products for the North American market for over 20 years.",
            keyContact: "Jane Doe",
            email: `procurement@${name.toLowerCase().replace(/\s/g, '')}.com`,
            estimatedImportVolume: "Approx. 50-60 containers/year"
        };
        return new Promise(resolve => setTimeout(() => resolve(JSON.stringify(mockDetails)), 1000));
    }
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: `Generate a fictional but realistic, detailed profile for an importer named "${name}" in "${country}" who is interested in "${product}". Provide a JSON object with keys: name, country, bio, keyContact, email, and estimatedImportVolume.`,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        name: { type: Type.STRING },
                        country: { type: Type.STRING },
                        bio: { type: Type.STRING },
                        keyContact: { type: Type.STRING },
                        email: { type: Type.STRING },
                        estimatedImportVolume: { type: Type.STRING }
                    },
                    required: ["name", "country", "bio", "keyContact", "email", "estimatedImportVolume"]
                }
            }
        });
        return response.text;
    } catch (error) {
        console.error("Error fetching importer details:", error);
        throw new Error("Could not retrieve importer details.");
    }
};

export const getLogisticsCost = async (product: string, from: string, to: string, weightKg: number): Promise<string> => {
     if (!ai) {
        const mockCost = { low: 1250, high: 1500, currency: "USD" };
        return new Promise(resolve => setTimeout(() => resolve(JSON.stringify(mockCost)), 1200));
    }
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: `Estimate the logistics cost to ship ${weightKg}kg of "${product}" from "${from}" to "${to}". Provide a JSON object with a low and high estimate, and the currency (e.g., "USD").`,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        low: { type: Type.NUMBER },
                        high: { type: Type.NUMBER },
                        currency: { type: Type.STRING }
                    },
                    required: ["low", "high", "currency"]
                }
            }
        });
        return response.text;
    } catch (error) {
        console.error("Error fetching logistics cost:", error);
        throw new Error("Could not estimate logistics cost.");
    }
};


export const getProfitMarginAnalysis = async (product: string, margin: number, market: string): Promise<string> => {
    if (!ai) {
        return new Promise(resolve => setTimeout(() => resolve(`A ${margin.toFixed(1)}% margin is considered healthy for this market.`), 800));
    }
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: `Analyze a profit margin of ${margin.toFixed(1)}% for exporting "${product}" to the "${market}" market. Provide a brief, one-sentence analysis. For example: 'This is a strong margin, well above the industry average.' or 'This margin is tight and may be risky given market volatility.'`
        });
        return response.text;
    } catch (error) {
        console.error("Error analyzing profit margin:", error);
        return "Could not analyze margin at this time.";
    }
};

export const analyzePackagingImage = async (base64Image: string, mimeType: string): Promise<string> => {
    if (!ai) {
        const mockAnalysis = [
            { finding: "Low Contrast Labeling", recommendation: "The font color on the main label has low contrast against the background, potentially making it hard to read under warehouse lighting. Increase contrast to meet compliance standards." },
            { finding: "Barcode Placement", recommendation: "The barcode is placed near a package seam. This could cause scanning errors. Move the barcode to a flat, central surface at least 2 inches from any edge." }
        ];
        return new Promise(resolve => setTimeout(() => resolve(JSON.stringify(mockAnalysis)), 2000));
    }

    const imagePart = {
      inlineData: {
        mimeType: mimeType,
        data: base64Image,
      },
    };
    const textPart = {
      text: "Analyze this product packaging image from an export compliance and logistics perspective. Identify up to 3 potential issues related to labeling, barcode placement, color contrast, or potential shipping damage. For each issue, provide a 'finding' and a 'recommendation'."
    };

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: { parts: [imagePart, textPart] },
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.ARRAY,
                    items: {
                        type: Type.OBJECT,
                        properties: {
                            finding: { type: Type.STRING, description: "A brief description of the potential issue found." },
                            recommendation: { type: Type.STRING, description: "An actionable recommendation to fix the issue." },
                        },
                        required: ['finding', 'recommendation']
                    }
                }
            }
        });
        return response.text.trim();
    } catch (error) {
        console.error("Error analyzing packaging image:", error);
        throw new Error("Could not analyze the image.");
    }
};
