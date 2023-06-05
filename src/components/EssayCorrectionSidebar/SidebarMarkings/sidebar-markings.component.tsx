import type { SidebarMarkingsProps } from "./sidebar-markings.types";
import EssayCorrectionContext from "@/contexts/EssayContext/essayContext";

import classNames from "classnames";
import { useContext, useState } from "react";

const SidebarMarkings = ({ children, className, ...props }: SidebarMarkingsProps) => {
  const cn = classNames("sidebar-markings", className);

  const { markings, setMarkings }: any = useContext(EssayCorrectionContext);
  const [open, setOpen] = useState(false);

  return (
    <div className={cn} {...props}>
      <div onClick={() => setOpen((prev) => !prev)}>MARKINGS</div>
      {open && (
        <>
          {markings.map((marking: any) => (
            <>
              <span>{marking.type}</span>
              <span>{marking.text}</span>
            </>
          ))}
        </>
      )}
      {children}
    </div>
  );
};

export default SidebarMarkings;
