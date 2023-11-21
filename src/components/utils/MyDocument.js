// src/components/PdfPreview.js
import React, { useState, useCallback, useEffect, useRef } from "react";
import { Document, Page } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";
import "../css/MyDocument.css";

const pdfjs = require("pdfjs-dist");
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

const options = {
  cMapUrl: "/cmaps/",
  standardFontDataUrl: "/standard_fonts/",
};

const maxWidth = 800;

const useResizeObserver = (ref, onResize) => {
  useEffect(() => {
    const resizeObserver = new ResizeObserver(onResize);
    const currentRef = ref.current;

    if (currentRef) {
      resizeObserver.observe(currentRef);

      return () => {
        resizeObserver.unobserve(currentRef);
      };
    }
  }, [ref, onResize]);
};

export default function MyDocument({ fileName }) {
  const [file, setFile] = useState(fileName);
  const [numPages, setNumPages] = useState(null);
  const containerRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState(null);

  const onResize = useCallback((entries) => {
    const [entry] = entries;
    if (entry) {
      setContainerWidth(800);
    }
  }, []);

  useResizeObserver(containerRef, onResize);

  const onDocumentLoadSuccess = ({ numPages: nextNumPages }) => {
    setNumPages(nextNumPages);
  };

  return (
    <div ref={containerRef}>
      <Document
        file={file}
        onLoadSuccess={onDocumentLoadSuccess}
        options={options}
      >
        {Array.from(new Array(numPages), (el, index) => (
          <Page
            key={`page_${index + 1}`}
            pageNumber={index + 1}
            width={
              containerWidth ? Math.min(containerWidth, maxWidth) : maxWidth
            }
            scale={0.6}
          />
        ))}
      </Document>
    </div>
  );
}
