<script setup lang="ts">
import AccountsRow from "./components/AccountsRow.vue";
</script>

<template>
  <h1>Учетные записи</h1>
  <div class="table">
    <div class="table__header">
      <div class="table__title">Метка</div>
      <div class="table__title">Тип записи</div>
      <div class="table__title">Логин</div>
      <div class="table__title">Пароль</div>
    </div>
    <AccountsRow />
  </div>
</template>

<style scoped>
.table {
  display: grid;
  grid-template-columns: 1fr 140px repeat(2, 1fr);
  gap: 4px 8px;
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
