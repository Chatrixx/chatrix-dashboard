const ROOTS = {
  AUTH: "/auth",
  USERS: "/users",
  ANALYTICS: "/analytics",
  CHATS: "/chats",
  TEST: "/test",
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
  TEST: {
    SEND_MESSAGE: `${ROOTS.TEST}/send_message`,
    GET_ALL_MESSAGES: `${ROOTS.TEST}/get_all_messages`,
  },
};

export default ENDPOINTS;
