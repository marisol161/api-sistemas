const { faker } = require('@faker-js/faker');
const boom = require('@hapi/boom')

class AmigosService {

  constructor(){
    this.amigos = [];
    this.generate();
  }

  generate() {
    const limit = 100;
    for (let index = 0; index < limit; index++) {
      this.amigos.push({
        id_amistad: faker.datatype.uuid(),
        id_amigo1: faker.name.firstName(),
        id_amigo2: faker.name.fullName(),
        fecha_amistad: faker.date.birthdate(),
        isBlock: faker.datatype.boolean(),
      });
    }
  }

  async create(data) {
    const newAmigo = {
      id_amistad: faker.datatype.uuid(),
      ...data
    }
    this.amigos.push(newAmigo);
    return newAmigo;
  }

  find() {
    // DEvolvemos una promesa con un tiempo de espera
    return new Promise((resolve, reject) => {
      setTimeout(() =>{
        resolve(this.amigos);
      }, 5000);
    })
  }

  async findOne(id_amistad) {
    const amigo = this.amigos.find(item => item.id_amistad === id_amistad);
    if(!amigo){
      throw boom.notFound('Amigo not found');
    }
    if ( amigo.isBlock){
      throw boom.conflict('Amigo is block');
    }
    return amigo;
  }

  async update(id_amistad, changes) {
    const index = this.amigos.findIndex(item => item.id_amistad === id_amistad);
    if (index === -1) {
      // De esta manera podemos lanzar el error
      throw boom.notFound('product not found');
    }
    const amigo = this.amigos[index];
    this.amigos[index] = {
      ...amigo,
      ...changes
    };
    return this.amigos[index];
  }


  async delete(id_amistad) {
    const index = this.amigos.findIndex(item => item.id_amistad === id_amistad);
    if (index === -1) {
      throw boom.notFound('product not found');
    }
    this.amigos.splice(index, 1);
    return { id_amisatd };
  }

}

module.exports = AmigosService;
