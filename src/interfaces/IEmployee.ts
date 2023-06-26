import type { ICreator } from './ICreator';

export interface IEmployee {
  id?: number,
  nome?: string,
  sobrenome?: string,
  cargo: string,
  dataInicio?: string,
  ativo: boolean,
  criador: ICreator
}
