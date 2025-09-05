console.log("Hello, World from PC!");


import { sumar } from './math.js';

console.log(sumar(2, 3));

import fileSystem from 'fs'; // Importa el módulo  nativo'fs' para trabajar con el sistema de archivos

fileSystem.writeFileSync(
    'archivo.txt', 
    'Hola, este es un archivo creado con Node.js',
    {
        encoding: 'utf-8'
    }
); // Crea un archivo llamado 'archivo.txt' con el contenido especificado

const stored_data = {
    name: 'Pau',
    age: 30,
    city: 'Buenos Aires'
}

fileSystem.writeFileSync(
    'data.json',
    JSON.stringify(stored_data, null, 2),   
    {
        encoding: 'utf-8'
    }
); // Crea un archivo JSON con los datos del objeto 'stored_data'


/* ----------------------------------------------------------------
Crear una lista de productos donde cada producto tenga precio nombre y id. 
Hacer 3 productos almenos
Guardar la lista de productos en un archivo llamado productos.json
*/

const products = [
    { id: 1, name: 'Producto 1', price: 100 },
    { id: 2, name: 'Producto 2', price: 200 },
    { id: 3, name: 'Producto 3', price: 300 }
];      

fileSystem.writeFileSync(
    'productos.json',
    JSON.stringify(products),
    {
        encoding: 'utf-8'
    }
); // Crea un archivo JSON con la lista de productos

const dataFromFile = fileSystem.readFileSync(
    'productos.json',
    {
        encoding: 'utf-8'
    }
); // Lee el contenido del archivo 'productos.json'

const productsFromFile = JSON.parse(dataFromFile); // Parsea el contenido JSON a un objeto de JavaScript

console.log(productsFromFile); // Muestra en consola la lista de productos leída desde el archivo

