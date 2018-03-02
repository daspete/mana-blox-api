'use strict'

const Schema = use('Schema')

class DataModelsSchema extends Schema {
    up() {
        this.create('data_models', (table) => {
            table.increments()

            table.string('model_name', 40).notNullable().unique()
            table.specificType('fields', 'json')
            table.specificType('relations', 'json')

            table.timestamps()
        })
    }

    down() {
        this.drop('data_models')
    }
}

module.exports = DataModelsSchema
