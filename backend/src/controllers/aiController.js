const aiService = require('../services/aiService');
const { sendSuccess } = require('../utils/responseHandler');

/**
 * AI Controller – mock AI endpoints for MVP.
 */
const aiController = {
  /**
   * POST /api/ai/image-enhance
   */
  async imageEnhance(req, res, next) {
    try {
      const { imageUrl } = req.body;
      const result = await aiService.enhanceImage(imageUrl, req.user.id, req.body.productId);

      return sendSuccess(res, 'Image enhancement queued', result);
    } catch (err) {
      next(err);
    }
  },

  /**
   * POST /api/ai/speech-to-text
   */
  async speechToText(req, res, next) {
    try {
      const result = await aiService.speechToText(req.body, req.user.id, req.body.productId);

      return sendSuccess(res, 'Speech converted successfully', result);
    } catch (err) {
      next(err);
    }
  },

  /**
   * POST /api/ai/generate-description
   */
  async generateDescription(req, res, next) {
    try {
      const { language, category, keywords } = req.body;
      const result = await aiService.generateDescription(
        { language, category, keywords },
        req.user.id,
        req.body.productId
      );

      return sendSuccess(res, 'Description generated successfully', result);
    } catch (err) {
      next(err);
    }
  },

  /**
   * POST /api/ai/price-suggestion
   */
  async priceSuggestion(req, res, next) {
    try {
      const { category, description, materials } = req.body;
      const result = await aiService.suggestPrice(
        { category, description, materials },
        req.user.id,
        req.body.productId
      );

      return sendSuccess(res, 'Price suggestion generated successfully', result);
    } catch (err) {
      next(err);
    }
  },
};

module.exports = aiController;
