# 🚨 [HIGH] Missing TypeScript Declarations for Image Imports

## **Summary**
TypeScript compilation fails due to missing type declarations for PNG image imports, preventing successful builds.

## **Location**
- **Files:**
  - `src/components/dashboard/modals/TemplateSelectionModal.tsx:1-4`
  - `src/components/landing/HeroSection.tsx:5`

## **Current Code**
```typescript
// TemplateSelectionModal.tsx
import ClassicResume from '@/assets/classic-resume-placeholder.png';     // ❌ No type declaration
import CreativeResume from '@/assets/creative-resume-placeholder.png';   // ❌ No type declaration
import MinimalResume from '@/assets/minimal-resume-placeholder.png';     // ❌ No type declaration
import ModernResume from '@/assets/modern-resume-placeholder.png';       // ❌ No type declaration

// HeroSection.tsx
import DocImage from '@/assets/images/3d-pages-folder.png';              // ❌ No type declaration
```

## **Error Messages**
```
error TS2307: Cannot find module '@/assets/classic-resume-placeholder.png' or its corresponding type declarations.
error TS2307: Cannot find module '@/assets/creative-resume-placeholder.png' or its corresponding type declarations.
error TS2307: Cannot find module '@/assets/minimal-resume-placeholder.png' or its corresponding type declarations.
error TS2307: Cannot find module '@/assets/modern-resume-placeholder.png' or its corresponding type declarations.
error TS2307: Cannot find module '@/assets/images/3d-pages-folder.png' or its corresponding type declarations.
```

## **Impact**
- **Build failures** - TypeScript compilation fails
- **Development blocking** - Cannot run type checking
- **CI/CD pipeline failures** - Automated builds will fail
- **Developer experience** - No IntelliSense support for image imports

## **Root Cause**
TypeScript doesn't have built-in type declarations for image file imports. Next.js handles these imports at build time, but TypeScript needs explicit type declarations.

## **Proposed Fix**
Create a type declaration file for image imports:

**File:** `src/types/images.d.ts`
```typescript
declare module '*.png' {
  const value: any;
  export default value;
}

declare module '*.jpg' {
  const value: any;
  export default value;
}

declare module '*.jpeg' {
  const value: any;
  export default value;
}

declare module '*.gif' {
  const value: any;
  export default value;
}

declare module '*.svg' {
  const value: any;
  export default value;
}

declare module '*.webp' {
  const value: any;
  export default value;
}
```

**Update `tsconfig.json`** to include the types directory:
```json
{
  "compilerOptions": {
    "typeRoots": ["./node_modules/@types", "./src/types"]
  },
  "include": [
    "src/types/**/*",
    // ... other includes
  ]
}
```

## **Alternative Solution**
Add to existing type declarations or create in `types/global.d.ts` if it exists.

## **Steps to Reproduce**
1. Run `npx tsc --noEmit --skipLibCheck`
2. Observe TypeScript compilation errors for image imports
3. Notice build failures when these components are used

## **Verification**
After implementing the fix:
1. Run `npx tsc --noEmit --skipLibCheck` again
2. Verify no more image import errors
3. Confirm IntelliSense works for image imports

---
**Labels:** `bug`, `high`, `typescript`, `build`, `types`