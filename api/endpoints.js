const ROOTS = {
  AUTH: "/auth",
  ME: "/me",
  ANALYTICS: "/analytics",
  CHATS: "/chats",
  TEST: "/test",
  CLIENTS: "/clients",
};

const ENDPOINTS = {
  AUTH: {
    LOGIN: `${ROOTS.AUTH}/signin`,
  },
  ME: {
    GET_ME: `${ROOTS.ME}/getMe`,
  },
  ANALYTICS: {
    GET_ANALYTICS: ROOTS.ANALYTICS,
  },
  CHATS: {
    GET_CHATS: ROOTS.CHATS,
    GET_CHAT_SUMMARY: `${ROOTS.CHATS}/summarize_chat`,
  },
  CLIENTS: {
    GET_CLIENTS: `${ROOTS.CLIENTS}`,
    GET_CLIENT_BY_ID: (id) => `${ROOTS.CLIENTS}/${id}`,
    GET_CLIENT_AI_SUMMARY: (id) => `${ROOTS.CLIENTS}/${id}/ai_summary`,
  },
  TEST: {
    SEND_MESSAGE: `${ROOTS.TEST}/send_message`,
    GET_ALL_MESSAGES: `${ROOTS.TEST}/get_all_messages`,
  },
};

export default ENDPOINTS;
