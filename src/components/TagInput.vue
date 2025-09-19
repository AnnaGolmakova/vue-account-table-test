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

watch(
  () => modelValue,
  (newValue) => {
    if (newValue !== null) {
      internalValue.value = newValue.map((el) => el.text).join("; ");
    } else {
      internalValue.value = "";
    }
  },
  { immediate: true },
);

watch(internalValue, (newValue: string) => {
  const tagsArray = newValue
    .split(";")
    .map((el) => el.trim())
    .filter(Boolean)
    .map((el) => ({ text: el }));

  emit("update:modelValue", tagsArray);
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
