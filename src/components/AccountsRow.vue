<script setup lang="ts">
import Input from "./Input.vue";
import TagInput from "./TagInput.vue";
import Select from "./Select.vue";

import { ref, computed } from "vue";
import { accountSchema } from "../schema/accountSchema";
import * as z from "zod";

import type { Account } from "../types/account";

interface Props {
  id?: string;
  account?: Account;
}

const { id, account } = defineProps<Props>();

const errors = ref({ fieldErrors: {} });
const tags = ref(account?.tags ?? []);
const type = ref(account?.type ?? "LOCAL");
const login = ref(account?.login ?? "");
const password = ref(
  account?.password ?? (account?.type === "LDAP" ? null : ""),
);

const internalAccountData = computed(() => ({
  tags: tags.value,
  type: type.value,
  login: login.value,
  password: type.value === "LDAP" ? null : password.value,
}));

function validateAndSave() {
  const result = accountSchema.safeParse(internalAccountData.value);
  if (!result.success) {
    console.error(result.error);
    errors.value = z.flattenError(result.error);
  } else {
    console.log(result.data);
    errors.value = { fieldErrors: {} };
  }
}

function submitOnEnter(e: KeyboardEvent) {
  if (e.key === "Enter") {
    validateAndSave();
  }
}
</script>

<template>
  <div class="row">
    <TagInput
      name="test"
      :maxlength="50"
      :invalid="errors.fieldErrors.tags"
      v-model="tags"
      @blur="validateAndSave"
    />
    <Select
      name="type"
      placeholder="Выберите вариант"
      :required="true"
      :values="[
        { value: 'LDAP', label: 'LDAP' },
        { value: 'LOCAL', label: 'Локальный' },
      ]"
      v-model="type"
      @change="validateAndSave"
    />
    <Input
      name="login"
      :maxlength="100"
      :required="true"
      :invalid="errors.fieldErrors.hasOwnProperty('login')"
      :class="{ doublewidth: type === 'LDAP' }"
      v-model="login"
      @blur="validateAndSave"
    />
    <Input
      v-if="type !== 'LDAP'"
      name="password"
      type="password"
      :maxlength="100"
      :required="true"
      :invalid="errors.fieldErrors.hasOwnProperty('password')"
      v-model="password"
      @blur="validateAndSave"
      @keyup="submitOnEnter"
    />
  </div>
</template>

<style scoped>
.row {
  display: grid;
  grid-template-columns: subgrid;
  grid-column: 1 / -1;
}

.doublewidth {
  grid-column: auto / span 2;
}
</style>
