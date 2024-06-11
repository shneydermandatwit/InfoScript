import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const nonAuthURLs = [
    "/login",
    "/register",
    "deepgram.com"
  ];

  console.log('Request URL:', req.url);

  const requiresAuth = !nonAuthURLs.some(url => req.url.includes(url));
  console.log('Requires Auth:', requiresAuth);

  if (requiresAuth) {
    const jwt = localStorage.getItem("token");
    console.log('JWT:', jwt);
    if (jwt) {
      const authorizedReq = req.clone({
        headers: req.headers.set("Authorization", `Bearer ${jwt}`)
      });
      console.log('Authorized Request:', authorizedReq);
      return next(authorizedReq);
    }
  }

  return next(req);
};
