const { REACT_APP_API_TOKEN, REACT_APP_API_HOST, NODE_ENV } = process.env;

if (!REACT_APP_API_TOKEN || !REACT_APP_API_HOST) {
  throw new Error(
    `${NODE_ENV} environment specific configuration missing for 'REACT_APP_API_TOKEN' or 'REACT_APP_API_HOST'`
  );
}

const getUrl = (path) => `${REACT_APP_API_HOST}/${path}`;

export const api = {
  post: async ({ path, data = {} }) => {
    const url = getUrl(path);
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: REACT_APP_API_TOKEN,
        ...data,
      }),
    });

    return response.json();
  },
};
