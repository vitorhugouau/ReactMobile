declare module './veiculos_aula.json' {
  export interface Veiculo {
    model: string;
    brand: string;
    name: string;
  }

  const veiculos: Veiculo[];

  export default veiculos;
}
