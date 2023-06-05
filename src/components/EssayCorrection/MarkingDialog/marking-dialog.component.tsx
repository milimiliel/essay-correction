import type { MarkingDialogProps } from "./marking-dialog.types";
import React, { useContext, useState } from "react";
import classNames from "classnames";
import EssayCorrectionContext from "@/contexts/EssayContext/essayContext";

const MarkingDialog = ({ children, className, coordinate, type, ...props }: MarkingDialogProps) => {
  const cn = classNames("marking-dialog", className);
  const {
    setMarkingDialogType,
    markingDialogType,
    markings,
    setMarkings,
    currentMarking,
    setCurrentMarking,
  }: any = useContext(EssayCorrectionContext);
  const { x, y } = coordinate;
  const [isDropdownDisplayed, setIsDropdownDisplayed] = useState(false);
  const [selectedType, setSelectedType] = useState("");

  const markingTypes = [
    "Ortografia",
    "Regência",
    "Pontuação",
    "Semântica",
    "Concordância",
    "Paralelismo",
    "Sintaxe",
    "Diversos",
  ];

  /*const markingTypes2 = {
    o: {
      name: "Ortografia",
      color: "rgba(223, 67, 10, 0.548)",
    },
    p: {
      name: "Pontuação",
      color: "rgba(8, 8, 110, 0.548)",
    },
    c: {
      name: "Concordância",
      color: "rgb(121, 6, 121, 0.548)",
    },
    d: {
      name: "Diversos",
      color: "rgb(230, 14, 14, 0.548)",
    },
    r: {
      name: "Regência",
      color: "rgb(228, 228, 15, 0.548)",
    },
    s: {
      name: "Semântica",
      color: "rgb(6, 116, 6, 0.548)",
    },
    pr: {
      name: "Paralelismo",
      color: "rgb(156, 42, 42, 0.548)",
    },
    si: {
      name: "Sintaxe",
      color: "rgba(0, 255, 255, 0.548)",
    },
  };
  */
  //TODO: separar cada grupo de marcações em arrays diferentes
  //TODO: fazer o dialog respeitar os limites da tela

  function handleMarkingSave() {
    if (markingDialogType === "create") {
      setMarkings((prev: any) => {
        return [
          ...prev,
          {
            ...currentMarking,
            coordinate: coordinate,
            id: Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000,
          },
        ];
      });
    } else if (markingDialogType === "edit") {
      const markingIndex = markings.findIndex((marking: any) => marking.id === currentMarking.id);

      if (markingIndex !== -1) {
        setMarkings((prevMarkings: any) => {
          const updatedMarkings = [...prevMarkings];
          updatedMarkings[markingIndex] = {
            ...currentMarking,
            coordinate: coordinate,
          };
          return updatedMarkings;
        });
      }
    }
    handleDialogClose();
  }

  function handleDialogClose() {
    setMarkingDialogType(null);
    setCurrentMarking({
      coordinate: {},
      text: "",
      type: "",
    });
  }

  function handleTypeSelection(type: string) {
    setCurrentMarking((prevMarking: any) => {
      return {
        ...prevMarking,
        type: type,
      };
    });
    setIsDropdownDisplayed(false);
    setSelectedType(type);
  }

  return (
    <div
      className={cn}
      style={{
        top: `${y}%`,
        left: `${x}%`,
      }}
      {...props}
      onClick={(e) => e.stopPropagation()}
    >
      <button
        id="default-dropdown-button"
        className={`${selectedType} grid-span-2-col`}
        onClick={() => setIsDropdownDisplayed((prevState) => !prevState)}
      >
        {currentMarking?.type || "Selecione o tipo"}
      </button>
      <div id="marking-types-dropdown">
        {isDropdownDisplayed &&
          markingTypes.map((type) => (
            <button
              className={`${type} type-dropdown-button grid-span-2-col`}
              onClick={() => handleTypeSelection(type)}
              key={Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000}
            >
              {type}
            </button>
          ))}
      </div>
      <textarea
        id="marking-text"
        className="grid-span-2-col"
        value={currentMarking.text}
        onChange={(e) =>
          setCurrentMarking((prev: any) => ({
            ...prev,
            text: e.target.value,
          }))
        }
      />
      <div id="marking-dialog-options">
        <button id="marking-dialog-cancel-button" onClick={handleDialogClose}>
          Cancelar
        </button>
        <button id="marking-dialog-save-button" onClick={handleMarkingSave}>
          Salvar
        </button>
      </div>
    </div>
  );
};

export default MarkingDialog;
