import { ImageMask } from "../ImageMask";
import type { EssayCorrectionHubProps } from "./essay-correction-hub.types";
import { EssayCorrectionSidebar } from "@/components/specifics/EssayCorrectionSidebar/EssayCorrectionSidebar";

import classNames from "classnames";

const EssayCorrectionHub = ({ children, className, ...props }: EssayCorrectionHubProps) => {
  const cn = classNames("essay-correction-hub", className);
  return (
    <div className={cn} {...props}>
      <ImageMask />
      <EssayCorrectionSidebar />
      {children}
    </div>
  );
};

export default EssayCorrectionHub;
