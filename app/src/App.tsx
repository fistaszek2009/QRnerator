// import { useState } from 'react'
import './App.css'

import Background from './components/Background'

function App() {

  return (
    <>
        <main>
          <h1>QRnerator</h1>
          <nav>
            <select name="type" id="type">
              <option value="text">Text</option>
              <option value="url">URL</option>
              <option value="email">Email</option>
              <option value="phone">Phone</option>
              <option value="sms">SMS</option>
              <option value="wifi">Wi-Fi</option>
              <option value="vcard">vCard</option>
            </select>
          </nav>
          <div id='data'>
            <h2>Title</h2>
          </div>
          <aside>
            <canvas id='code' width='200' height='200'></canvas>
            <button id='download'>Download</button>
            <div>
              <label htmlFor='PNG'>
                PNG <input type='radio' name='format' id='PNG' value='png' defaultChecked/>
              </label>
              <label htmlFor='JPG'>
                JPG <input type='radio' name='format' id='JPG' value='jpg'/>
              </label>
              <label htmlFor='SVG'>
                SVG <input type='radio' name='format' id='SVG' value='svg'/>
              </label>
              <label htmlFor='RAW'>
                RAW <input type='radio' name='format' id='RAW' value='raw'/>
              </label>
            </div>
          </aside>
          <div id='shadow'></div>
        </main>
      <Background/>
    </>
  )
}

export default App
