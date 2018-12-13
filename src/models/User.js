const BaseModel = require('./model');
const Reset = require('./Reset');
const Invoice = require('./Invoice');

class User extends BaseModel {
  static get tableName(){
    return 'users';
  }

  static get idColumn(){
    return 'id';
  }

  static get fullName(){
    return `${this.firstName} ${this.lastName}`
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['firstName', 'lastName', 'studentId', 'email'],

      properties: {
        id: {type: 'integer'},
        firstName: {type: 'string', minLength: 1, maxLength: 255},
        lastName: {type: 'string', minLength: 1, maxLength: 255},
        studentId: {type: 'string'},
        email: {type: 'string', maxLength: 50},
        stripeId: {type: 'string'},
        isAdmin: {type: 'boolean'},
        member: {type: 'boolean'}
      }
    }
  }

  static get relationMappings(){
    return {
      resets : {
        relation: Model.HasManyRelation,
        modelClass: Reset,
        join: {
          from: 'password_resets.user_id',
          to: 'users.id'
        }
      },
      invoices : {
        relation: Model.HasManyRelation,
        modelClass: Invoice,
        join: {
          from: 'invoices.users_id',
          to: 'users.id'
        }
      }
    }
  }
}

module.exports = User