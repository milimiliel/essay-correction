import type { SidebarOverviewProps } from "./sidebar-overview.types";
import { useContext, useState } from "react";
import essayContext from "@/contexts/EssayContext/essayContext";

import classNames from "classnames";

const SidebarOverview = ({ children, className, ...props }: SidebarOverviewProps) => {
  const cn = classNames("sidebar-overview", className);

  const { currentEssay }: any = useContext(essayContext);
  const [open, setOpen] = useState(false);

  return (
    <div className={cn} {...props}>
      <div onClick={() => setOpen((prev) => !prev)} id="overview-controller">
        INFO
      </div>
      {open && (
        <>
          <span>
            Tema:{" "}
            <a href={`https://www.mesalva.com/${currentEssay?.permalinkSlug}`} target="blank">
              {currentEssay?.itemName}
            </a>
          </span>
          <span>Nome estudante: {currentEssay?.user?.name}</span>
          <span>
            UID:{" "}
            <a
              href={`https://admin.mesalva.com/estudantes/${currentEssay?.user?.id}`}
              target="blank"
            >
              {currentEssay?.user?.id}
            </a>
          </span>
          <br />
          <span>
            <a href={currentEssay?.essay?.url} target="blank">
              Visualize a redação original
            </a>
          </span>
        </>
      )}
      {children}
    </div>
  );
};

export default SidebarOverview;
