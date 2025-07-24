# ⚠️ [MEDIUM] Duplicate Authorization Headers in fetchWithAuth

## **Summary**
The `fetchWithAuth` utility function sets the Authorization header twice, which could lead to confusion and inconsistent behavior.

## **Location**
- **File:** `src/lib/fetchWithAuth.ts`
- **Lines:** 7-22

## **Current Code**
```typescript
export async function fetchWithAuth(path: string, options: RequestInit = {}) {
  const { getToken } = await auth();
  const token = await getToken();
  const headers = new Headers(options.headers);
  if (token) {
    headers.set('Authorization', `Bearer ${token}`); // ❌ First time
  }
  const baseUrl = ENV_CONFIG.BASE_URL;

  const response = await fetch(`${baseUrl}${path}`, {
    ...options,
    headers: {
      ...(options.headers || {}),
      Authorization: `Bearer ${token}`, // ❌ Second time - overwrites first
    },
  });

  return response;
}
```

## **Problems**
1. **Header set twice**: Authorization header is set both manually via `Headers` object and in the fetch options
2. **Unused Headers object**: The manually created `headers` object is never used
3. **Potential confusion**: The second assignment overwrites the first
4. **Inconsistent patterns**: Mixed approaches to header handling

## **Impact**
- **Code confusion** for developers maintaining the function
- **Potential bugs** if the Headers object behavior is expected elsewhere
- **Performance overhead** from unnecessary header manipulation
- **Maintenance burden** from redundant code

## **Expected Behavior**
The function should set the Authorization header only once using a consistent approach.

## **Proposed Fix Option 1** (Using spread pattern):
```typescript
export async function fetchWithAuth(path: string, options: RequestInit = {}) {
  const { getToken } = await auth();
  const token = await getToken();
  const baseUrl = ENV_CONFIG.BASE_URL;

  const response = await fetch(`${baseUrl}${path}`, {
    ...options,
    headers: {
      ...(options.headers || {}),
      Authorization: `Bearer ${token}`,
    },
  });

  return response;
}
```

## **Proposed Fix Option 2** (Using Headers object):
```typescript
export async function fetchWithAuth(path: string, options: RequestInit = {}) {
  const { getToken } = await auth();
  const token = await getToken();
  const headers = new Headers(options.headers);
  
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }
  
  const baseUrl = ENV_CONFIG.BASE_URL;

  const response = await fetch(`${baseUrl}${path}`, {
    ...options,
    headers,
  });

  return response;
}
```

## **Steps to Reproduce**
1. Review the `fetchWithAuth` function
2. Notice the Authorization header is set twice
3. Observe that the first setting via Headers object is unused

## **Additional Context**
This is a code quality issue that doesn't break functionality but makes the code harder to maintain and understand. Choose one consistent approach for setting headers.

---
**Labels:** `bug`, `medium`, `code-quality`, `refactor`, `headers`