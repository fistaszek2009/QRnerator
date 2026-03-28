import { useEffect, useRef, useState } from "react";
import "./App.css";
import QRCodeStyling from "qr-code-styling";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Background from "./components/Background";
import WheelSelect from "./components/WheelSelect";
import RowSelect from "./components/RowSelect";

const typeOptions = ["URL", "Text", "Email", "Phone", "SMS", "vCard", "Wi-Fi"];

function App() {
  const [typeIndex, setTypeIndex] = useState(0);
  const [formatIndex, setFormatIndex] = useState(0);
  const codeRef = useRef<HTMLDivElement | null>(null);
  const qrCodeRef = useRef<QRCodeStyling | null>(null);

  useEffect(() => {
    if (!codeRef.current) {
      return;
    }

    qrCodeRef.current = new QRCodeStyling({
      data: "https://github.com/fistaszek2009",
      type: "svg",
      width: 300,
      height: 300,
      margin: 10,
      dotsOptions: {
        type: "square",
        roundSize: false,
        color: "#000000",
      },
      // backgroundOptions: {
      //   color: 'transparent',
      // },
    });

    qrCodeRef.current.append(codeRef.current);

    let frameId = 0;
    let lastSize = 0;

    const updateQrSize = (nextSize: number) => {
      const roundedSize = Math.max(1, Math.round(nextSize));

      if (!qrCodeRef.current || roundedSize === lastSize) {
        return;
      }

      lastSize = roundedSize;
      qrCodeRef.current.update({
        width: roundedSize,
        height: roundedSize,
      });
    };

    const observer = new ResizeObserver(([entry]) => {
      const box = entry.contentRect;
      const nextSize = Math.min(box.width, box.height);

      cancelAnimationFrame(frameId);
      frameId = requestAnimationFrame(() => updateQrSize(nextSize));
    });

    observer.observe(codeRef.current);
    updateQrSize(codeRef.current.getBoundingClientRect().width);

    return () => {
      cancelAnimationFrame(frameId);
      observer.disconnect();
      codeRef.current?.replaceChildren();
    };
  }, []);

  return (
    <>
      <main>
        <h1>QRnerator</h1>
        <WheelSelect
          options={typeOptions}
          selected={typeIndex}
          onSelectedChange={setTypeIndex}
        />
        <div id="data"></div>
        <aside>
          <div id="code" ref={codeRef}></div>
          <RowSelect
            options={["PNG", "JPG", "SVG", "RAW"]}
            selected={formatIndex}
            onSelectedChange={setFormatIndex}
          />
          <button id="download">
            Download <FontAwesomeIcon icon="arrow-down" bounce/>
          </button>
        </aside>
        <div id="shadow"></div>
      </main>
      <Background />
    </>
  );
}

export default App;
