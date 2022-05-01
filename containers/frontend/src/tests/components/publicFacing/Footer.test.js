/*
*	Responsible for performing test for Footer.js
*/

import { configure, shallow } from "enzyme";
import Enzyme from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";

import { Box, Link } from "@material-ui/core";

import Footer from "src/components/publicFacing/layout/Footer.js";

configure({ adapter: new Adapter() });

describe("Unit Tests for Footer.js", () => {
  it("1. The following components should be rendered correctly", () => {
    const wrapper = shallow(<Footer />);
    expect(wrapper.exists(Box)).toBeTruthy();
    expect(wrapper.exists(Link)).toBeTruthy();
  });
});
