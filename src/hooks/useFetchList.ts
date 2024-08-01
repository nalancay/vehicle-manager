import { useEffect, useState } from "react";

interface FetchListProps<T> {
  fetchDataFunction: (apiUrl: string) => Promise<T[]>;
  apiUrl: string;
}

type TErrorState = {
  hasError: boolean;
  message: string;
};

interface UseFetchListResult<T> {
  entities: T[];
  isLoading: boolean;
  errorState: TErrorState;
}

export const useFetchList = <T>({
  fetchDataFunction,
  apiUrl,
}: FetchListProps<T>): UseFetchListResult<T> => {
  const [isLoading, setLoading] = useState<boolean>(true);
  const [errorState, setErrorState] = useState<TErrorState>({
    hasError: false,
    message: "",
  });
  const [entities, setEntities] = useState<T[]>([]);

  useEffect(() => {
    setLoading(true);
    fetchDataFunction(apiUrl)
      .then((res) => {
        setEntities(res);
        setLoading(false);
      })
      .catch((error) => {
        setErrorState({ hasError: true, message: error.message });
        setLoading(false);
      });
  }, [apiUrl]);

  return { entities, isLoading, errorState };
};
