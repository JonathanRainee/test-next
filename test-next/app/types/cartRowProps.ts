export interface CartRowProps{
  cartId: number;
  userId: number;
  date: string;
  openModal: (id:number) => void;
}