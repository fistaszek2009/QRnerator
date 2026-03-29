import React from 'react'

export default function DataForm(props: {typeOptions: string[], typeIndex: number, codeData: {data: string}}) {
  return (
    <>
        <h2>{props.typeOptions[props.typeIndex]} QR code data</h2>
        { props.typeOptions[props.typeIndex] === "URL" ? <input type="url" placeholder='Type your URL here...' value={props.codeData.data} onChange={e => props.codeData.data = e.target.value} /> : null }
        { props.typeOptions[props.typeIndex] === "Text" ? <textarea placeholder='Type your text here...' value={props.codeData.data} onChange={e => props.codeData.data = e.target.value} /> : null }
        { props.typeOptions[props.typeIndex] === "Email" ? 
        <>
        <input type="email" placeholder='Type your email here...' value={props.codeData.data} onChange={e => props.codeData.data = e.target.value} /> 
        
        <br/><label>Email Title (optional):</label>
        <br/><input type="text" placeholder='Email title...' value={props.codeData.data} onChange={e => props.codeData.data = e.target.value} /> 

        <br/><label>Email Message (optional):</label>
        <br/><textarea placeholder='Email content...' value={props.codeData.data} onChange={e => props.codeData.data = e.target.value} />
        </>
        : null 
        }
        { props.typeOptions[props.typeIndex] === "Phone" ? <input type="tel" placeholder='Type your phone number here...' value={props.codeData.data} onChange={e => props.codeData.data = e.target.value} /> : null }
        { props.typeOptions[props.typeIndex] === "SMS" ? 
        <>
            <input type="tel" placeholder='Type your phone number here...' value={props.codeData.data} onChange={e => props.codeData.data = e.target.value} /> 

            <br/><label>SMS content (optional):</label>
            <br/><input type="text" placeholder='SMS content...' value={props.codeData.data} onChange={e => props.codeData.data = e.target.value} /> 
        </>
        : null 
         }
        { props.typeOptions[props.typeIndex] === "vCard" ? 
        <>
             <br/><label>First and Last Name:</label>
            <br/><input type="text" placeholder='First and last name...' value={props.codeData.data} onChange={e => props.codeData.data = e.target.value} /> 

             <br/><label>Company/Job title:</label>
            <br/><input type="text" placeholder='Company or job title...' value={props.codeData.data} onChange={e => props.codeData.data = e.target.value} />

             <br/><label>Phone number:</label>
            <br/><input type="tel" placeholder='Phone number...' value={props.codeData.data} onChange={e => props.codeData.data = e.target.value} /> 

             <br/><label>Email:</label>
            <br/><input type="email" placeholder='Email...' value={props.codeData.data} onChange={e => props.codeData.data = e.target.value} />

             <br/><label>Website (optional):</label>
            <br/><input type="url" placeholder='Website...' value={props.codeData.data} onChange={e => props.codeData.data = e.target.value} /> 

        </>
        : null }
        { props.typeOptions[props.typeIndex] === "Wi-Fi" ? 
        <>
            <br/><label>Network Name (SSID):</label>
            <br/><input type="text" placeholder='Network name...' value={props.codeData.data} onChange={e => props.codeData.data = e.target.value} /> 

            <br/><label>Password:</label>
            <br/><input type="text" placeholder='Password...' value={props.codeData.data} onChange={e => props.codeData.data = e.target.value} />

            <br/><label>Encryption:</label>
            <br/><select value={props.codeData.data} onChange={e => props.codeData.data = e.target.value}>
                <option value="WPA">WPA/WPA2</option>
                <option value="WEP">WEP</option>
                <option value="nopass">No Password</option>
            </select>

            <br/><label>Hidden Network:</label>
            <br/><input type="checkbox" checked={props.codeData.data === "true"} onChange={e => props.codeData.data = e.target.checked ? "true" : "false"} />



        </>
        : null }

        <br/><label>Image Margin:</label>
        <br/><input type='range' min={0} max={1000} defaultValue={300} />

        <br/><label>Export Size:</label>
        <br/><input type='range' min={100} max={1000} defaultValue={300} />

        <br/><label>Middle Icon:</label>
        <br/><input type='file' accept='image/*' />

    </>
  )
}
