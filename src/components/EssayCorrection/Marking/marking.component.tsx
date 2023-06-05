import { useContext } from "react";
import type { MarkingProps } from "./marking.types";
import essayContext from "@/contexts/EssayContext/essayContext";
import classNames from "classnames";

const Marking = ({ className, marking }: MarkingProps) => {
  const { setCurrentMarking, setMarkingDialogType, setSelectedCoordinate, markings, setMarkings } =
    useContext<any>(essayContext);
  const cn = classNames("marking", className);

  function handleEditButtonClick(e: any) {
    e.stopPropagation();

    setCurrentMarking(marking);
    setMarkingDialogType("edit");
    setSelectedCoordinate({ x, y });
  }

  function handleMarkingDelete(e: any, marking: any) {
    e.stopPropagation();
    const revisedMarkings = markings.filter((item: any) => item.id !== marking.id);
    setMarkings(revisedMarkings);
  }

  function handleMarkingClick(e: any) {
    e.stopPropagation();
  }
  const x = marking.coordinate.x;
  const y = marking.coordinate.y;

  const adjustedMarkingSize = "1.75em";

  return (
    <div
      className={cn}
      style={{
        left: `calc(${x}% - ${adjustedMarkingSize})`,
        top: `calc(${y}% - ${adjustedMarkingSize})`,
        userSelect: "none",
      }}
      onClick={(e) => handleMarkingClick(e)}
    >
      <div className={`marking-bubble ${marking.type}`}>
        <span>{marking.type[0]}1</span>
        <div id="marking-edit-button" onClick={handleEditButtonClick}></div>
        <div id="marking-delete-button" onClick={(e) => handleMarkingDelete(e, marking)}></div>
      </div>
    </div>
  );
};

export default Marking;
