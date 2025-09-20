<script setup lang="ts">
import type { InputHTMLAttributes } from "vue";
import { useId } from "vue";

interface Props extends /* @vue-ignore */ InputHTMLAttributes {
  invalid?: boolean;
  name: string;
  placeholder?: string;
  required?: boolean;
}

const {
  invalid = false,
  name,
  placeholder,
  required = false,
} = defineProps<Props>();

const value = defineModel();

const uniqueId = useId();
</script>

<template>
  <input
    :id="uniqueId"
    :class="{ error: invalid }"
    :name="name"
    :placeholder="placeholder"
    :required="required"
    v-bind="$attrs"
    v-model="value"
  />
</template>

<style scoped>
input {
  flex-grow: 1;
  box-sizing: border-box;
  border: 1px solid var(--input-stroke, rgba(0, 0, 0, 0.16));
  border-radius: var(--input-radius, 8px);
  background-color: var(--input-background, rgba(255, 255, 255, 1));
  padding: 8px 12px;
  color: var(--text-primary, rgba(0, 0, 0, 1));
  font-weight: 500;
  font-size: 14px;
  line-height: 18px;
  font-family: inherit;
}
input::placeholder {
  color: var(--text-secondary, rgba(0, 0, 0, 0.6));
}
input:focus {
  outline: 2px solid var(--accent, rgba(0, 128, 255, 1));
}
.error {
  border: 1px solid var(--danger, rgba(255, 0, 0, 1));
}
</style>
