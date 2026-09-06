/**
 * ShilpSetu API Client Abstraction
 * Centralizes request handling, headers, error normalization, and environment configuration.
 */








const BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'https://api.shilpsetu.org/v1';

export async function apiRequest(
endpoint,
options = {})
{
  try {
    const defaultHeaders = {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    };

    const config = {
      ...options,
      headers: {
        ...defaultHeaders,
        ...options.headers
      }
    };

    const response = await fetch(`${BASE_URL}${endpoint}`, config);
    const data = await response.json().catch(() => null);

    if (!response.ok) {
      return {
        success: false,
        error: data?.message || `Server returned error status ${response.status}`,
        statusCode: response.status
      };
    }

    return {
      success: true,
      data,
      statusCode: response.status
    };
  } catch (err) {
    return {
      success: false,
      error: err.message || 'Network communication failure. Please check your internet connection.',
      statusCode: 0
    };
  }
}