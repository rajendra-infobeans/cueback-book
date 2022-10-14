export const loginObject = (obj) => {
  // this function will convert new api payload format into old api format
  const newObj = {
    emailId: obj.email,
    password: obj.password,
  };
  return newObj;
};
export const loginResponse = (oldResponse) => {
  // this function converts old api response into new API response
  const newResponse = {
    code: oldResponse.ResponseCode,
    message: oldResponse.ResponseMessage,
    data: {
      uid: oldResponse.Response.UserID,
      auth_time: Math.floor(new Date().getTime() / 1000),
      email: oldResponse.Response.email ? oldResponse.Response.email : '',
      fullName:
        oldResponse.Response.FirstName + ' ' + oldResponse.Response.LastName,
      exp: Math.floor(new Date().getTime() / 1000) + 24,
      token: {
        accessToken: oldResponse.Response.UserAuthToken,
        idToken: oldResponse.Response.UserAuthToken,
        refreshToken: oldResponse.Response.UserAuthToken,
      },
    },
  };
  return newResponse;
};

export const recentObject = (obj) => {
  const newObj = {
    type: 'feed',
    filter: {
      mystories: {
        me: 1,
        friend: 0,
        others: 0,
        groups: {
          1: 0,
          82: 0,
          136: 0,
          148: 0,
        },
      },
      save_filters: 0,
    },
    configurationTimestamp: '0',
    searchTerm: {
      prompt_pagination: 0,
      start: obj.params?.pageIndex,
      length: obj.params?.pageSize,
      searchString: obj.params?.searchTerm,
      last_memory_date: '',
      request_type: 'older',
    },
    randomPrompts: 0,
  };
  return newObj;
};

export const recentResponse = (obj) => {
  const dataArr = obj?.Details;
  if (dataArr) {
    dataArr.data.map((item) => {
      item.memoryID = item?.nid;
      item.author = {
        name: { first: '', last: '' },
        profilePictures: { upload: '' },
      };
      item.author.name.first = item?.user_details?.field_first_name_value;
      item.author.name.last = item?.user_details?.field_last_name_value;
      item.author.profilePictures.upload =
        item?.user_details?.thumbnail_preview;
      item.imageURLs = [];
      item.imageURLs.push = item?.images ? item?.images[0]?.url : '';
      item.body = { content: '' };
      item.body.content = item?.description;
      item.date = { updated: '' };
      item.date.updated = item?.updated;
    });
  }
  const newResponse = {
    message: obj.ResponseMessage,
    code: obj.ResponseCode,
    page: {
      totalItems: dataArr?.count,
      totalPages: 'NA',
      currentPage: 'NA',
      pageSize: 'NA',
    },
    data: dataArr?.data,
  };
  return newResponse;
};
