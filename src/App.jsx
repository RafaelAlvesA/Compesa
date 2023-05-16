import React, { useState, useEffect,useRef, useCallback } from 'react';
import ReactFlow, { ReactFlowProvider, Panel, Background, Controls, useNodesState, useEdgesState, addEdge } from 'reactflow';
import 'reactflow/dist/style.css';

import './style.css';
import Sidebar from './components/DnD/sidebar.jsx';
import './index.css'

//Nodes, Edges

const connectionLineStyle = { stroke: '#204499' };

const initialNodes = [
  { id: 'A', position: { x: 10, y: 0 }, type: 'group', style: { width: 170, height: 140 }, },
  { id: '1', position: { x: 10, y: 30 }, parentNode: 'A', extent: 'parent', data: { label: 'Reservatorio' } },
  { id: '1A', position: { x: 10, y: 80 }, parentNode: 'A', extent: 'parent', data: { label: 'Dados do Reservatorio' } },
  { id: '2', position: { x: 350, y: 30 },type:'Booster', data: { label: 'Elevatoria' } },
  { id: '3', position: { x: 700, y: 30 }, data: { label: 'balblaa' } },

];

const initialEdges = [
  { id: 'e1-2', source: '1', target: '2' },
  { id: 'e2-3', source: '2', target: '3', animated: true },
];

let id = 0;
const getId = () => `dndnode_${id++}`;

const DnDFlow = () => {
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);


  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const type = event.dataTransfer.getData('application/reactflow');

      // check if the dropped element is valid
      if (typeof type === 'undefined' || !type) {
        return;
      }

      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });
      const newNode = {
        id: getId(),
        type,
        position,
        data: { label: `${type} node` },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance]
  )


  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), []);
  return (

    <div className="dndflow" >
      <ReactFlowProvider>
        <div className="reactflow-wrapper" ref={reactFlowWrapper} style={{ width: '100vw', height: '100vh' }}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            connectionLineStyle={connectionLineStyle}
            onInit={setReactFlowInstance}
            onDrop={onDrop}
            onDragOver={onDragOver}
            fitView
          >


            <Panel id="nav_related" position="bottom-center">
              <div id="related">
                <div id="box" class="active">
                  <p>Eta Alto do ceu</p>
                </div>
                <div id="box">
                  <p><a href="/teste">Sinotico 1</a></p>
                </div>
                <div id="box">
                  <p><a href="/teste">Sinotico 2</a></p>
                </div>
                <div id="box">
                  <p><a href="/teste">Sinotico 3</a></p>
                </div>
                <div id="box">
                  <p><a href="/teste">Sinotico 4</a></p>
                </div>
              </div>

            </Panel>

            <Background />
            <Controls />
          </ReactFlow>
        </div>
          <Sidebar />
      </ReactFlowProvider>
    </div>
  );
}

export default DnDFlow