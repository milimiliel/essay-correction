import type { HTMLProps, PropsWithChildren } from "react";

interface ImageMaskProps extends PropsWithChildren<HTMLProps<HTMLDivElement>> {
  [key: string]: any;
}

export type { ImageMaskProps };
