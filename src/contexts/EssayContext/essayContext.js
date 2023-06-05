import { createContext, useState } from "react";
import { useEffect } from "react";
import { getEssay, updateEssay } from "@/requests/essays.request";

const EssayCorrectionContext = createContext({});

export const EssayCorrectionProvider = ({ children }) => {
  const [markingDialogType, setMarkingDialogType] = useState(null);
  const [markings, setMarkings] = useState([]);

  const [currentMarking, setCurrentMarking] = useState({
    coordinate: {},
    text: "",
    type: "",
  });

  const [selectedCoordinate, setSelectedCoordinate] = useState(null);
  const [selectedGrades, setSelectedGrades] = useState([]);
  const [currentEssay, setCurrentEssay] = useState();

  useEffect(() => {
    getEssay("I2YcZyQMHsCglmg-RD38Vw").then((result) => {
      setCurrentEssay(result);

      if (result.essayMarks) {
        const typeMapping = {
          ortografia: "Ortografia",
          semantica: "Semântica",
          regencia: "Regência",
          concordancia: "Concordância",
          pontuacao: "Pontuação",
          diverso: "Diversos",
        };

        const updatedMarkings = result.essayMarks.map((mark) => {
          const { description, markType, coordinate, id } = mark;
          const type = typeMapping[markType];

          return {
            coordinate,
            text: description,
            type,
            id: parseInt(id),
          };
        });
        setMarkings(updatedMarkings);
      }
    });
  }, []);

  // useEffect(() => {
  //   if (currentEssay && currentEssay.correctionStyleCriteria) {
  //     setSelectedGrades([
  //       ...selectedGrades,
  //       currentEssay.correctionStyleCriteria.map((criterium) => ({
  //         name: `criterium-${criterium.id}`,
  //         value: 0,
  //       })),
  //     ]);
  //   }
  // }, [currentEssay]);

  return (
    <EssayCorrectionContext.Provider
      value={{
        markingDialogType,
        setMarkingDialogType,
        markings,
        setMarkings,
        currentMarking,
        setCurrentMarking,
        currentEssay,
        setCurrentEssay,
        selectedCoordinate,
        setSelectedCoordinate,
        selectedGrades,
        setSelectedGrades,
      }}
    >
      {children}
    </EssayCorrectionContext.Provider>
  );
};

export default EssayCorrectionContext;
