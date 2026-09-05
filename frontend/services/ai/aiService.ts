/**
 * Provider-neutral AI facade. Replace the deterministic fallbacks with API calls
 * when the AI backend is available; screens do not need to change.
 */
export interface CatalogSuggestion {
  title: string;
  description: string;
  category: string;
  materials: string[];
  technique: string;
  tags: string[];
}

export interface PriceRecommendation {
  recommendedPrice: number;
  profitMargin: number;
  rationale: string;
}

class AIService {
  async generateCatalog(transcript: string): Promise<CatalogSuggestion> {
    await new Promise((resolve) => setTimeout(resolve, 900));
    const isPottery = /pot|clay|terracotta|मिट्टी/.test(transcript.toLowerCase());

    return isPottery
      ? {
          title: 'Hand-painted Terracotta Decorative Pot',
          description: transcript || 'A handcrafted terracotta piece, shaped and painted by hand using traditional techniques.',
          category: 'Pottery & Terracotta',
          materials: ['Natural Clay', 'Natural Pigments'],
          technique: 'Wheel Thrown & Hand Painted',
          tags: ['terracotta', 'handcrafted', 'home decor'],
        }
      : {
          title: 'Handcrafted Heritage Art Piece',
          description: transcript || 'A thoughtfully handcrafted piece made with time-honoured artisan techniques.',
          category: 'Woodwork & Carving',
          materials: ['Natural Material'],
          technique: 'Traditional Handmade',
          tags: ['handcrafted', 'indian craft', 'artisan made'],
        };
  }

  async recommendPrice(costs: { rawMaterialCost: number; laborCost: number; packagingCost: number }): Promise<PriceRecommendation> {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const totalCost = costs.rawMaterialCost + costs.laborCost + costs.packagingCost;
    const recommendedPrice = Math.max(499, Math.ceil((totalCost * 1.45) / 50) * 50);
    return {
      recommendedPrice,
      profitMargin: Math.round(((recommendedPrice - totalCost) / recommendedPrice) * 100),
      rationale: 'Includes artisan labour, packaging, marketplace readiness and a sustainable margin.',
    };
  }
}

export const aiService = new AIService();
