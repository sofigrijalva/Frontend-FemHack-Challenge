import useSwr from "swr";

const baseUrl = `http://localhost:${process.env.BACKEND_PORT || 8080}`;

export const useRequest = (path: string) => {
  if (!path) {
    throw new Error("Path is required");
  }

  const url = baseUrl + path;
  const { data, error, isLoading } = useSwr(url);

  return { data, error, isLoading };
};
