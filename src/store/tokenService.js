// accessToken vive solo en memoria (nunca en localStorage/sessionStorage)
let accessToken = null;

export const tokenService = {
  get: () => accessToken,
  set: (token) => { accessToken = token; },
  clear: () => { accessToken = null; },
};
