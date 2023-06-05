import type { ImageMaskProps } from "./image-mask.types";
import React, { useEffect, useRef, useContext } from "react";
import { Marking } from "../Marking";
import { MarkingDialog } from "../MarkingDialog";
import EssayCorrectionContext from "@/contexts/EssayContext/essayContext";
import classNames from "classnames";

const ImageMask = ({ children, className, ...props }: ImageMaskProps) => {
  const cn = classNames("image-mask", className);

  const {
    markingDialogType,
    setMarkingDialogType,
    markings,
    currentEssay,
    selectedCoordinate,
    setSelectedCoordinate,
  }: any = useContext(EssayCorrectionContext);

  const imageMaskRef = useRef<HTMLDivElement>(null);

  function handleClick(e: React.MouseEvent<HTMLDivElement>) {
    const { clientX, clientY } = e;
    const boundingClientRect: any = imageMaskRef.current?.getBoundingClientRect();
    const top = boundingClientRect?.top ?? 0;
    const left = boundingClientRect?.left ?? 0;
    const imageMaskRefWidth = imageMaskRef.current?.offsetWidth ?? 0;
    const imageMaskRefHeight = imageMaskRef.current?.offsetHeight ?? 0;

    const coordinate = {
      x: (100 * (clientX - left)) / imageMaskRefWidth,
      y: (100 * (clientY - top)) / imageMaskRefHeight,
    };
    setSelectedCoordinate(coordinate);

    if (markingDialogType) setMarkingDialogType(null);
    else setMarkingDialogType("create");
  }

  const essayImage = "https://cdn." + currentEssay?.essay?.url.split("https://cdnqa.")[1];
  //TODO: tentei usar o {currentEssay?.essay?.url} como src, mas a imagem não carregou por ser de cdnqa

  return (
    <>
      <div className={cn} onClick={handleClick} ref={imageMaskRef} {...props}>
        {markingDialogType && (
          //TODO: coordinate aqui precisa usar a selectecCoordinate OU pegar o que já tá no marking sendo clicado
          <MarkingDialog coordinate={selectedCoordinate} type={markingDialogType} />
        )}
        <img id="essay-image" src={essayImage} />
        {markings.map((marking: any) => (
          <Marking marking={marking} key={marking.id} />
        ))}
        {children}
      </div>
    </>
  );
};

export default ImageMask;
