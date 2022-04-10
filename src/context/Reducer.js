const reducer = (state, action) => {
  switch (action.type) {
    case "GET_TOKEN":
      return {
        ...state,
        token: action.payload,
        loading: false,
      };
      case "QUERY_SET":
      return {
        ...state,
        result: action.payload,
        loading: false,
      };
    case "UPLOAD_VIDEO":
      return {
        ...state,
        content: action.payload,
        loading: false,
      };

    case "UPLOAD_THUMB":
      return {
        ...state,
        content: action.payload,
        loading: false,
      };
    case "REGISTER_USER":
      return {
        ...state,
        user: action.payload,
        loading: false,
      };
    case "GET_PROFILE":
      return {
        ...state,
        profile: action.payload,
        loading: false,
      };
    case "EDIT_PROFILE":
      return {
        ...state,
        profile: action.payload,
        loading: false,
      };
    case "SET_LOADING":
      return {
        ...state,
        loading: true,
      };
    case "GET_VIDEOS":
      return {
        ...state,
        videos: action.payload,
        loading: false,
      };
    case "GET_VIDEO":
      return {
        ...state,
        video: action.payload,
        loading: false,
      };
    case "DELETE_VIDEO":
      return {
        ...state,
        video: action.payload,
        loading: false,
      };
    case "POST_VIDEO":
      return {
        ...state,
        video: action.payload,
        loading: false,
      };
    case "GET_CATEGORIES":
      return {
        ...state,
        categories: action.payload,
        loading: false,
      };
    case "DELETE_CATEGORY":
      return {
        ...state,
        category: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default reducer;
