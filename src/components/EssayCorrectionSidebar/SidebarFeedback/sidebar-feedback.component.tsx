import type { SidebarFeedbackProps } from "./sidebar-feedback.types";
import React, { useRef, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import classNames from "classnames";

const DynamicBundledEditor = dynamic(() => import("@/libs/tinymce-editor/BundledEditor"), {
  ssr: false,
});

const SidebarFeedback = ({ children, className, ...props }: SidebarFeedbackProps) => {
  const cn = classNames("sidebar-feedback", className);

  const [isClient, setIsClient] = useState(false);
  const editorRef = useRef(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className={cn} {...props}>
      <div className="essay-feedback-editor">
        {isClient && (
          <DynamicBundledEditor
            onInit={(editor: any) => (editorRef.current = editor)}
            initialValue="<p>Oi, querida! Vamos ao comentário geral?<br>C1:<br>C2:<br>C3:<br>C4:<br>C5:<br>Grande abraço e bons estudos, sua linda!</p>"
            init={{
              height: 500,
              menubar: false,
              plugins: [
                "advlist",
                "anchor",
                "autolink",
                "link",
                "emoticons",
                "lists",
                "searchreplace",
                "table",
                "wordcount",
              ],
              toolbar: "undo redo bold italic emoticons alignleft | outdent indent removeformat",
              content_style: "body { font-family:Arial,sans-serif; font-size:14px }",
            }}
          />
        )}
      </div>
      {children}
    </div>
  );
};

export default SidebarFeedback;
