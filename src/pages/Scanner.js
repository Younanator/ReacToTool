import React, { useState, useEffect } from 'react';
import QrReader from 'react-qr-scanner'
import BarcodeReader from 'react-barcode-reader'
import BarcodeScannerComponent from '../components/BarcodeScanner';

let items = []

export const Scanner = () => {

    
    const [ data, setData ] = useState('No Result Found');
    const [list,setList] = useState([])
    const [prevItem,setPrev] = useState('')
   
    const updateItem = async (data) => {
        await setList(data)
    }

    useEffect(() => {
        if(data !== 'No Result Found'){
            console.log(data)
            setPrev(data)
            if(data !== prevItem){
                items.push(data)
            }
           
        }
    },[data])

    return (
        <div>
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
      {items.map((e,i) => {
          return (
          <p key={i}>{e}</p>
          )
      })}
      
        </div>
    )

    
}