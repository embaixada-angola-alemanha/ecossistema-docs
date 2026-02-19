// @ecossistema/core — Shared models, interfaces, and utilities

// === API Response models (canonical) ===
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string | null;
  timestamp?: string;
}

export interface PagedData<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  first: boolean;
  last: boolean;
}

// === Base entity ===
export interface BaseEntity {
  id: string;
  createdAt: string;
  updatedAt: string;
}

// === Multilingual content helper ===
export interface MultilingualContent {
  pt: string;
  en?: string;
  de?: string;
  cs?: string;
}

// === Environment config ===
export interface EnvironmentConfig {
  production: boolean;
  apiBaseUrl: string;
  siteUrl?: string;
  siteName?: string;
  defaultLang: string;
  supportedLangs: string[];
}

// === Language constants ===
export interface Language {
  code: string;
  label: string;
  flag?: string;
}

export const SUPPORTED_LANGUAGES: Language[] = [
  { code: 'pt', label: 'Português' },
  { code: 'en', label: 'English' },
  { code: 'de', label: 'Deutsch' },
  { code: 'cs', label: 'Crioulo' }
];

// === Utility types ===
export type UUID = string;
export type ISODateString = string;
export type Estado = 'DRAFT' | 'REVIEW' | 'PUBLISHED' | 'ARCHIVED';

// === Common patterns ===
export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface BreadcrumbItem {
  label: string;
  routerLink?: string[];
  translate?: boolean;
}

// === Utility functions ===
export function getLocalizedValue(
  obj: Record<string, unknown>,
  fieldBase: string,
  lang: string
): string {
  const suffix = lang.charAt(0).toUpperCase() + lang.slice(1);
  const key = fieldBase + suffix;
  return (obj[key] as string) || (obj[fieldBase + 'Pt'] as string) || '';
}

export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
}

export function truncate(text: string, maxLength: number): string {
  if (!text || text.length <= maxLength) return text;
  return text.substring(0, maxLength).replace(/\s+\S*$/, '') + '...';
}
