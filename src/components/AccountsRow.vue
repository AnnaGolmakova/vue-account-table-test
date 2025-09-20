<script setup lang="ts">
import Input from "./Input.vue";
import TagInput from "./TagInput.vue";
import Select from "./Select.vue";

import { Trash2 } from "lucide-vue-next";

import { ref, computed, onMounted } from "vue";
import { accountSchema } from "../schema/accountSchema";

import * as z from "zod";

import type { Account } from "../types/account";
import type { Tag } from "../types/tag";

interface Props {
  account?: Account;
}

const { account } = defineProps<Props>();

const emit = defineEmits(["save", "delete"]);

const errors = ref({ fieldErrors: {} });
const tags = ref<Tag[]>([]);
const type = ref("LOCAL");
const login = ref("");
const password = ref<string | null>("");

const internalAccountData = computed(() => ({
  tags: tags.value,
  type: type.value,
  login: login.value,
  password: type.value === "LDAP" ? null : password.value,
}));

function validateAndSave() {
  const result = accountSchema.safeParse(internalAccountData.value);
  if (!result.success) {
    errors.value = z.flattenError(result.error);
  } else {
    errors.value = { fieldErrors: {} };
    emit("save", result.data);
  }
}

function submitOnEnter(e: KeyboardEvent) {
  if (e.key === "Enter") {
    validateAndSave();
  }
}

onMounted(() => {
  if (account) {
    tags.value = account.tags;
    type.value = account.type;
    login.value = account.login;
    password.value = account.password;
  }
});
</script>

<template>
  <div class="row">
    <TagInput
      name="test"
      :maxlength="50"
      :invalid="errors.fieldErrors.hasOwnProperty('tags')"
      v-model="tags"
      @blur="validateAndSave"
    />
    <Select
      name="type"
      placeholder="Выберите вариант"
      :required="true"
      :values="[
        { value: 'LDAP', label: 'LDAP' },
        { value: 'LOCAL', label: 'Локальная' },
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
    <button
      aria-label="Удалить запись"
      class="delete"
      @click="() => emit('delete')"
    >
      <Trash2 />
    </button>
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

.delete {
  appearance: none;
  cursor: pointer;
  border: none;
  border-radius: 8px;
  background: transparent;
  width: 36px;
  height: 36px;

  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
}
</style>
