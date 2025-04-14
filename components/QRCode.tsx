import { QRCodeSVG } from 'qrcode.react';

interface QRCodeProps {
  value: string;
}

export const QRCode = (props: QRCodeProps) => {
  return (
    <div className="bg-white p-2 w-fit rounded-lg self-center">
      <QRCodeSVG size={200} value={props.value} />
    </div>
  );
};
