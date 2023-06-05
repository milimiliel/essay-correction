import type { SidebarFeedbackProps } from "./sidebar-feedback.types";

import { render } from "@testing-library/react";

import SidebarFeedback from "./sidebar-feedback.component";

const makeSut = (props?: SidebarFeedbackProps) => render(<SidebarFeedback {...props} />);

describe("SidebarFeedback", () => {
  it("should render component", () => {
    const wrapper = makeSut();
    expect(wrapper).toBeTruthy();
  });
});
