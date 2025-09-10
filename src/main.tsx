import React from 'react'
import ReactDOM from 'react-dom/client'
import Demo from './demo'
import './styles.css'

const rootElement = document.getElementById('root')

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <React.StrictMode>
      <Demo />
    </React.StrictMode>
  )
} else {
  console.error('Root element not found')
}