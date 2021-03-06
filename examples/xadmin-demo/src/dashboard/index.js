import React from 'react'
import app from 'xadmin'
import dashboard, { Dashboard } from 'xadmin-dashboard'
import project from './project'

const live = {
  config: {
    router: 'hash'
  },
  routers: {
    '@' : {
      path: '/',
      component: ({ children }) => children,
      indexRoute: {
        onEnter: (_, replace) => replace({ pathname: '/show' })
      }
    },
    '/' : {
      path: 'show',
      component: (props) => <Dashboard {...props} editMode={false} />
    }
  }
}

if (process.env.NODE_ENV !== 'production') {
  const form = require('xadmin-form').default
  const editor = require('./editor').default
  app.use(form)
  app.use(editor)
}

app
.use(dashboard)
.use(live)
.use(project)

export default app
