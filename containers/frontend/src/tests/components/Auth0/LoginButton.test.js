/*
*	Responsible for performing test for LoginButton.js
*/

import { configure, shallow } from "enzyme";
import Enzyme from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";

import LoginButton from "src/components/admin/Auth0/LoginButton.js";

configure({ adapter: new Adapter() });

describe("Unit Tests for LoginButton.js", () => {
  it("1. The following components should be rendered correctly", () => {
    const wrapper = shallow(<LoginButton />);
    expect(wrapper.exists("button")).toBeTruthy();
  });
});
