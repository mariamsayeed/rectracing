// Import the necessary icons
import { FaArrowRight, FaMinus, FaSquare, FaRegCircle, FaRegSquare, FaRegImage, FaTextWidth } from 'react-icons/fa';

// Define the icon components
const ArrowIcon = ({ className }: { className: string }) => <FaArrowRight className={className} />;
const RhombusIcon = ({ className }: { className: string }) => <FaSquare className={`${className} transform rotate-45`} />;
const EllipseIcon = ({ className }: { className: string }) => <FaRegCircle className={className}  />;
const ImageIcon = ({ className }: { className: string }) => <FaRegImage className={className}  />;
const LineIcon = ({ className }: { className: string }) => <FaMinus className={className}  />;
const RectangleIcon = ({ className }: { className: string }) => <FaRegSquare className={className}  />;
const TextIcon = ({ className }: { className: string }) => <FaTextWidth className={className}  />;

// Export the icon components
export {
  ArrowIcon,
  RhombusIcon,
  EllipseIcon,
  ImageIcon,
  LineIcon,
  RectangleIcon,
  TextIcon,
};