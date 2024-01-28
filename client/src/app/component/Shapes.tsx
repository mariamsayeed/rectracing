import React from 'react';
import {
  ArrowIcon,
  RhombusIcon,
  EllipseIcon,
  ImageIcon,
  LineIcon,
  RectangleIcon,
  TextIcon,
} from '../icons';

const SHAPES = [
  { icon: ArrowIcon, value: 'Arrow' },
  { icon: LineIcon, value: 'Line' },
  { icon: EllipseIcon, value: 'Ellipse' },
  { icon: RectangleIcon, value: 'Rectangle' },
  { icon: RhombusIcon, value: 'Diamond' },
  { icon: TextIcon, value: 'Text' },
  { icon: ImageIcon, value: 'Image' },
  
];

const Shapes = () => {
    return (
      <div className="fixed inset-y-0 right-0 flex flex-col items-center justify-center space-y-6 bg-blue-500 w-64 m-0 pr-0">
        {SHAPES.map((shape, index) => (
          <div key={index} className="flex flex-col items-center space-y-2">
            <shape.icon className="text-xl text-transparent stroke-current hover:text-blue-700" />
          </div>
        ))}
      </div>
    );
  };
  
  export default Shapes;