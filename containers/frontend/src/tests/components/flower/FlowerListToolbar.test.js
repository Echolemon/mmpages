/*
*	Responsible for performing test for FlowerListToolbar.js
*/

import { configure, shallow, mount } from "enzyme";
import Enzyme from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import { MemoryRouter as Router } from "react-router-dom";
import FlowerListToolbar from "src/components/admin/story/StoryListToolbar.js";
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  FormControlLabel,
  Checkbox,
  SvgIcon,
} from "@material-ui/core";

configure({ adapter: new Adapter() });

describe("Unit Tests for FlowerListToolbar.js", () => {
  it("1. The following components should be rendered correctly", () => {
    const wrapper = mount(
      <Router>
        <FlowerListToolbar />
      </Router>
    );
    expect(wrapper.exists(Box)).toBeTruthy();
    expect(wrapper.exists(Button)).toBeTruthy();
    expect(wrapper.exists(Card)).toBeTruthy();
    expect(wrapper.exists(CardContent)).toBeTruthy();
    expect(wrapper.exists(TextField)).toBeTruthy();
  });
});
