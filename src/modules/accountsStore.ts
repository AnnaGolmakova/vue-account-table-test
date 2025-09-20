import { defineStore } from "pinia";
import { ref, watch } from "vue";
import type { Account } from "../types/account";

const LOCALSTORAGE_ID = "accountsStore";

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

  function initLocalStorage() {
    const stored = localStorage.getItem(LOCALSTORAGE_ID);
    if (stored) {
      accounts.value = new Map(JSON.parse(stored));
    }

    watch(
      accounts,
      () => {
        localStorage.setItem(
          LOCALSTORAGE_ID,
          JSON.stringify(Array.from(accounts.value.entries())),
        );
      },
      { deep: true },
    );
  }

  return {
    accounts,
    createAccount,
    updateAccount,
    deleteAccount,
    initLocalStorage,
  };
});
