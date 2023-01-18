export const fetcher = (...args) => {
  const [url, token] = args.flat();

  return fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => res.json());
};
