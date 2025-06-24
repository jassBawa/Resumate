import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { create } from 'jsondiffpatch';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const diffpatch = create();

export function createDiff(oldData: any, newData: any) {
  return diffpatch.diff(oldData, newData);
}

export function applyDiff(base: any, delta: any): any {
  if (delta === undefined || delta === null) {
    throw new Error('applyDiff: delta (diff patch) is undefined or null');
  }
  return diffpatch.patch(JSON.parse(JSON.stringify(base)), delta);
}

export function smoothScrollTo(elementId: string, offset: number = 0) {
  const element = document.getElementById(elementId);
  if (element) {
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth',
    });
  }
}

export function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
}
