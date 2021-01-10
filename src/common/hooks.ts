import { ref, onMounted, Ref } from "vue";

// const foo: Query = (key, value) => {};

export const useQuery = <T>(promise: () => Promise<T>) => {
  const loading = ref(true);
  const data = ref<T>();
  const error = ref<string>();

  const exec = () => {
    promise()
      .then(res => {
        data.value = res;
      })
      .catch(err => {
        error.value = err;
      })
      .finally(() => {
        loading.value = false;
      });
  };

  onMounted(exec);

  return { loading, data, error, refetch: exec };
};

export const useMutation: <V, T>(
  promise: (variables: V) => Promise<T>,
  options?: {
    onComplated?: (data: T) => void;
    onError?: (err: string) => void;
    onFinally?: () => void;
  }
) => [
  (params: V) => void,
  {
    loading: Ref<boolean>;
    error: Ref<string | undefined>;
  }
] = <V, T>(
  promise: (variables: V) => Promise<T>,
  options?: {
    onComplated?: (data: T) => void;
    onError?: (err: string) => void;
    onFinally?: () => void;
  }
) => {
  const loading = ref(false);
  const error = ref<string>();

  const trigger = (params: V) => {
    loading.value = true;
    promise(params)
      .then(res => {
        options?.onComplated?.(res);
      })
      .catch(err => {
        error.value = err;
        options?.onError?.(err);
      })
      .finally(() => {
        loading.value = false;
        options?.onFinally?.();
      });
  };

  return [trigger, { loading, error }];
};
