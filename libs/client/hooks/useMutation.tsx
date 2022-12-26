import { useState } from "react";

interface MutateState<T> {
  loading: boolean;
  data?: T;
  error?: any;
}

type UseMutationResult<T> = [(data: any) => void, MutateState<T>];

export default function useMutation<T>(url: string): UseMutationResult<T> {
  // const [loading, setLoading] = useState(false);
  // const [data, setData] = useState<undefined | T>();
  // const [error, setError] = useState<undefined | any>();
  const [state, setState] = useState<MutateState<T>>({
    loading: false,
  });
  function mutate(data?: any) {
    setState((state) => ({ ...state, loading: true }));
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json().catch(() => {}))
      .then((json: T) => {
        console.log(json);
        setState((state) => ({ ...state, data: json }));
      })
      .catch((error) => setState({ ...state, error }))
      .finally(() => setState((state) => ({ ...state, loading: false })));
  }
  return [mutate, state];
}
