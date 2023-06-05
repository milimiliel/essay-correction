import type { SidebarMarkingsProps } from "./sidebar-markings.types";

import { render } from "@testing-library/react";

import SidebarMarkings from "./sidebar-markings.component";

const makeSut = (props?: SidebarMarkingsProps) => render(<SidebarMarkings {...props} />);

describe("SidebarMarkings", () => {
  it("should render component", () => {
    const wrapper = makeSut();
    expect(wrapper).toBeTruthy();
  });
});
