import React, { useRef, useEffect, useState, useImperativeHandle } from "react";
import html2canvas from "html2canvas";

const CardPreview = React.forwardRef(({ cardData }, ref) => {
  const canvasRef = useRef();
  const [canvasSize, setCanvasSize] = useState({ width: 500, height: 500 });

  const updateCanvasSize = () => {
    const containerWidth = Math.min(window.innerWidth * 0.8, 300);
    const aspectRatio = 1;
    setCanvasSize({
      width: containerWidth,
      height: containerWidth / aspectRatio,
    });
  };

  useEffect(() => {
    updateCanvasSize();
    window.addEventListener("resize", updateCanvasSize);
    return () => window.removeEventListener("resize", updateCanvasSize);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.src = cardData.template;

    img.onload = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      const scaleX = canvas.width / 500;
      const scaleY = canvas.height / 500;

      ctx.fillText(cardData.dear, 240 * scaleX, 170 * scaleY);

      const messageLines = cardData.message.match(/.{1,16}/g) || [];
      messageLines.forEach((line, index) => {
        ctx.fillText(line, 150 * scaleX, (210 + index * 40) * scaleY);
      });

      ctx.fillText(cardData.from, 220 * scaleX, 297 * scaleY);
    };
  }, [cardData, canvasSize]);

  useImperativeHandle(ref, () => ({
    triggerDownload: () => {
      html2canvas(canvasRef.current).then((canvas) => {
        const link = document.createElement("a");
        link.download = "greeting-card.png";
        link.href = canvas.toDataURL("image/png");
        link.click();
      });
    },
  }));

  return (
    <div className="flex flex-col items-center">
      <canvas
        ref={canvasRef}
        width={canvasSize.width}
        height={canvasSize.height}
        className="border rounded shadow"
      />
    </div>
  );
});

export default CardPreview;
