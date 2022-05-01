/*
*	Responsible for performing test for AnimationToolbar.js
*/

import { configure, shallow } from "enzyme";
import Enzyme from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";

import { Box, Button } from "@material-ui/core";

import AnimationToolbar from "src/components/admin/animations/AnimationToolbar.js";

configure({ adapter: new Adapter() });

describe("Unit Tests for AnimationToolbar.js", () => {
  it("1. The following components should be rendered correctly", () => {
    const wrapper = shallow(<AnimationToolbar />);
    expect(wrapper.exists(Box)).toBeTruthy();
    expect(wrapper.exists(Button)).toBeTruthy();
  });
});
