import type { Rule } from 'ant-design-vue/es/form';

export const useValidate = () => {

  const {trans} = useTrans()
  const notEmpty = (_rule: Rule, value: string) => {
    return (!value && value !== 0) 
      ? Promise.reject(trans('MESSAGE.ERROR_03'))
      : Promise.resolve();
  }

  return {
    notEmpty,
  }
}