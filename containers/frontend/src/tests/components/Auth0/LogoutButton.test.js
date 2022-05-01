/*
*	Responsible for performing test for LogoutButton.js
*/

import { configure, shallow } from "enzyme";
import Enzyme from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";

import { IconButton } from "@material-ui/core";

import LogoutButton from "src/components/admin/Auth0/LogoutButton.js";

configure({ adapter: new Adapter() });

describe("Unit Tests for LogoutButton.js", () => {
  it("1. The following components should be rendered correctly", () => {
    const wrapper = shallow(<LogoutButton />);
    expect(wrapper.exists(IconButton)).toBeTruthy();
  });
});
