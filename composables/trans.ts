export const useTrans = () => {
  const {t} = useNuxtApp().$i18n.global
  const trans = (data, ...params) => {
    return data ? t(data, ...params) : null;
  };

  const transError = (message?: string|null): string => trans(message || 'INF_COM_0004')

  return {
    trans,
    transError,
  }
}
