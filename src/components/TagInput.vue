<script setup lang="ts">
import Input from "./Input.vue";
import { watch, ref } from "vue";
import type { InputHTMLAttributes } from "vue";
import type { Tag } from "../types/tag";

interface Props extends /* @vue-ignore */ InputHTMLAttributes {
  modelValue: Tag[];
  invalid?: boolean;
  name: string;
  placeholder?: string;
  required?: boolean;
}

const {
  modelValue,
  invalid = false,
  name,
  placeholder,
  required = false,
} = defineProps<Props>();

const internalValue = ref("");

const emit = defineEmits(["update:modelValue"]);

let isUpdatingFromModel = false;

watch(
  () => modelValue,
  (newValue) => {
    isUpdatingFromModel = true;
    if (newValue && newValue.length > 0) {
      internalValue.value = newValue.map((el) => el.text).join("; ");
    } else {
      internalValue.value = "";
    }
    isUpdatingFromModel = false;
  },
  { immediate: true },
);

watch(internalValue, (newValue: string) => {
  if (!isUpdatingFromModel) {
    const tagsArray = newValue
      .split(";")
      .map((el) => el.trim())
      .filter(Boolean)
      .map((el) => ({ text: el }));

    emit("update:modelValue", tagsArray);
  }
});
</script>

<template>
  <Input
    :invalid="invalid"
    :name="name"
    :placeholder="placeholder"
    :required="required"
    v-bind="$attrs"
    v-model="internalValue"
  />
</template>

<style scoped></style>
