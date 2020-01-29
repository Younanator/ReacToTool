import Tree from 'react-d3-tree';
import React, { useState, useEffect } from 'react';


export const TreeGraph = () => {

    return (
        <div id="treeWrapper" style={{width: '50em', height: '20em'}}>
 
        <Tree pathFunc="step" nodeSvgShape={svgSquare} data={myTreeData} />
 
      </div>
    )
}


function dfs(tree, value) {
    var stack = []
    
    stack.push(tree[0])
    
    while (stack.length !== 0) {
        for (let i = 0; i < stack.length; i++) {
            var node = stack.pop()
            
            if (node.value === value) {
                return node
            }
            if (node.right) {
                stack.push(tree[node.right])
            }
            if (node.left) {
                stack.push(tree[node.left])
            }
        }
    }
    return null
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
        name: 'Level 2: A',
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