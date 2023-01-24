export const postFetcher2 = async (args) => {
  const [url, token, uris] = args;

  return fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(uris),
  }).then((res) => res.json());
};
