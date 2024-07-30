<script setup>

const router = useRouter();
const { notEmpty } = useValidate();
const {trans, transError} = useTrans()
import {sleep} from "@antfu/utils";
const {$startLoading, $stopLoading} = useLoading()

const data = reactive({
  username: '',
  password: '',
  showPassword: false,
});

const rules = {
  username: [
    { required: true, validator: notEmpty }
  ],
  password: [
    { required: true, validator: notEmpty },
  ],
};

definePageMeta({
  middleware: 'auth',
});

const login = async () => {
  try {
   
    $startLoading()
    
    if (data.username === 'admin' && data.password === 'admin') {
      await sleep(1000)
      localStorage.setItem('user', JSON.stringify({ username: data.username }));
      message.success(trans('MESSAGE.LOGIN'))
      router.push('/');
    } else if (data.username !== '' && data.password !== '') {
      message.error(transError('MESSAGE.ERROR_01'));
    }
  } catch (e) {
    message.error(transError('MESSAGE.ERROR_02'));
  } finally {
    $stopLoading()
  }
};

const toggleShowPassword = () => {
  data.showPassword = !data.showPassword;
};
</script>

<template>
  <a-row class="login-layout" justify="center" align="middle">
    <a-col :xs="22">
      <div class="login-container relative z-50">
        <a-card :headStyle="{ borderBottom: 0 }" :bodyStyle="{ padding: '32px 63px', borderRadius: '10px' }">
          <div class="image-container">
            <IconsTodo class="w-20 mb-2.5" />
          </div>
          <h1 class="mb-9 text-gray text-center">{{trans('TODO.TITLE')}}</h1>
          <a-form layout="vertical" autocomplete="off" @submit.prevent="login" :model="data" :rules="rules">
            <a-form-item name="username" :label="trans('TODO.USERNAME')">
              <a-input
                size="large"
                :placeholder="trans('TODO.PLACEHOLDER')"
                class="placeholder:text-gray-60"
                v-model:value="data.username"
              />
            </a-form-item>
            <a-form-item name="password" :label="trans('TODO.PASSWORD')">
              <a-input
                placeholder="● ● ● ● ● ●"
                :type="data.showPassword ? 'text' : 'password'"
                size="large"
                class="placeholder-gray input-eye input-password"
                v-model:value="data.password"
              />
              <span tabindex="0" @keyup.enter="toggleShowPassword" @click="toggleShowPassword" class="toggle-password select-none">
                <IconsEyeSlash class="select-none" v-if="data.showPassword" />
                <IconsEye class="select-none" v-else />
              </span>
            </a-form-item>
            <a-button htmlType="submit" type="primary" block>
              {{trans('TODO.TITLE')}}
            </a-button>
          </a-form>
        </a-card>
      </div>
    </a-col>
  </a-row>
</template>

<style lang="scss" scoped>
.login-layout {
  background-image: url(/static/images/bg.jpg);
  background-size: cover;
  background-repeat: repeat;
  height: 100vh;
  position: relative;
}

.login-layout::before{
  position: absolute;
  content: "";
  width: 100%;
  height: 100%;
  z-index: 1;
  background: #15ae674d;
}

.login-container {
  max-width: 588px;
  margin: auto;
  border-radius: 10px;
  box-shadow: 0px 4px 4px 0px #b8b8b840;
}

.image-container {
  display: flex;
  align-items: center;
  justify-content: center;
}

.toggle-password {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.input-password::placeholder {
  color: #4a4a4a;
}
</style>