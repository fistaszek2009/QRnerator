import { useEffect, useRef, useState } from "react";
import "./styles/App.css";
import QRCodeStyling, { type FileExtension } from "qr-code-styling";
import qrcode from 'qrcode-generator';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Background from "./components/Background";
import WheelSelect from "./components/WheelSelect";
import RowSelect from "./components/RowSelect";
import DataForm from "./components/DataForm";
import StyleForm from "./components/StyleForm";
import type { QrType } from "./utils/types";
import IconForm from "./components/IconForm";

const typeOptions: QrType[] = ["URL", "Text", "Email", "Phone", "SMS", "vCard", "Wi-Fi"];
function App() {
  const [typeIndex, setTypeIndex] = useState(0);
  const [exportFormatIndex, setExportFormatIndex] = useState(0);
  const [exportSize, setExportSize] = useState(300);
  const [currentView, setCurrentView] = useState(0);
  const codeRef = useRef<HTMLDivElement | null>(null);
  const qrCodeRef = useRef<QRCodeStyling | null>(null);

  useEffect(() => {
    if (!codeRef.current) {
      return;
    }

    const baseSize = 1000;

    qrCodeRef.current = new QRCodeStyling({
      data: "https://github.com/fistaszek2009",
      type: "svg",
      width: baseSize,
      height: baseSize,
      margin: baseSize * (25 / 100) / 2,
      qrOptions: {
        typeNumber: 0,
      },
      imageOptions: {
        crossOrigin: "anonymous",
        imageSize: 0.4,
        margin: 5,
      },
      dotsOptions: {
        type: "square",
        roundSize: false,
        color: "#ffd84e",
      },
    });

    qrCodeRef.current.append(codeRef.current);

    // let frameId = 0;
    // let lastSize = 0;

    // const updateQrSize = (nextSize: number) => {
    //   const roundedSize = Math.max(1, Math.round(nextSize));

    //   if (!qrCodeRef.current || roundedSize === lastSize) {
    //     return;
    //   }

    //   lastSize = roundedSize;
    //   qrCodeRef.current.update({
    //     margin: roundedSize * (qrCodeRef.current._options.margin / qrCodeRef.current._options.width),
    //   });
    // };

    // const observer = new ResizeObserver(([entry]) => {
    //   const box = entry.contentRect;
    //   const nextSize = Math.min(box.width, box.height);

    //   cancelAnimationFrame(frameId);
    //   frameId = requestAnimationFrame(() => updateQrSize(nextSize));
    // });

    // observer.observe(codeRef.current);
    // updateQrSize(codeRef.current.getBoundingClientRect().width);

    return () => {
      //cancelAnimationFrame(frameId);
      //observer.disconnect();
      codeRef.current?.replaceChildren();
    };
  }, []);

  return (
    <>
      <h1 className='main-title'>QRnerator</h1>
      <main>
        <WheelSelect
          options={typeOptions}
          selected={typeIndex}
          onSelectedChange={setTypeIndex}
        />
        <div id="data">
          <RowSelect
            options={["Data","Style","Icon"]}
            selected={currentView}
            onSelectedChange={setCurrentView}
          />
          <DataForm visible={currentView === 0} typeOptions={typeOptions} typeIndex={typeIndex} codeData={qrCodeRef} setExportSize={setExportSize} />
          <StyleForm visible={currentView === 1} codeData={qrCodeRef}/>
          <IconForm visible={currentView === 2} codeData={qrCodeRef}/>
        </div>
        <aside>
          <div id="code" ref={codeRef}></div>
          <RowSelect
            options={["PNG", "JPEG", "SVG", "ARRAY"]}
            selected={exportFormatIndex}
            onSelectedChange={setExportFormatIndex}
            label="Download file type"
          />
          <button id="download" onClick={() => {
            if(exportFormatIndex === 3) {
              const qr = qrcode(qrCodeRef.current?._options.qrOptions.typeNumber || 0, qrCodeRef.current?._options.qrOptions.errorCorrectionLevel || "L");
              qr.addData(qrCodeRef.current?._options.data || "");
              qr.make();
            
              const count = qr.getModuleCount();
              const matrix = [];

              for(let r = 0; r < count; r++) {
                const row = [];
                for(let c = 0; c < count; c++) {
                  row.push(qr.isDark(r, c) ? 1 : 0);
                }
                matrix.push(row);
              }
            
              const csvContent = `data:text/csv;charset=utf-8,[\n${matrix
                .map((e) => '[ ' + e.join(", ") + ' ]')
                .join("\n")}\n]`;
              const encodedUri = encodeURI(csvContent);
              const link = document.createElement("a");
              link.download = "qr-code.txt";
              link.href = encodedUri;
              link.click()
              return;
            }
            const downloadCode = new QRCodeStyling(qrCodeRef.current?._options);
            downloadCode.update({width: exportSize, height: exportSize});
            downloadCode.update({ margin: exportSize * (qrCodeRef.current!._options.margin / qrCodeRef.current!._options.width) });

            const formats: FileExtension[] = ["png", "jpeg", "svg"];
            const format = formats[exportFormatIndex] ?? "png";

            downloadCode.download({ name: "qr-code", extension: format});
          }}>
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
