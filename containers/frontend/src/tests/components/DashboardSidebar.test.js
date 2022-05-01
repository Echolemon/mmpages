/*
*	Responsible for performing test for DashboardSidebar.js
*/

import { configure, shallow, mount } from "enzyme";
import Enzyme from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import { MemoryRouter as Router } from "react-router-dom";
import DashboardSidebar from "src/components/admin/layout/DashboardSidebar.js";
import { Avatar, Box, Divider, Drawer, List } from "@material-ui/core";

configure({ adapter: new Adapter() });

describe("Unit Tests for DashboardSidebar.js", () => {
  it("1. The following components should be rendered correctly", () => {
    const wrapper = mount(
      <Router>
        <DashboardSidebar />
      </Router>
    );
    expect(wrapper.exists(Avatar)).toBeTruthy();
    expect(wrapper.exists(Box)).toBeTruthy();
    expect(wrapper.exists(Drawer)).toBeTruthy();
    expect(wrapper.exists(List)).toBeTruthy();
  });
});
