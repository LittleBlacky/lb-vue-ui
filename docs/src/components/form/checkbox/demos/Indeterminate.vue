<template>
  <div>
    <LbCheckbox
      v-model="checkAll"
      :indeterminate="isIndeterminate"
      @change="onCheckAllChange"
    >
      全选
    </LbCheckbox>
    <div style="margin-top: 8px">
      <LbCheckboxGroup v-model="checkedList" name="cities">
        <LbCheckbox label="北京" />
        <LbCheckbox label="上海" />
        <LbCheckbox label="广州" />
        <LbCheckbox label="深圳" />
      </LbCheckboxGroup>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, watch } from "vue";

const all = ["北京", "上海", "广州", "深圳"];
const checkedList = ref<Array<string | number | boolean>>(["北京", "广州"]);
const checkAll = ref<boolean | null>(false);
const isIndeterminate = ref(false);

watch(
  checkedList,
  (list) => {
    const length = list.length;
    checkAll.value = length === all.length ? true : false;
    isIndeterminate.value = length > 0 && length < all.length;
  },
  { immediate: true }
);

const onCheckAllChange = (val: boolean) => {
  checkedList.value = val ? [...all] : [];
};
</script>
