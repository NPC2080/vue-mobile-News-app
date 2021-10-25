//频道相关请求模块
import request from "@/utils/request";

export const getAllChannels = () => {
  return request({
    method: "GET",
    url: "/getallchannels",
  });
};

export const addUserChannels = (data) => {
  return request({
    method: "PATCH",
    url: "/adduserchannels",
    data,
  });
};

export const deleteUserChannels = (channelID) => {
  return request({
    method: "DELETE",
    url: `/deleteuserchannels/${channelID}`,
  });
};
