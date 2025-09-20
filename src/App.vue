<script setup lang="ts">
import { ref } from "vue";
import AccountsRow from "./components/AccountsRow.vue";
import { Plus } from "lucide-vue-next";
import { useAccountsStore } from "./modules/accountsStore";

const accountsStore = useAccountsStore();
const draftRows = ref<Map<number, null>>(new Map());

function appendNewRow() {
  draftRows.value.set(Date.now(), null);
}
</script>

<template>
  <header class="header">
    <h1>Учетные записи</h1>
    <button aria-label="Добавить запись" class="create" @click="appendNewRow">
      <Plus />
    </button>
  </header>

  <div class="table">
    <div class="table__header">
      <div class="table__title">Метка</div>
      <div class="table__title">Тип записи</div>
      <div class="table__title">Логин</div>
      <div class="table__title">Пароль</div>
    </div>
    <AccountsRow
      v-for="[id, account] in accountsStore.accounts"
      :key="id"
      :account="account"
      @delete="() => accountsStore.deleteAccount(id)"
      @save="(data) => accountsStore.updateAccount(id, data)"
    />
    <AccountsRow
      v-for="[id] in draftRows"
      :key="id"
      @delete="() => draftRows.delete(id)"
      @save="
        (data) => {
          accountsStore.createAccount(data);
          draftRows.delete(id);
        }
      "
    />
  </div>
</template>

<style scoped>
.header {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 24px;
  margin-bottom: 40px;
}

.create {
  display: grid;
  place-content: center;
  appearance: none;
  cursor: pointer;
  border: solid 1px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  background: transparent;
  width: 44px;
  height: 44px;

  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
}

.table {
  display: grid;
  grid-template-columns: 1fr 140px repeat(2, 1fr) auto;
  gap: 16px 8px;
  min-width: 860px;
}

.table__header {
  display: grid;
  grid-template-columns: subgrid;
  grid-column: 1 / -1;
}

.table__title {
  color: var(--text-secondary, rgba(0, 0, 0, 0.6));
  text-align: left;
}
</style>
