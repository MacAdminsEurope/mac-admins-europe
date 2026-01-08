import { defineMiddleware } from 'astro:middleware';

// Define protected routes that require "basic authentication"
// The homepage '/' and all other pages will be protected
const PROTECTED_ROUTES = [
  '/',
];

// Basic credentials (loaded from environment variables)
const VALID_CREDENTIALS = {
  username: import.meta.env.BASIC_AUTH_USERNAME || 'admin',
  password: import.meta.env.BASIC_AUTH_PASSWORD || 'password123',
};

export const onRequest = defineMiddleware(async (context, next) => {
  const { url, request } = context;
  const pathname = new URL(url).pathname;

  // Check if the current route is protected
  // This logic protects the root '/' and any subpaths if added to PROTECTED_ROUTES
  // Since we only added '/', we might want to protect everything except public assets if needed.
  // For now, let's strictly follow the guide which protects based on prefix or exact match.
  // If we want to protect the WHOLE site, we should check if it's NOT a static asset.
  
  const isProtectedRoute = PROTECTED_ROUTES.some((route) => 
    route === '/' ? true : pathname.startsWith(route)
  );

  // For protected routes, check authentication
  if (isProtectedRoute) {
    const authHeader = request.headers.get('authorization');

    if (!authHeader || !authHeader.startsWith('Basic ')) {
      // Return 401 Unauthorized with WWW-Authenticate header
      return new Response('Authentication required', {
        status: 401,
        headers: {
          'WWW-Authenticate': 'Basic realm="Mac Admins Europe Preview"',
          'Content-Type': 'text/plain',
        },
      });
    }

    // Extract and decode credentials
    const encodedCredentials = authHeader.substring(6);
    const decodedCredentials = atob(encodedCredentials);
    const [username, password] = decodedCredentials.split(':');

    // Validate credentials
    if (
      username !== VALID_CREDENTIALS.username ||
      password !== VALID_CREDENTIALS.password
    ) {
      return new Response('Invalid credentials', {
        status: 401,
        headers: {
          'WWW-Authenticate': 'Basic realm="Mac Admins Europe Preview"',
          'Content-Type': 'text/plain',
        },
      });
    }
  }

  // Continue to the next middleware/route handler
  return next();
});
