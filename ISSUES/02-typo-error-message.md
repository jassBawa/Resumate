# 🚨 [CRITICAL] Typo in API Error Message

## **Summary**
There are two typos in the error response for unauthorized requests in the threads API.

## **Location**
- **File:** `src/app/api/threads/route.ts`
- **Line:** 51

## **Current Code**
```typescript
if (!userId)
  return NextResponse.json(
    { error: 'Not Unauthorized', sucess: false }, // ❌ Two typos here
    { status: 401 }
  );
```

## **Problems**
1. **"Not Unauthorized"** should be **"Unauthorized"** - the "Not" makes it confusing
2. **"sucess"** should be **"success"** - misspelled word

## **Impact**
- **Confusing error messages** for developers and debugging
- **Inconsistent API responses** across the application
- **Poor developer experience** when integrating with the API
- **Potential client-side parsing issues** if code expects "success" property

## **Expected Behavior**
The error response should clearly indicate the user is unauthorized and use correct spelling.

## **Proposed Fix**
```typescript
if (!userId)
  return NextResponse.json(
    { error: 'Unauthorized', success: false },
    { status: 401 }
  );
```

## **Steps to Reproduce**
1. Make a POST request to `/api/threads` without authentication
2. Observe the confusing error message in the response
3. Notice the misspelled "sucess" field

## **Additional Context**
This affects the API contract and any client code that depends on the correct spelling of the "success" field. It's a simple fix but important for consistency and clarity.

---
**Labels:** `bug`, `critical`, `api`, `typo`, `error-handling`