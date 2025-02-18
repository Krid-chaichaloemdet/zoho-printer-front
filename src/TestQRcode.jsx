import { useEffect, useState } from "react";
const TestQRcode = () => {
  return (
    <div>
      <img
        src={
          `https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=` +
          `http://192.168.6.51:5174/images/1721790474115.jpg`
        }
        alt=""
      />
    </div>
  );
};

export default TestQRcode;
