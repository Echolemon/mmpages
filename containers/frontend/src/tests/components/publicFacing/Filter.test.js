/*
*	Responsible for performing test for Filter.js
*/

import { configure, shallow } from "enzyme";
import Enzyme from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import TextField from "@material-ui/core/TextField";

import Filter from "src/components/publicFacing/layout/Filter.js";

configure({ adapter: new Adapter() });

describe("Unit Tests for Filter.js", () => {
  it("1. The following components should be rendered correctly", () => {
    const wrapper = shallow(<Filter />);
    expect(wrapper.exists(TextField)).toBeTruthy();
  });
});
