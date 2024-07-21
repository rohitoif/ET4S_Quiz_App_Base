import React from 'react';
import { useDrag } from 'react-dnd';

const Option = ({ option }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'option',
    item: { option: option.type === 'image' ? option.alt : option },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div ref={drag} className={`option ${isDragging ? 'dragging' : ''}`}>
      {option.type === 'image' ? (
        <img src={option.src} alt={option.alt} className="option-image" />
      ) : (
        option
      )}
    </div>
  );
};

export default Option;
