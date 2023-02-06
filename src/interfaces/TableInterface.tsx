export interface CellInterface {
  card: any,
  player: any,
  element: string | null
}

export interface RowInterface extends Array<CellInterface> {}

export default interface TableInterface extends Array<RowInterface> {}
