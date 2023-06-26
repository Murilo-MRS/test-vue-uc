<template>
  <main class="flex flex-col items-center">
    <section v-if="!showEditForm" class="items-center rounded-md border-2 border-gray-300 p-4">
      <form @submit.prevent="() => handleCreateUser(newEmployee)" class="flex flex-col items-center">
        <span class="mb-4 font-bold text-lg">
          Cadastrar usuário
        </span>
        <div class="flex w-full">
          <div class="px-2 firstname">
            <input
              type="text"
              placeholder="Nome"
              v-model="newEmployee.nome"
              class="w-full rounded-md h-[30px] pl-3 bg-gray-100 focus:outline-indigo-600"
            />
          </div>
          <div class="px-2 secondname">
            <input
            type="text"
            placeholder="Sobrenome"
            v-model="newEmployee.sobrenome"
            class="w-full rounded-md h-[30px] pl-3 bg-gray-100 focus:outline-indigo-600"
            />
          </div>
        </div>
        <div class="flex w-full my-2 gap-2">
          <div class="px-2 container">
            <select
              v-model="newEmployee.cargo"
              class="w-full rounded-md h-[30px] pl-3 bg-gray-100 focus:outline-indigo-600"
            >
              <option value="DESENVOLVEDOR" selected>DESENVOLVEDOR</option>
              <option value="TECH_LEAD" >TECH LEAD</option>
            </select>
          </div>
          <div class="px-2 container">
            <input
              type="datetime-local"
              placeholder="Data de Início"
              v-model="newEmployee.dataInicio"
              class="w-full rounded-md h-[30px] pl-3 bg-gray-100 focus:outline-indigo-600"
            />
          </div>
          <div class="px-2 w-full">
            <button
              type="submit"
              class="container rounded bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700 disabled:bg-indigo-400"
              :disabled="isDisabled"
            >
              Criar
            </button>
          </div>
        </div>
      </form>
    </section>
    <section v-if="showEditForm" class="items-center rounded-md border-2 border-gray-300 p-4">
      <form @submit.prevent="() => handleEditUser(newEmployee)" class="flex flex-col items-center">
        <span class="mb-4 font-bold text-lg">
          Editar usuário com ID -> {{ newEmployee.id }}
        </span>
        <div class="flex w-full">
          <div class="px-2">
            <input
              type="text"
              placeholder="Nome"
              v-model="newEmployee.nome"
              class="w-full rounded-md h-[30px] pl-3 bg-gray-100 focus:outline-indigo-600"
            />
          </div>
          <div class="px-2">
            <input
            type="text"
            placeholder="Sobrenome"
            v-model="newEmployee.sobrenome"
            class="w-full rounded-md h-[30px] pl-3 bg-gray-100 focus:outline-indigo-600"
            />
          </div>
          <div class="px-2">
            <label class="flex flex-row gap-1 items-center w-full">
              Status:
              <input
              type="checkbox"
              placeholder="status"
              v-model="newEmployee.ativo"
              class="w-full rounded-md bg-gray-100 focus:outline-indigo-600"
              />
            </label>
          </div>
        </div>
        <div class="flex w-full my-2 gap-2">
          <div class="px-2 container">
            <select
              v-model="newEmployee.cargo"
              class="w-full rounded-md h-[30px] pl-3 bg-gray-100 focus:outline-indigo-600"
            >
              <option value="DESENVOLVEDOR" selected>DESENVOLVEDOR</option>
              <option value="TECH_LEAD" >TECH LEAD</option>
            </select>
          </div>
          <div class="px-2 container">
            <input
              type="datetime-local"
              placeholder="Data de Início"
              v-model="newEmployee.dataInicio"
              class="w-full rounded-md h-[30px] pl-3 bg-gray-100 focus:outline-indigo-600"
            />
          </div>
          <div class="px-2 w-full">
            <button
              type="submit"
              class="container rounded bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700 disabled:bg-indigo-400"
              :disabled="isDisabled"
            >
              Salvar
            </button>
          </div>
        </div>
      </form>
    </section>
    <TableList
      :toDelete="toDelete"
      :team="team"
      @confirm-delete='(id) => handleDeleteConfirmation(id)'
      @delete='() => handleDeleteUser()'
      @edit="(id) => handleShowEditForm(id)"
    />
  </main>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import api, { creatorId, creatorName } from '@/services/api';
import type { IEmployee } from '@/interfaces/IEmployee';
import TableList from '@/components/TableList.vue';

const team = ref<IEmployee[]>([]);

const toDelete = ref<boolean>(false);
const showEditForm = ref<boolean>(false);

const newEmployee = ref<IEmployee>({
  nome: '',
  sobrenome: '',
  cargo: 'DESENVOLVEDOR',
  dataInicio: '',
  ativo: true,
  criador: {
    id: creatorId,
    nome: creatorName
  },
});

const isDisabled = computed(() => {
  return newEmployee.value.nome && newEmployee.value.sobrenome && newEmployee.value.dataInicio ? false : true;
});

const fetchTeam = async () => {
  const { data } = await api.get(`/funcionario?criadorId=${creatorId}`);
  return data;
};

const handleShowEditForm = (user: IEmployee) => {
  showEditForm.value = !showEditForm.value;
  newEmployee.value.id = user.id;
};

const handleCreateUser = async (addEmployee: IEmployee) => {
  try {
    newEmployee.value = addEmployee;

    await api.post(`/funcionario?criadorId=${creatorId}`, newEmployee.value);

    newEmployee.value = {
      nome: '',
      sobrenome: '',
      cargo: 'DESENVOLVEDOR',
      dataInicio: '',
      ativo: true,
      criador: {
        id: creatorId,
        nome: creatorName
      },
    };

    team.value = await fetchTeam();
  } catch (error) {
    console.error(error);
  }
};

const handleEditUser = async (updatedUser: IEmployee) => {
  newEmployee.value = updatedUser;
  try {
    await api.put('/funcionario', newEmployee.value);
    team.value = await fetchTeam();
    newEmployee.value = {
      nome: '',
      sobrenome: '',
      cargo: 'DESENVOLVEDOR',
      dataInicio: '',
      ativo: true,
      criador: {
        id: creatorId,
        nome: creatorName
      },
    };
  } catch (error) {
    console.error(error);
  }
};

const handleDeleteUser = async () => {
  toDelete.value = true;
};

const handleDeleteConfirmation = async (id: string) => {
  try {
    await api.delete(`/funcionario/${id}?criadorId=${creatorId}`);
    team.value = await fetchTeam();
  } catch (error) {
    console.error(error);
  }
};
  
onMounted(async () => {
  team.value = await fetchTeam();
});

</script>