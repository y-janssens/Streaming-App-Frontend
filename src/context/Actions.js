import axios from "axios";

const manager = axios.create();
let dev = false;
let proxy;

if (dev) {
  proxy = "http://127.0.0.1:8000"
} else {
  proxy = "https://y-jns-api.herokuapp.com"
}

export const getToken = async (username, password) => {
  const response = await manager({
    method: "POST",
    url: `${proxy}/api/token/`,
    data: {
      username,
      password,
    },
  });

  return response.data;
};

export const getProfile = async (username) => {
  const response = await manager.get(`${proxy}/api/profile/${username}`);

  return response.data;
};

export const editProfile = async (username, first_name, last_name, email) => {
  const response = await manager({
    method: 'PUT',
    url: `${proxy}/api/profile/${username}`,
    data : {
      username, first_name, last_name, email
    }
  });

  return response.data;
};

export const registerUser = async (username, password, password2, email, first_name, last_name) => {
  const response = await manager({
    method: "POST",
    url: `${proxy}/api/register/`,
    data: {
      username, password, password2, email, first_name, last_name,
    },
  });

  return response.data;
};

export const getVideos = async () => {
  const response = await manager.get(`${proxy}/api/videos/`);

  return response.data;
};

export const getVideo = async (id) => {
  const response = await manager.get(`${proxy}/api/videos/${id}`);

  return response.data;
};

export const addVideo = async (uploadData) => {
  const response = await manager({
    method: 'POST',
    url: `${proxy}/api/video/add`,
    data: uploadData,
    headers: {
      'content-type': 'multipart/form-data',     
    },                     
  });

  return response.data;
};

export const deleteVideo = async (id) => {
  const response = await manager.delete(`${proxy}/api/videos/${id}`);

  return response.data;
};

export const getCategories = async () => {
  const response = await manager.get(`${proxy}/api/categories/`);

  return response.data;
};

export const deleteCategory = async (id) => {
  const response = await manager.delete(`${proxy}/api/categories/${id}`);

  return response.data;
};