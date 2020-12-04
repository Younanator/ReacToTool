import React, { useState, useEffect } from 'react';
import QrReader from 'react-qr-scanner'
import BarcodeReader from 'react-barcode-reader'
import BarcodeScannerComponent from '../components/BarcodeScanner';
import "../scss/Scanner.scss"

let items = []

export const Scanner = () => {

    
    const [ data, setData ] = useState('No Result Found');
    const [list,setList] = useState([])
    const [prevItem,setPrev] = useState('')
   
    
    useEffect(() => {
        if(data !== 'No Result Found'){
            console.log(data)
            
            if(data !== prevItem){
                items.push(data)
                setPrev(data)
            }
           
        }
    },[data])

    return (
        <div>
            <p>The scanner allows you to scan barcodes using the webcam</p>
        <div style={{display:'flex',flexDirection:'row'}}>
            <BarcodeScannerComponent
        width={500}
        height={500}
        onUpdate={(err, result) => {
            
          if (result){
            
            
            setData(result.text)
          } 
          else setData('No Result Found')
       
        }}
      />
      <div>
      <button  type="button" style={{marginTop:'70px'}} class="btn btn-primary">Register Items</button>
      {items.map((e,i) => {
          return (
          <p className="scannerItems" key={i}>{e}</p>
          )
      })}
      
      </div>
      
    </div>
    </div>
    )

    
}