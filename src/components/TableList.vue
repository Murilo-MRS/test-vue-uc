<template>
  <div class="container mx-auto p-8 mt-8 overflow-auto overflow-y-hidden rounded-lg">
    <table class="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
      <thead class="ltr:text-left rtl:text-right">
        <tr>
          <th class="text-start whitespace-nowrap px-4 py-2 font-medium text-gray-900">
            Id
          </th>
          <th class="text-start whitespace-nowrap px-4 py-2 font-medium text-gray-900">
            Nome
          </th>
          <th class="text-start whitespace-nowrap px-4 py-2 font-medium text-gray-900">
            Sobrenome
          </th>
          <th class="text-start whitespace-nowrap px-4 py-2 font-medium text-gray-900">
            Cargo
          </th>
          <th class="text-start whitespace-nowrap px-4 py-2 font-medium text-gray-900">
            Data de início
          </th>
          <th class="text-start whitespace-nowrap px-4 py-2 font-medium text-gray-900">
            Status
          </th>
          <th class="text-start whitespace-nowrap px-4 py-2 font-medium text-gray-900">
            Criado por
          </th>
          <th class="px-4 py-2"></th>
        </tr>
      </thead>

      <tbody class="divide-y divide-gray-200">
        <tr v-for="employee in team" :key="employee.id">
          <td class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
            {{ employee.id }}
          </td>
          <td class="whitespace-nowrap px-4 py-2 text-gray-700">{{ employee.nome }}</td>
          <td class="whitespace-nowrap px-4 py-2 text-gray-700">{{ employee.sobrenome }}</td>
          <td class="whitespace-nowrap px-4 py-2 text-gray-700">{{ employee.cargo }}</td>
          <td class="whitespace-nowrap px-4 py-2 text-gray-700">{{ employee.dataInicio }}</td>
          <td class="whitespace-nowrap px-4 py-2 text-gray-700">{{ employee.ativo ? 'Sim' : 'Não'}}</td>
          <td class="whitespace-nowrap px-4 py-2 text-gray-700">{{ employee.criador }}</td>
          <td class="whitespace-nowrap px-4 py-2">
            <button
              class="inline-block rounded bg-red-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700"
            >
              Remover
            </button>
          </td>
          <td class="whitespace-nowrap px-4 py-2">
            <button
              class="inline-block rounded bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700"
            >
              Editar
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

</template>

<script setup lang="ts">
import type { IEmployee } from '@/interfaces/IEmployee';
import type { PropType } from 'vue';

defineProps({
  team: {
    type: Array as PropType<IEmployee[]>,
    required: true,
  },
});
</script>