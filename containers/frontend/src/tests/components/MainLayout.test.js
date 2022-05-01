/*
*	Responsible for performing test for MainLayout.js
*/

import { configure, shallow, mount } from "enzyme";
import { MemoryRouter as Router } from "react-router-dom";
import Enzyme from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import MainLayout from "src/components/archive/MainLayout.js";

configure({ adapter: new Adapter() });

describe("Unit Tests for MainLayout.js", () => {
  it("1. The following components should be rendered correctly", () => {
    const wrapper = mount(
      <Router>
        <MainLayout />
      </Router>
    );
    expect(wrapper.exists("MainNavbar")).toBeTruthy();
    expect(wrapper.exists("Outlet")).toBeTruthy();
    expect(wrapper.exists("div")).toBeTruthy();
  });
});
