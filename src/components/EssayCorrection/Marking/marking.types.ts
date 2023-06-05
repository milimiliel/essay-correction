import type { HTMLProps, PropsWithChildren } from "react";

interface MarkingProps extends PropsWithChildren<HTMLProps<HTMLDivElement>> {
  [key: string]: any;
}

export type { MarkingProps };
