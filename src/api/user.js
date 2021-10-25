//用户相关请求模块
import request from "@/utils/request";

export const login = (data) => {
  return request({
    method: "POST",
    url: "/login",
    data,
  });
};

export const sendSMS = (data) => {
  return request({
    method: "GET",
    url: `/send${data}`,
  });
};

export const getCurrentUser = () => {
  return request({
    method: "GET",
    url: "/getcurrentuser",
  });
};

export const getUserChannels = () => {
  return request({
    method: "GET",
    url: "/getuserchannels",
  });
};
