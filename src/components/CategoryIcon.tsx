import React from 'react';
import {
  Utensils,
  ShoppingBag,
  Home,
  Zap,
  Bus,
  Car,
  Tag,
  Film,
  HeartPulse,
  BookOpen,
  CircleDot,
  Briefcase,
  Laptop,
  Coins,
  Gift,
  ArrowDownLeft,
  type LucideProps,
} from 'lucide-react';

interface CategoryIconProps extends LucideProps {
  iconName: string;
}

export const CategoryIcon: React.FC<CategoryIconProps> = ({ iconName, ...props }) => {
  switch (iconName) {
    case 'Utensils':
      return <Utensils {...props} />;
    case 'ShoppingBag':
      return <ShoppingBag {...props} />;
    case 'Home':
      return <Home {...props} />;
    case 'Zap':
      return <Zap {...props} />;
    case 'Bus':
      return <Bus {...props} />;
    case 'Car':
      return <Car {...props} />;
    case 'Tag':
      return <Tag {...props} />;
    case 'Film':
      return <Film {...props} />;
    case 'HeartPulse':
      return <HeartPulse {...props} />;
    case 'BookOpen':
      return <BookOpen {...props} />;
    case 'Briefcase':
      return <Briefcase {...props} />;
    case 'Laptop':
      return <Laptop {...props} />;
    case 'Coins':
      return <Coins {...props} />;
    case 'Gift':
      return <Gift {...props} />;
    case 'ArrowDownLeft':
      return <ArrowDownLeft {...props} />;
    default:
      return <CircleDot {...props} />;
  }
};
