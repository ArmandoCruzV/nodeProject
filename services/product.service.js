const { faker } = require('@faker-js/faker');
const boom = require('@hapi/boom');

class ProductsService {
  constructor(){
    this.products = [];
    this.generate();
  }

  generate(){
    const limit = 100;

    for (let index = 0; index < limit; index++) {
      this.products.push({
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price(), 10),
        image: faker.image.imageUrl(),
        block: faker.datatype.boolean(),
      })
    }
  }

  async create(data){
    const newProduct = {
      id: faker.datatype.uuid(),
      ...data
    }
    this.products.push(newProduct);
    return newProduct;
  };

  find(){
    return new Promise((resolve, reject)=>{
      setTimeout(()=>{
        resolve(this.products);
      },3000)
    })
  };

  async findOne(id){
    const product = this.products.find(item => item.id === id );
    if(!product){
      throw boom.notFound('Product not found');
    }
    if (product.block){
      throw boom.conflict('The product is block');
    }
    return product;
  };

  async update(id,changes){
    const index = this.products.findIndex(item => item.id === id );

    if(index == -1){
      throw boom.notFound('Product not found');
    }
    else {
      this.products[index] = {
        ...this.products[index],
        ...changes
      }
    }
    return this.products[index];
  };

  async delete(id){
    const index = this.products.findIndex(item => item.id === id);
    const product = this.products[index];
    if (index == -1) {
      throw boom.notFound('Product not found');
    }
    else {
      this.products.splice(index,1)
    }
    return product;
  }
};

module.exports = ProductsService;
