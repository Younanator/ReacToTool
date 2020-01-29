import Tree from 'react-d3-tree';
import React, { useState, useEffect } from 'react';


export const TreeGraph = () => {

  
  const [tempNode,setTemp] = useState([{}])

  const  dfs = (tree, value) => {
    var stack = []
    
    stack.push(tree[0])
    
    while (stack.length !== 0) {
        for (let i = 0; i < stack.length; i++) {
            var node = stack.pop()

            console.log(node)
            
            if (node.name === value) {
              
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
      
        
        <div id="treeWrapper" style={{width: '80em', height: '80em'}}>
        <div style={{display:'flex',flexDirection:'row'}}>
        <Tree pathFunc="step" nodeSvgShape={svgSquare} data={ myTreeData} />
        <Tree pathFunc="step" nodeSvgShape={svgSquare} data={ tempNode} />
        </div>
        
        <p onClick = {() => dfs(myTreeData,"Monkey") }> Find Node</p>
        
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
    name: 'syd1dom01',
    attributes: {
      keyA: 'Lol',
      keyB: 'val B',
      keyC: 'val C',
    },
    children: [
      {
        name: 'Monkey',
        attributes: {
          item: 'val A',
          keyB: 'val B',
          keyC: 'val C',
        },
      },
      {
        name: 'Level 2: B',
      },
    ],
  },
  {
    name: 'syd1dom02',
    attributes: {
      keyA: 'Lol',
      keyB: 'val B',
      keyC: 'val C',
    }
  }
];