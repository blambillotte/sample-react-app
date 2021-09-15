const getUrl = (path) => `${process.env.REACT_APP_API_HOST}/${path}`;

export const api = {
  post: async ({ path, data = {} }) => {
    const url = getUrl(path);
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: "",
        ...data,
      }),
    });

    return response.json();
  },
};
