/*
*	Responsible for performing test for DashboardLayout.js
*/

import { configure, shallow, mount } from "enzyme";
import Enzyme from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import { MemoryRouter as Router } from "react-router-dom";
import DashboardLayout from "src/components/admin/layout/DashboardLayout.js";

configure({ adapter: new Adapter() });

describe("Unit Tests for DashboardLayout.js", () => {
  it("1. The following components should be rendered correctly", () => {
    const wrapper = mount(
      <Router>
        <DashboardLayout />
      </Router>
    );
    expect(wrapper.exists("div")).toBeTruthy();
  });
});
