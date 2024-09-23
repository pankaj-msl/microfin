<template>
  <v-sheet>
    <v-layout>
      <v-app-bar color="primary" class="gradient-app-bar" prominent>
        <v-btn
          icon="mdi-dots-vertical"
          variant="text"
          @click.stop="drawer = !drawer"
        ></v-btn>

        <v-toolbar-title>MicroFin</v-toolbar-title>

        <v-spacer></v-spacer>

        <template v-if="$vuetify.display.mdAndUp">
          <v-btn icon="mdi-magnify" variant="text"></v-btn>
          <v-btn icon="mdi-filter" variant="text"></v-btn>
        </template>

        <v-btn icon="mdi-export"></v-btn>
      </v-app-bar>

      <v-navigation-drawer
        v-model="drawer"
        :location="$vuetify.display.mobile ? 'bottom' : undefined"
        temporary
      >
        <v-list :items="items"></v-list>
      </v-navigation-drawer>

      <v-main style="height: 500px">
        <v-card class="mx-2 my-4">
          <v-card-title>Expenses</v-card-title>
          <v-card-subtitle> Rs 2860</v-card-subtitle>
          <v-card height="280" class="mx-4 my-4" color="red"></v-card>
          <span class="text-subtitle-1 mx-4 text-primary">View Details</span>
        </v-card>
        <!-- ============================ Latest Transaction ========================================================= -->
        <v-card class="mx-2 my-4">
          <v-card-title class="text-purple-darken-4"
            >Latest transactions</v-card-title
          >
          <v-list>
            <v-list-item
              v-for="transaction in transactions"
              elevation="1"
              class="list-item-color mx-1 my-2"
            >
              <v-row>
                <v-col cols="8">
                  <v-icon icon="mdi-notebook-heart" color="primary"></v-icon>
                  {{ transaction.category_name }}
                  <v-card-subtitle class="mx-4">{{
                    transaction.formattedDate
                  }}</v-card-subtitle>
                </v-col>
                <v-col cols="4" class="float-right">
                  <v-icon icon="mdi-cash" color="success"></v-icon>
                  {{ transaction.amount }}
                </v-col>
              </v-row>
            </v-list-item>
            <!-- <v-list-item elevation="1" class="list-item-color mx-1 my-2">
              <v-row>
                <v-col cols="8">
                  <v-icon icon="mdi-airplane" color="secondary"></v-icon>
                  Travelling
                  <v-card-subtitle class="mx-4"
                    >Today, 12:58 PM</v-card-subtitle
                  >
                </v-col>
                <v-col cols="4" class="float-right">
                  <v-icon icon="mdi-cash" color="success"></v-icon>
                  Rs 90
                </v-col>
              </v-row>
            </v-list-item> -->
          </v-list>
          <span class="text-subtitle-1 mx-4 text-primary"
            >View Transactions</span
          >
        </v-card>
        <!-- ============================ End Latest Transaction ===================================================== -->
        <div class="speed-dialer">
          <v-btn @click="showTransactionModal = true" class="speed-dialer-icon">
            <v-icon icon="mdi-plus"></v-icon>
          </v-btn>
        </div>
        <!-- ============================= Cash in Hand and Accounts ================================================= -->
        <div>
          <v-row>
            <v-col cols="6">
              <v-card class="mx-2 px-2 py-6">
                <v-icon icon="mdi-cash" color="success"></v-icon>
                <span class="text-md-subtitle-1 text-subtitle-2 text-secondary">
                  Cash: Rs 133490</span
                >
              </v-card>
            </v-col>
            <v-col cols="6">
              <v-card class="mx-2 px-4 py-6">
                <v-icon icon="mdi-bank" color="primary"></v-icon>
                <span class="text-subtitle-2 text-md-subtitle-1 text-secondary">
                  Accounts</span
                >
              </v-card>
            </v-col>
          </v-row>
        </div>
        <!-- ============================= End Cash in Hand and Accounts ============================================= -->

        <!-- ============================= Manage Budget ============================================================ -->
        <v-card class="mx-2 my-4">
          <v-card-title class="text-purple-darken-4">Budgets</v-card-title>
          <v-list>
            <v-list-item elevation="1" class="list-item-color mx-1 my-2">
              <v-row>
                <v-col cols="6" md="6">
                  <v-icon icon="mdi-airplane" color="success"></v-icon>
                  Travel
                </v-col>
                <v-col>
                  <span class="text-subtitle-2 text-secondary"
                    >Spent 250 of 2000</span
                  >
                </v-col>
              </v-row>
              <v-col class="d-flex align-center">
                <v-progress-linear
                  prepend-icon="mdi-airplane"
                  bg-color="pink-lighten-3"
                  color="pink-lighten-1"
                  model-value="15"
                ></v-progress-linear>
                <br />
              </v-col>
            </v-list-item>
            <v-list-item elevation="1" class="list-item-color mx-1 my-2">
              <v-row>
                <v-col cols="6" md="6">
                  <v-icon icon="mdi-piggy-bank" color="success"></v-icon>
                  Recharge Bill
                </v-col>
                <v-col>
                  <span class="text-subtitle-2 text-secondary"
                    >Spent 599 of 1500</span
                  >
                </v-col>
              </v-row>
              <v-col class="d-flex align-center">
                <v-progress-linear
                  prepend-icon="mdi-airplane"
                  bg-color="pink-lighten-3"
                  color="pink-lighten-1"
                  model-value="35"
                ></v-progress-linear>
                <br />
              </v-col>
            </v-list-item>
          </v-list>
          <span class="text-subtitle-1 mx-4 text-primary">Manage Budget</span>
        </v-card>
      </v-main>
    </v-layout>
  </v-sheet>

  <!-- ================================== Create or Update Transaction ============================= -->
  <v-dialog v-model="showTransactionModal" max-width="500" persistent>
    <v-card class="px-2 py-2">
      <v-card-title class="text-h6 text-pink-darken-3 text-center"
        >Add a Transaction</v-card-title
      >
      <v-card-subtitle
        class="text-subtitle-2 text-indigo-darken-1 text-center mb-2"
        >Use this form to create a transaction.</v-card-subtitle
      >
      <v-form @submit.prevent="createOrUpdateTransaction()">
        <v-select
          label="Select Transaction Type"
          v-model="form.transaction_type"
          :items="populate.transaction_type"
          variant="solo"
        ></v-select>
        <v-select
          v-if="form.transaction_type == 'Expense'"
          label="Select Expense Categories"
          :items="populate.exp_categories"
          item-title="category_name"
          item-value="id"
          v-model="form.exp_category"
          variant="solo"
        ></v-select>
        <v-select
          v-if="form.transaction_type == 'Income'"
          label="Select Income Type"
          :items="populate.income_categories"
          item-title="category_name"
          item-value="id"
          v-model="form.income_category"
          variant="solo"
        ></v-select>
        <v-select
          v-if="form.transaction_type == 'Loans & Advances'"
          label="Select Loans & Advances"
          :items="populate.loan_type"
          item-title="category_name"
          item-value="id"
          v-model="form.loan_type"
          variant="solo"
        ></v-select>
        <v-select
          v-if="form.transaction_type == 'Loans & Advances' && form.loan_type"
          label="Select Party"
          :items="populate.parties"
          item-title="party_name"
          item-value="id"
          v-model="form.party_id"
          variant="solo"
        ></v-select>
        <v-text-field
          v-if="
            form.transaction_type == 'Loans & Advances' &&
            form.party_name == '+ Add Party'
          "
          v-model="form.new_party_name"
          label="Add New Party"
          variant="outlined"
        ></v-text-field>
        <v-text-field
          v-model="form.amount"
          label="Amount"
          variant="outlined"
        ></v-text-field>
        <v-text-field
          v-model="form.description"
          label="Description"
          variant="outlined"
        ></v-text-field>
        <v-select
          label="Select Account"
          v-model="form.account"
          :items="populate.accounts"
          item-title="account_name"
          item-value="id"
          variant="solo"
        ></v-select>

        <v-row class="mx-2">
          <v-col cols="6">
            <v-btn type="submit" color="primary">Submit</v-btn>
          </v-col>
          <v-col cols="6" class="d-flex justify-end">
            <v-btn color="red-darken-4" @click="closeTransactionModal()"
              >Close</v-btn
            >
          </v-col>
        </v-row>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref, reactive, onMounted, watch } from "vue";
import axios from "axios";
// import { useForm } from "@inertiajs/vue3";

let drawer = ref(false);
let showTransactionModal = ref(false);
let transactions = ref({});

const items = [
  {
    title: "Dashboard",
    value: "Dashboard",
  },
  {
    title: "Transactions",
    value: "Transactions",
  },
  {
    title: "Loans & Advances",
    value: "Loans & Advances",
  },
  {
    title: "Bank Account",
    value: "Bank Account",
  },
  {
    title: "Budget",
    value: "Budget",
  },
];

const populate = reactive({
  transaction_type: ["Expense", "Income", "Loans & Advances"],
  exp_categories: [{}],
  income_categories: [{}],
  loan_type: [],
  parties: [{}],
  accounts: [],
  amount: 0,
  description: "",
});

const form = reactive({
  transaction_type: "",
  exp_category: "",
  income_category: "",
  loan_type: "",
  amount: 0,
  description: "",
  account: "",
  party_id: "",
  new_party_name: "",
});

const closeTransactionModal = () => {
  form.transaction_type = "";
  form.exp_category = "";
  form.income_category = "";
  form.loan_type = "";
  form.amount = 0;
  form.description = "";
  form.account = "";
  form.party_name = "";
  form.new_party_name = "";
  showTransactionModal.value = false;
};

watch(form, (newVal) => {
  console.log("Update Form: ", newVal);
});

const createOrUpdateTransaction = () => {
  axios
    .post("https://microfin.ritdos.com/api/store/transaction", form)
    .then((response) => {
      console.log(response);
      closeTransactionModal();
    })
    .catch((error) => {
      console.error(error);
    });
};

const fetchAPIs = () => {
  axios
    .get("https://microfin.ritdos.com/api/get/apis")
    .then((response) => {
      console.log(response);
      transactions.value = response.data.transactions;
      console.log("transactions: ", transactions);
      populate.exp_categories = response.data.expCat.map((c) => ({
        id: c.id,
        category_name: c.category_name,
      }));
      populate.income_categories = response.data.incomeCat.map((c) => ({
        id: c.id,
        category_name: c.category_name,
      }));
      populate.loan_type = response.data.loanCat.map((c) => ({
        id: c.id,
        category_name: c.category_name,
      }));
      populate.parties = response.data.parties.map((p) => ({
        id: p.id,
        party_name: p.name,
      }));
      populate.parties.push({ id: null, party_name: "+ Add Party" });
      populate.accounts = response.data.accounts.map((a) => ({
        id: a.id,
        account_name: a.account_name,
      }));
      console.log("Populated Data", populate.exp_categories);
    })
    .catch((error) => {
      console.error(error);
    });
};

fetchAPIs();
</script>

<style scoped>
.gradient-app-bar {
  background: linear-gradient(45deg, #ff6b6b, #f06595, #6a4c93);
}

.list-item-color {
  background-color: #fff9c4;
}

.speed-dialer {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1000; /* Ensures it's above other content */
}

.speed-dialer-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  background-color: #007bff; /* Blue background */
  color: white;
  border-radius: 50%;
  text-decoration: none;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  font-size: 24px; /* Adjust the icon size */
}

.speed-dialer-icon:hover {
  background-color: #0056b3; /* Darker blue on hover */
}
</style>
