export type SortOption =
  | 'az'
  | 'za'
  | 'lohi'
  | 'hilo';

export interface UserCredentials {
  username: string;
  password: string;
}

export interface CustomerInfo {
  firstName: string;
  lastName:  string;
  zipCode:   string;
}

export interface Product {
  name:  string;
  price: number;
}