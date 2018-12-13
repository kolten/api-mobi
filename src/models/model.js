const { Model } = require('objection');
const config = require('../../db/knex');
const { snakeCase, mapKeys, camelCase } = require('lodash');

Model.knex(config);

class BaseModel extends Model {
   $beforeValidate(jsonSchema, json, opt){
    return jsonSchema
  }

  $beforeUpdate(){
    this.updated_at = new Date().toUTCString();
  }

  $formatDatabaseJson(json) {
    return mapKeys(json, (v, k) => snakeCase(k));
  }

  $parseDatabaseJson(json) {
    return mapKeys(json, (v, k) => camelCase(k));
  }
}

module.exports = BaseModel