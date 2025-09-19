import { defineStore } from "pinia";
import { ref } from "vue";
import type { Account } from "../types/account";

function generateID() {
  return Date.now().toString();
}

export const useAccountsStore = defineStore("accounts", () => {
  const accounts = ref<Map<string, Account>>(new Map());

  function createAccount(data: Account) {
    accounts.value.set(generateID(), data);
  }

  function updateAccount(id: string, data: Account) {
    accounts.value.set(id, data);
  }

  function deleteAccount(id: string) {
    accounts.value.delete(id);
  }

  return { accounts, createAccount, updateAccount, deleteAccount };
});
