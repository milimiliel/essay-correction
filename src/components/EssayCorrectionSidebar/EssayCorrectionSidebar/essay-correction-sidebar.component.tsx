import type { EssayCorrectionSidebarProps } from "./essay-correction-sidebar.types";
import { SidebarGrades } from "../SidebarGrades";
import { SidebarMarkings } from "../SidebarMarkings";
import { SidebarOverview } from "../SidebarOverview";
import { SidebarFeedback } from "../SidebarFeedback";

import classNames from "classnames";

const EssayCorrectionSidebar = ({ children, className, ...props }: EssayCorrectionSidebarProps) => {
  const cn = classNames("essay-correction-sidebar", className);
  return (
    <div className={cn} {...props}>
      <SidebarOverview />
      <SidebarMarkings />
      <SidebarGrades />
      <SidebarFeedback />
      {children}
    </div>
  );
};

export default EssayCorrectionSidebar;
