import { QRCodeCanvas } from "qrcode.react";

const Qr = ({ shortUrl }) => {
  return (
    <div className="p-4 border rounded-md">
      <p className="text-sm mb-2">QR Code for:</p>
      <p className="text-blue-500 break-all mb-2">{shortUrl}</p>
      <QRCodeCanvas value={shortUrl} size={128} bgColor="#ffffff" fgColor="#000000" />
    </div>
  );
};

export default Qr;