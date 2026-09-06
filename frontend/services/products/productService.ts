import { Product, INITIAL_MOCK_PRODUCTS } from '@/constants/mockData';

class ProductService {
  private products: Product[] = [...INITIAL_MOCK_PRODUCTS];

  async getProducts(filterStatus?: string, searchQuery?: string): Promise<Product[]> {
    await new Promise((resolve) => setTimeout(resolve, 500));

    let result = [...this.products];

    if (filterStatus && filterStatus !== 'All') {
      result = result.filter((p) => p.status.toLowerCase() === filterStatus.toLowerCase());
    }

    if (searchQuery && searchQuery.trim().length > 0) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }

    return result;
  }

  async getProductById(id: string): Promise<Product | null> {
    await new Promise((resolve) => setTimeout(resolve, 300));
    const found = this.products.find((p) => p.id === id);
    return found || null;
  }

  async createProduct(productData: Partial<Product>): Promise<Product> {
    await new Promise((resolve) => setTimeout(resolve, 800));

    const newProduct: Product = {
      id: 'prod_' + Date.now(),
      title: productData.title || 'Untitled Artisan Craft',
      description: productData.description || '',
      category: productData.category || 'Woodwork & Carving',
      subcategory: productData.subcategory || 'Craft',
      materials: productData.materials || ['Natural Material'],
      technique: productData.technique || 'Handmade',
      dimensions: productData.dimensions || 'Standard',
      weight: productData.weight || '500g',
      location: productData.location || 'Jaipur, Rajasthan',
      tags: productData.tags || ['handcrafted'],
      language: productData.language || 'hi',
      images: productData.images || ['https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=800&auto=format&fit=crop&q=80'],
      rawMaterialCost: productData.rawMaterialCost || 300,
      laborCost: productData.laborCost || 700,
      packagingCost: productData.packagingCost || 100,
      suggestedPrice: productData.suggestedPrice || 1499,
      sellingPrice: productData.sellingPrice || 1350,
      inventory: productData.inventory || 10,
      status: productData.status || 'Draft',
      views: 0,
      inquiries: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    this.products.unshift(newProduct);
    return newProduct;
  }

  async updateProduct(id: string, updates: Partial<Product>): Promise<Product | null> {
    await new Promise((resolve) => setTimeout(resolve, 600));

    const index = this.products.findIndex((p) => p.id === id);
    if (index === -1) return null;

    this.products[index] = {
      ...this.products[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    };

    return this.products[index];
  }

  async deleteProduct(id: string): Promise<boolean> {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const initialLength = this.products.length;
    this.products = this.products.filter((p) => p.id !== id);
    return this.products.length < initialLength;
  }

  async togglePublishStatus(id: string): Promise<Product | null> {
    const product = await this.getProductById(id);
    if (!product) return null;

    const newStatus = product.status === 'Published' ? 'Draft' : 'Published';
    return this.updateProduct(id, { status: newStatus });
  }
}

export const productService = new ProductService();
