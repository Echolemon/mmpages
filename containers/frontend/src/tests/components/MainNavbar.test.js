/*
*	Responsible for performing test for MainNavbar.js
*/

import { configure, shallow, mount } from "enzyme";
import Enzyme from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import { AppBar, Toolbar } from "@material-ui/core";
import { MemoryRouter as Router } from "react-router-dom";
import Logo from "src/components/admin/layout/Logo.js";
import MainNavbar from "src/components/archive/MainNavbar.js";

configure({ adapter: new Adapter() });

describe("Unit Tests for MainNavbar.js", () => {
  it("1. The following components should be rendered correctly", () => {
    const wrapper = mount(
      <Router>
        <MainNavbar />
      </Router>
    );
    expect(wrapper.exists(AppBar)).toBeTruthy();
    expect(wrapper.exists(Toolbar)).toBeTruthy();
    expect(wrapper.exists(Logo)).toBeTruthy();
  });
});
