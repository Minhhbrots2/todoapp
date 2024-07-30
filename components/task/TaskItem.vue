<template>
  <a-list-item>
    <template v-if="isEditing">
      <input
        v-model="editingTask"
        @blur="handleBlur"
        @keyup.enter="handleEnter"
        class="w-full"
      />
    </template>
    <template v-else>
      <a-checkbox :checked="task.completed" @change="toggleComplete" />
      <a-list-item-meta class="ml-2.5" :title="task.text" :class="{ 'line-through': task.completed }" />
    </template>
    <template #actions>
      <a v-if="!isEditing" @click="startEditing"><FormOutlined/></a>
      <a v-if="isEditing" @click="handleEnter"><CheckCircleOutlined /></a>
      <a @click="() => deleteTask(index)"><DeleteOutlined /></a>
    </template>
  </a-list-item>
</template>

<script setup>

const props = defineProps({
  task: {
    type: Object,
    required: true
  },
  index: {
    type: Number,
    required: true
  },
  updateTask: {
    type: Function,
    required: true
  },
  deleteTask: {
    type: Function,
    required: true
  }
});

const isEditing = ref(false);
const editingTask = ref(props.task.text);

const startEditing = () => {
  isEditing.value = true;
  editingTask.value = props.task.text;
};

const saveTask = () => {
  isEditing.value = false;
  props.updateTask(editingTask.value, props.index);
};

const handleBlur = () => {
  saveTask();
};

const handleEnter = () => {
  saveTask();
};

const toggleComplete = (e) => {
  props.task.completed = e.target.checked;
  props.updateTask(props.task.text, props.index, props.task.completed);
};

watch(() => props.task.text, (newVal) => {
  editingTask.value = newVal;
});
</script>
