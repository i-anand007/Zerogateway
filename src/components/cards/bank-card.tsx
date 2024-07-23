import { ActionIcon, Input, Title, Tooltip } from 'rizzui';
import { forwardRef, useState } from 'react';
import { useCopyToClipboard } from '@/hooks/use-copy-to-clipboard';
import { PiChecksBold, PiFilesBold } from 'react-icons/pi';


interface BankCardProps {
  title?: string;
  data: any;
}

const BankCard: React.FC<BankCardProps> = ({ title, data }) => {
  
  const [isCopied, setIsCopied] = useState(false);
  const [state, copyToClipboard] = useCopyToClipboard();


  const handleCopyToClipboard = (data: string) => {
    copyToClipboard(data);
    setIsCopied(() => true);
    setTimeout(() => {
      setIsCopied(() => false);
    }, 3000);
  };


  return (
    <div className="items-center border rounded-lg shadow md:flex-row md:max-w-xl p-2 ">
    <div className="flex justify-between items-center">
      <h6>{title}</h6>
      <Input
        readOnly
        inputClassName="hover:border-muted"
        suffix={
          <Tooltip
            size="sm"
            content={isCopied ? 'Copied to Clipboard' : 'Click to Copy'}
            placement="top"
            className="z-[1000]"
          >
            <ActionIcon
              variant="text"
              title="Click to Copy"
              onClick={() => handleCopyToClipboard(data)}
              className="-mr-3"
            >
              {isCopied ? (
                <PiChecksBold className="h-[18px] w-[18px]" />
              ) : (
                <PiFilesBold className="h-4 w-4" />
              )}
            </ActionIcon>
          </Tooltip>
        }
        value={data}
      />
    </div>

  </div>
  );
}

export default BankCard;