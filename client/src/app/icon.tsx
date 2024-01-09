// Import the necessary icons
import { FaArrowRight, FaMinus, FaSquare, FaRegCircle, FaRegSquare, FaRegImage, FaTextWidth } from 'react-icons/fa';

// Define the icon components
const ArrowIcon = ({ className, onClick }: { className: string, onClick: () => void }) => <FaArrowRight className={className} onClick={onClick} />;
const RhombusIcon = ({ className, onClick }: { className: string, onClick: () => void }) => <FaSquare className={`${className} transform rotate-45`} onClick={onClick} />;
const EllipseIcon = ({ className, onClick }: { className: string, onClick: () => void }) => <FaRegCircle className={className} onClick={onClick} />;
const ImageIcon = ({ className, onClick }: { className: string, onClick: () => void }) => <FaRegImage className={className} onClick={onClick} />;
const LineIcon = ({ className, onClick }: { className: string, onClick: () => void }) => <FaMinus className={className} onClick={onClick} />;
const RectangleIcon = ({ className, onClick }: { className: string, onClick: () => void }) => <FaRegSquare className={className} onClick={onClick} />;
const TextIcon = ({ className, onClick }: { className: string, onClick: () => void }) => <FaTextWidth className={className} onClick={onClick} />;
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