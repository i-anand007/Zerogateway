import { Text, AvatarProps } from 'rizzui';
import cn from '@/utils/class-names';

interface CompanyCardProps {
  name: string;
  className?: string;
  description?: string;
}

export default function CompanyCard({
  name,
  className,
  description,
}: CompanyCardProps) {
  return (
    <>
        <Text >
          {name}
        </Text>
          <Text className="text-[13px] text-gray-500">{description}
          </Text>
          </>
  );
}
