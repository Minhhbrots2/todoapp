<script setup>

import {sleep} from "@antfu/utils";

const router = useRouter();
const { notEmpty } = useValidate();
const {$startLoading, $stopLoading} = useLoading()
const {trans} = useTrans()

const tasks = ref([]);
const data = reactive({
  newTask: '',
});

definePageMeta({
  middleware: 'auth',
});
const contactForm = ref(null);
const rules = {
  newTask: [
    { required: true, validator: notEmpty }
  ],
};

const loadTasks = () => {
  const storedTasks = localStorage.getItem('tasks');
  if (storedTasks) {
    tasks.value = JSON.parse(storedTasks);
  }
};

const saveTasks = () => {
  localStorage.setItem('tasks', JSON.stringify(tasks.value));
};

const addTask = async () => {
  try {

    $startLoading()

    if (data.newTask.trim() !== '') {
      await sleep(1000)
      tasks.value.push({ text: data.newTask });
      saveTasks();
      message.success(trans('MESSAGE.ADD'))
      contactForm.value.resetFields();
    }
  } catch (e) {
    message.error(e);
  } finally {

    $stopLoading()
  }
};

const updateTask = (newText, index) => {
  if (index > -1) {
    tasks.value[index].text = newText;
    saveTasks();
    message.success(trans('MESSAGE.UPDATE'))
  }
};

const deleteTask = (index) => {
  tasks.value.splice(index, 1);
  saveTasks();
  message.success(trans('MESSAGE.DELETE'))
};

const logout = () => {
  localStorage.removeItem('user');
  router.push('/login');
};

loadTasks();

watch(tasks, saveTasks, { deep: true });
</script>

<template>
  <a-row class="todo-layout" justify="center" align="middle">
    <a-col :xs="22" :md="16">
      <div class="todo-container">
        <a-card :headStyle="{ borderBottom: 0 }" :bodyStyle="{ padding: '24px' }">
          <div class="mb-5">
            <IconsTodo class="w-20 mb-2.5 mx-auto" />
            <a-button class="absolute top-12 right-6" @click="logout"><LoginOutlined /></a-button>
          </div>
          <a-form @submit.prevent="addTask" autocomplete="off" :model="data" :rules="rules" ref="contactForm">
            <a-input-group compact>
              <a-form-item class="w-full" name="newTask">
                <a-input
                  size="large"
                  v-model:value="data.newTask"
                />
              </a-form-item>
              <a-button class="absolute top-1 right-1 z-50" type="primary" htmlType="submit" style="width: 100px">Thêm mới</a-button>
            </a-input-group>
          </a-form>
          <a-list class="mt-4" bordered itemLayout="horizontal">
            <template v-for="(item, index) in tasks" :key="index">
              <TaskItem
                :task="item"
                :index="index"
                :updateTask="updateTask"
                :deleteTask="deleteTask"
              />
            </template>
          </a-list>
        </a-card>
      </div>
    </a-col>
  </a-row>
</template>

<style lang="scss" scoped>
.todo-layout {
  background: #f3f3f3;
  height: 100vh;
}

.todo-container {
  max-width: 588px;
  margin: auto;
  border-radius: 10px;
  box-shadow: 0px 4px 4px 0px #b8b8b840;
}
</style>