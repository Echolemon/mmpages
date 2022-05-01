/*
*	Responsible for performing test for Logo.js
*/

import { configure, shallow } from "enzyme";
import Enzyme from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import Logo from "src/components/admin/layout/Logo.js";

configure({ adapter: new Adapter() });

describe("Unit Tests for Logo.js", () => {
  it("1. The following components should be rendered correctly", () => {
    const wrapper = shallow(<Logo />);
    expect(wrapper.exists("img")).toBeTruthy();
  });
});
