import Tree from 'react-d3-tree';
import React, { useState, useEffect } from 'react';


export const TreeGraph = () => {

  
  const [tempNode,setTemp] = useState([{}])
  const [search,setSearch] = useState('')

  const  dfs = (tree) => {
    var stack = []
    
    stack.push(tree[0])
    
    while (stack.length !== 0) {
        for (let i = 0; i < stack.length; i++) {
            var node = stack.pop()

            console.log(node)
            
            if (node.name === search) {
              
                setTemp(node)
            }

            if (node.children) {
                stack.push(...node.children)
            }
        }
    }
    return null
}

useEffect(() => {
  
},[tempNode])

    return (
      
        
        <div id="treeWrapper" style={{width: '40em', height: '40em'}}>

<div className="rowFlex">
             <input onChange={(e) => setSearch(e.target.value)}></input>
             <p onClick = {() => dfs(myTreeData) }> Find Node</p>
        </div>
        
        <div className="rowFlex">


        <div style={{width:'800px',height:'400px'}}>
       <Tree pathFunc="step" orientation="vertical" nodeSvgShape={svgSquare} data={ myTreeData} />
       </div>
       
       <div style={{width:'800px',height:'400px'}}>
        <Tree pathFunc="step" orientation="vertical" nodeSvgShape={svgSquare} data={ tempNode} />
        </div>
        </div>
        
      </div>
      
    )
}





const svgSquare = {
    shape: 'rect',
    shapeProps: {
      width: 20,
      height: 20,
      x: -10,
      y: -10,
    }
  }
  
const myTreeData = [
  {
    name: 'syd1inf01',
    attributes: {
      keyA: 'Lol',
      keyB: 'val B',
      keyC: 'val C',
    },
    children: [
      {
        name: 'syd1dom01',
        attributes: {
          item: 'val A',
          keyB: 'val B',
          keyC: 'val C',
        },
        children:[
          {
            name: 'David',
        attributes: {
          item: 'val A',
          keyB: 'val B',
          keyC: 'val C',
        },
          }
        ]
      },
      {
        name: 'One',
      },
    ],
  },
];