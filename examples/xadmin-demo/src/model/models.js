import { Radios, Textarea } from 'xadmin-form/lib/components'

export default {
  User: {
    name: 'user',
    resource_name: 'users',
    type: 'object',
    icon: 'user', // fa-icon
    title: 'User',
    properties: {
      id: {
        type: 'number',
        title: 'User ID'
      },
      name: {
        type: 'string'
      },
      username: {
        type: 'string'
      },
      email: {
        type: 'string',
        format: 'email'
      },
      website: {
        type: 'string'
      },
      address: {
        type: 'object',
        properties: {
          street: { type: 'string' },
          suite: { type: 'string' }
        }
      }
    },
    permission: { view: true, add: true, edit: true, delete: true },
    form: [ 'id', 'name', 'email', 'address', 
      { key: 'website', component: Textarea, attrs: { rows: 5 } } ],
    filters: {
      nav: [ 'name', 'email' ],
      sidemenu: [ 'name' ]
    },
    search_fields: [ 'name', 'email' ],
    required: [ 'name', 'email', 'website' ],
    readonly: [ 'id' ],
    list_display: [ 'id', 'name', 'email', 'website', 'address.street' ]
  }
}
