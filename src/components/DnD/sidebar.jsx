import React from 'react';

export default () => {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <aside>
      
      <div className="dndnode input" onDragStart={(event) => onDragStart(event, 'Elevatoria')} draggable>
        Elevatoria
      </div>
      <div className="dndnode" onDragStart={(event) => onDragStart(event, 'Booster')} draggable>
        Booster
      </div>
      <div className="dndnode output" onDragStart={(event) => onDragStart(event, 'Reservatorio')} draggable>
        Reservatorio
      </div>
    </aside>
  );
};
