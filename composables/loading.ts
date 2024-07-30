export const useLoading = (): LoadingFunc => {
  const { $startLoading, $stopLoading } = useNuxtApp();
  return {
    $startLoading: $startLoading as CallableFunction,
    $stopLoading: $stopLoading as CallableFunction
  };
};

declare type LoadingFunc = {
  $startLoading: CallableFunction,
  $stopLoading: CallableFunction
};