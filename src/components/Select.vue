<script setup lang="ts">
import type { InputHTMLAttributes } from "vue";
import { useId } from "vue";

interface Props extends /* @vue-ignore */ InputHTMLAttributes {
  invalid?: boolean;
  name: string;
  values: OptionType[];
  placeholder?: string;
  required?: boolean;
}

type OptionType = {
  label: string;
  value: string;
};

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
  <select
    :id="uniqueId"
    :class="{ error: invalid }"
    :name="name"
    :placeholder="placeholder"
    :required="required"
    v-bind="$attrs"
    v-model="value"
  >
    <option v-if="placeholder" value="" disabled>{{ placeholder }}</option>
    <option v-for="item in values" :value="item.value" :key="item.value">
      {{ item.label }}
    </option>
  </select>
</template>

<style scoped>
select {
  flex-grow: 1;
  box-sizing: border-box;
  border: 1px solid var(--input-stroke, rgba(0, 0, 0, 0.16));
  border-radius: var(--input-radius, 8px);
  background-color: var(--input-background, rgba(255, 255, 255, 1));
  padding: 8px 16px 8px 12px;
  color: var(--text-primary, rgba(0, 0, 0, 1));
  font-weight: 500;
  font-size: 14px;
  line-height: 18px;
  font-family: inherit;
}
select::placeholder {
  color: var(--text-secondary, rgba(0, 0, 0, 0.6));
}
select:focus {
  outline: 2px solid var(--accent, rgba(0, 128, 255, 1));
}
.error {
  border: 1px solid var(--danger, rgba(255, 0, 0, 1));
}
</style>
