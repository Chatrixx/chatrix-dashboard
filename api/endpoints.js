const ROOTS = {
  AUTH: "/auth",
  USERS: "/users",
  ANALYTICS: "/analytics",
  CHATS: "/chats",
};

const ENDPOINTS = {
  AUTH: {
    LOGIN: `${ROOTS.AUTH}/signin`,
  },
  USERS: {
    GET_ME: `${ROOTS.USERS}/me`,
  },
  ANALYTICS: {
    GET_ANALYTICS: ROOTS.ANALYTICS,
  },
  CHATS: {
    GET_CHATS: ROOTS.CHATS,
  },
};

export default ENDPOINTS;
