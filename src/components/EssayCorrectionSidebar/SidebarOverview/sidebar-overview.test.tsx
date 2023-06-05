import type { SidebarOverviewProps } from "./sidebar-overview.types";

import { render } from "@testing-library/react";

import SidebarOverview from "./sidebar-overview.component";

const makeSut = (props?: SidebarOverviewProps) => render(<SidebarOverview {...props} />);

describe("SidebarOverview", () => {
  it("should render component", () => {
    const wrapper = makeSut();
    expect(wrapper).toBeTruthy();
  });
});
