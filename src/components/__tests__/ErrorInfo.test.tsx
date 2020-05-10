import * as React from "react";
import { shallow, mount } from "enzyme";
import { ErrorInfo } from "../ErrorInfo";
import { CardContent } from "@material-ui/core";

describe("<ErrorInfo/>", () => {
  it("renders correctly", () => {
    const wrapper = mount(<ErrorInfo error="350" />);
    expect(wrapper).toMatchSnapshot();
  });
  it("displays proper image from httpcat when error is numeric", () => {
    const wrapper = mount(<ErrorInfo error="350" />);
    expect(wrapper.find("img").prop("src")).toMatch(
      /(https:\/\/http\.cat\/350)/
    );
  });
  it("displays 'no internet' card when error is not numeric", () => {
    const wrapper = mount(<ErrorInfo error="problem" />);
    expect(wrapper.find(CardContent).text()).toEqual("Check your connection");
  });
});
