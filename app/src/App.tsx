import { useEffect, useRef, useState } from 'react'
import './App.css'
import QRCodeStyling from "qr-code-styling";

import Background from './components/Background'
import WheelSelect from './components/WheelSelect'

const qrCode = new QRCodeStyling({width: 250, height: 250, data:'ala'});
const typeOptions = [ 'URL', 'Text', 'Email', 'Phone', 'SMS','vCard', 'Wi-Fi',];

function App() {

  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (ref.current) {
      qrCode.append(ref.current);
    }
  }, [])

  qrCode.getRawData("svg").then((buffer) => {
    console.log(buffer)
  });
 
  return (
    <>
        <main>
          <h1>QRnerator</h1>
          <WheelSelect options={typeOptions} />
          <div id='data'>
            
          </div>
          <aside>
            <div ref={ref}></div>
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
