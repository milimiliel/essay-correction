import type { SidebarGradesProps } from "./sidebar-grades.types";
import EssayCorrectionContext from "@/contexts/EssayContext/essayContext";
import { useContext } from "react";

import classNames from "classnames";

type GradeItem = {
  name: string;
  value: number;
};

const SidebarGrades = ({ children, className, ...props }: SidebarGradesProps) => {
  const cn = classNames("sidebar-grades", className);

  const { currentEssay, selectedGrades, setSelectedGrades }: any =
    useContext(EssayCorrectionContext);

  function handleFormChange(e: any) {
    const clickedGradeItem = e.target.closest("form").elements[e.target.id];

    const updatedGrades = selectedGrades.map((criteria: any) => {
      const existingCriteriaName = Object.keys(criteria)[0];
      return existingCriteriaName === clickedGradeItem.name
        ? { [clickedGradeItem.name]: clickedGradeItem.value }
        : criteria;
    });

    if (
      !updatedGrades.some((criteria: any) => Object.keys(criteria)[0] === clickedGradeItem.name)
    ) {
      updatedGrades.push({ [clickedGradeItem.name]: clickedGradeItem.value });
    }

    setSelectedGrades(updatedGrades);
    console.log(selectedGrades);
  }

  return (
    <div className={cn} {...props}>
      <div>
        <form onChange={(e) => handleFormChange(e)}>
          {currentEssay?.correctionStyleCriteria.map((criterium: any) => (
            <div key={criterium.id}>
              <span className="criterium-name">{criterium.name}</span>

              <div className="radio-row">
                {criterium.correctionStyleCriteriumGrades.map((grade: any) => (
                  <div className="radio-button">
                    <input
                      type="radio"
                      id={`criterium-${criterium.id}-${grade.value}`}
                      name={`criterium-${criterium.id}`}
                      value={grade.value}
                      required
                    />
                    <label
                      htmlFor={`criterium-${criterium.id}-${grade.value}`}
                      className="radio-grade-label"
                    >
                      {grade.value}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </form>
      </div>
      {children}
    </div>
  );
};

export default SidebarGrades;
