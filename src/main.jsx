import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter as Router } from 'react-router-dom'
import { ChakraProvider } from '@chakra-ui/react'
import { AuthProviderWrapper } from './context/auth.context.jsx'

import { UserProviderWrapper } from './context/user.context.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <AuthProviderWrapper>
        <UserProviderWrapper>
        <ChakraProvider>
          <App />
        </ChakraProvider>
        </UserProviderWrapper>
      </AuthProviderWrapper>
    </Router>
  </React.StrictMode>,
)
