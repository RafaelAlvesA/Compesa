import React, { useState } from 'react';

function Panel(props) {
  const [isExpanded, setIsExpanded] = useState(true);

  const togglePanel = () => {
    setIsExpanded(!isExpanded);
  };

  const panelStyle = {
    width: '10%',
    height: isExpanded ? '70%' : '10%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '8px',
    background: '#D9D9D9',
    boxShadow: 'rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px',
  };
z
  return (
    <div id={props.id} style={panelStyle} onClick={togglePanel}>
      {props.children}
    </div>
  );
}

export default Panel;
