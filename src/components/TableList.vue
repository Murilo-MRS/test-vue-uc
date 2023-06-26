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
        </tr>
      </thead>

      <template v-if="team.length > 0">
        <tbody class="divide-y divide-gray-200">
          <tr v-for="employee in team" :key="employee.id">
            <td class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
              {{ employee.id }}
            </td>
            <td class="whitespace-nowrap px-4 py-2 text-gray-700">{{ employee.nome }}</td>
            <td class="whitespace-nowrap px-4 py-2 text-gray-700">{{ employee.sobrenome }}</td>
            <td class="whitespace-nowrap px-4 py-2 text-gray-700">{{ employee.cargo }}</td>
            <td class="whitespace-nowrap px-4 py-2 text-gray-700">{{ new Date(employee.dataInicio as string).toLocaleDateString('pt-BR') }}</td>
            <td class="whitespace-nowrap px-4 py-2 text-gray-700">{{ employee.ativo ? 'Ativo' : 'Desativado'}}</td>
            <td class="whitespace-nowrap px-4 py-2 text-gray-700">{{ employee.criador.nome }}</td>
            <td class="flex whitespace-nowrap px-4 py-2 gap-1">
              <button
                class="inline-block rounded bg-red-600 px-4 py-2 text-xs font-medium text-white hover:bg-red-700"
                v-if="!toDelete"
                @click="handleRemove"
              >
              <TrashIcon class="h-fit w-6 text-white"/>
              </button>
              <div v-if="toDelete" class="flex gap-1">
                <button
                  class="inline-block rounded bg-red-600 px-4 py-2 text-xs font-medium text-white hover:bg-red-700"
                  @click="handleDeleteConfirmation(employee.id as number)"
                >
                  <CheckIcon class="h-fit w-6 text-white" />
                </button>
                <button
                  class="inline-block rounded bg-gray-100 text-red-600 px-4 py-2 text-xs font-medium hover:bg-gray-200"
                  @click="handleRemove"
                >
                  <XCircleIcon class="h-fit w-6" />
                </button>
              </div>
            </td>
            <td class="whitespace-nowrap px-4 py-2">
              <button
                class="inline-block rounded bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700"
                >
                <PencilSquareIcon class="h-fit w-6 text-red" />
              </button>
            </td>
          </tr>
        </tbody>
      </template>
    </table>
  </div>

</template>

<script setup lang="ts">
import type { IEmployee } from '@/interfaces/IEmployee';
import type { PropType } from 'vue';
import { TrashIcon, XCircleIcon, CheckIcon, PencilSquareIcon } from '@heroicons/vue/24/outline';

const emit = defineEmits(['delete', 'edit', 'confirm-delete']);

const handleDeleteConfirmation = (id: number) => {
  emit('confirm-delete', id);
};

const handleRemove = () => {
  emit('delete');
};

defineProps({
  team: {
    type: Array as PropType<IEmployee[]>,
    required: true,
  },
  toDelete: {
    type: Boolean as PropType<boolean>,
    required: false,
  }
});
</script>