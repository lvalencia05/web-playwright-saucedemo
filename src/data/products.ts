import { CustomerInfo } from '../types';

export const CUSTOMER_INFO: CustomerInfo = {
  firstName: 'Juan',
  lastName:  'Perez',
  zipCode:   '110111',
};

export const PRODUCTS = {
  backpack:    'Sauce Labs Backpack',
  bikeLight:   'Sauce Labs Bike Light',
  boltTShirt:  'Sauce Labs Bolt T-Shirt',
  fleeceJacket:'Sauce Labs Fleece Jacket',
} as const;
