export interface Arr {
   id: number;
   title: string;
   details: string;
   createdAt: string;
   due: string;
}

export interface UsersState {
   arr: Arr[];
   init: boolean;
}
