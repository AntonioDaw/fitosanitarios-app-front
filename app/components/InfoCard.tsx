import React from 'react';
import { FaClock } from 'react-icons/fa';
import Image from 'next/image';
interface InfoCardProps {
  title: string;
  image_url: string;
  bgColor?: string;
  className?: string;
}

const InfoCard: React.FC<InfoCardProps> = ({
  title,
  image_url,
  bgColor = 'bg-slate-700',
  className = '',
}) => {
  return (
    <div className={`rounded-xl ${bgColor} p-4 shadow-sm ${className}`}>
      <div className="flex items-center gap-2 text-white text-sm font-medium">
        <FaClock />
        <span>{title}</span>
      </div>
      <div className="mt-4 rounded-xl bg-white p-6 text-center">
        <Image
  src={image_url}
  alt={title}
  width={64} // ancho de 64 píxeles
  height={64} // alto de 64 píxeles
  className="mx-auto object-contain"
/>
      </div>
    </div>
  );
};

export default InfoCard;