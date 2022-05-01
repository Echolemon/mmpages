/*
*	Responsible for performing test for DashboardNavbar.js
*/

import { configure, shallow, mount } from "enzyme";
import Enzyme from "enzyme";
import { MemoryRouter as Router } from "react-router-dom";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import DashboardNavbar from "src/components/admin/layout/DashboardNavbar.js";
import { AppBar, Badge, Box, IconButton, Toolbar } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import Logo from "src/components/admin/layout/Logo.js";

configure({ adapter: new Adapter() });

global.window = { location: { pathname: null } };

describe("Unit Tests for DashboardNavbar.js", () => {
  it("1. The following components should be rendered correctly", () => {
    const wrapper = mount(
      <Router>
        <DashboardNavbar />
      </Router>
    );
    expect(wrapper.exists(AppBar)).toBeTruthy();
    expect(wrapper.exists(Toolbar)).toBeTruthy();
    expect(wrapper.exists(Logo)).toBeTruthy();
    expect(wrapper.exists(Box)).toBeTruthy();
    expect(wrapper.exists(IconButton)).toBeTruthy();
    expect(wrapper.exists(MenuIcon)).toBeTruthy();
  });

  it("2. It should navigate to login page after clicking the IconButton", () => {
    // TODO: Unfinished.
    const wrapper = mount(
      <Router>
        <DashboardNavbar />
      </Router>
    );
    expect(global.window.location.pathname).toEqual("/");
    const FristIconButton = wrapper.find(IconButton).at(0);
    // FristIconButton.hostNodes().simulate('click');
    // wrapper.update();
    // expect(global.window.location.pathname).toEqual('/login');
  });
});
