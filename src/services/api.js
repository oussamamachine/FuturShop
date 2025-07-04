/**
 * apiService - Centralized API client for Futur app.
 * Handles products, orders, uploads, and custom designs.
 * @module services/api
 */
import { handleApiError } from '../utils/errorHandler';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3001';

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
  }

  /**
   * Generic request method for all API calls.
   * Handles JSON and FormData bodies.
   */
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    let config = { ...options };
    if (!(options.body instanceof FormData)) {
      config.headers = {
        'Content-Type': 'application/json',
        ...options.headers,
      };
    } else {
      config.headers = { ...options.headers };
    }
    try {
      const response = await fetch(url, config);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      // Try to parse JSON, fallback to text
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        return await response.json();
      }
      return await response.text();
    } catch (error) {
      throw handleApiError(error);
    }
  }

  // --- Product API ---
  async getProducts() {
    return this.request('/api/products');
  }
  async getProduct(id) {
    return this.request(`/api/products/${id}`);
  }

  // --- Order API ---
  async createOrder(orderData) {
    return this.request('/api/orders', {
      method: 'POST',
      body: JSON.stringify(orderData),
    });
  }
  async getOrder(id) {
    return this.request(`/api/orders/${id}`);
  }

  // --- Upload API ---
  async uploadImage(file) {
    const formData = new FormData();
    formData.append('image', file);
    return this.request('/api/upload', {
      method: 'POST',
      headers: {}, 
      body: formData,
    });
  }

  // --- Custom design API ---
  async saveCustomDesign(designData) {
    return this.request('/api/designs', {
      method: 'POST',
      body: JSON.stringify(designData),
    });
  }
  async getCustomDesign(id) {
    return this.request(`/api/designs/${id}`);
  }
}

const apiService = new ApiService();
export default apiService;
