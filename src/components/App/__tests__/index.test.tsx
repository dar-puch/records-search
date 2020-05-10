import * as React from "react";
import { shallow, mount } from "enzyme";
import "jest-styled-components";

import App from "../index";

describe("<App/>", () => {
  xit("renders correctly", () => {
    expect(shallow(<App />)).toMatchSnapshot();
  });

  xit("should have proper data-value attribute when input is altered", () => {
    const event = {
      target: { value: "something" }
    };
    const wrapper = shallow(<App />);
    wrapper.find("#search").simulate("change", event);
    wrapper.update();
    expect(wrapper.find("#search").prop("data-value")).toEqual("something");
  });

  xit("should call saveSearchResult with given parameter when button is clicked", () => {
    const saveSearchResultMock = jest.fn();
    const component = shallow(<App />);
    component.find("button").simulate("click");
    expect(saveSearchResultMock).toBeCalledWith("artist");
  });

  xit("should render a RecordList when response is success", () => {
    const recList = [
      {
        id: 1,
        title: "Jason",
        year: "1989",
        catno: "ff45",
        cover_image: "hhh"
      },
      { id: 2, title: "Olion", year: "1955", catno: "787r", cover_image: "hhh" }
    ];
  });
});
