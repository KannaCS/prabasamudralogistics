import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// Utility function for combining CSS classes
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Email validation
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Phone validation
export function isValidPhone(phone: string): boolean {
  const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
  return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''));
}

// Input sanitization
export function sanitizeInput(input: string, maxLength: number = 1000): string {
  return input.trim().substring(0, maxLength);
}

// Generate booking number
export function generateBookingNumber(): string {
  const prefix = 'PSL';
  const timestamp = new Date().getTime().toString().slice(-6);
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  return `${prefix}${timestamp}${random}`;
}

// Calculate estimated delivery date
export function calculateEstimatedDelivery(shipmentDate: Date, serviceType: string): Date {
  const baseDate = new Date(shipmentDate);
  let daysToAdd = 7; // default

  switch (serviceType.toLowerCase()) {
    case 'domestic-shipping':
      daysToAdd = 3;
      break;
    case 'export-import':
      daysToAdd = 14;
      break;
    case 'freight-forwarding':
      daysToAdd = 10;
      break;
    case 'roro-shipping':
      daysToAdd = 5;
      break;
    case 'ship-rental':
      daysToAdd = 1;
      break;
    case 'truck-rental':
      daysToAdd = 1;
      break;
    case 'vehicle-shipping':
      daysToAdd = 7;
      break;
    default:
      daysToAdd = 7;
  }

  return new Date(baseDate.getTime() + daysToAdd * 24 * 60 * 60 * 1000);
}

// Calculate progress percentage
export function calculateProgress(status: string): number {
  switch (status.toLowerCase()) {
    case 'pending':
      return 10;
    case 'confirmed':
      return 25;
    case 'processing':
      return 50;
    case 'shipped':
      return 75;
    case 'completed':
      return 100;
    case 'cancelled':
      return 0;
    default:
      return 10;
  }
}

// Format date for display
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
}

// Format currency
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR'
  }).format(amount);
}

// Generate pagination info
export function generatePaginationInfo(page: number, limit: number, totalCount: number) {
  const totalPages = Math.ceil(totalCount / limit);
  return {
    currentPage: page,
    totalPages,
    totalCount,
    limit,
    hasNextPage: page < totalPages,
    hasPrevPage: page > 1
  };
}

// Validate pagination parameters
export function validatePaginationParams(page: number, limit: number): boolean {
  return page >= 1 && limit >= 1 && limit <= 100;
}

// Build search query for Prisma
export function buildSearchQuery(search: string, fields: string[]) {
  if (!search) return {};
  
  return {
    OR: fields.map(field => ({
      [field]: { contains: search, mode: 'insensitive' as const }
    }))
  };
}

// Error response helper
export function createErrorResponse(message: string, status: number = 500, details?: any) {
  return {
    error: message,
    details: process.env.NODE_ENV === 'development' ? details : undefined
  };
}

// Success response helper
export function createSuccessResponse(data: any, message?: string) {
  return {
    success: true,
    data,
    message
  };
}

// Rate limiting helper
export function isRateLimited(lastRequestTime: Date, cooldownMinutes: number = 5): boolean {
  const cooldownMs = cooldownMinutes * 60 * 1000;
  return Date.now() - lastRequestTime.getTime() < cooldownMs;
}

// File size validation
export function validateFileSize(size: number, maxSizeMB: number = 5): boolean {
  const maxSizeBytes = maxSizeMB * 1024 * 1024;
  return size <= maxSizeBytes;
}

// File type validation
export function validateFileType(filename: string, allowedTypes: string[]): boolean {
  const extension = filename.split('.').pop()?.toLowerCase();
  return extension ? allowedTypes.includes(extension) : false;
} 