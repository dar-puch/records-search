import * as React from "react";
import { shallow, mount } from "enzyme";
import "jest-styled-components";
import { QueryHistory } from "../QueryHistory";
import { HistoryItem } from "discon/dist";

describe("<QueryHistory/>", () => {
  const clearMock = jest.fn();
  const updateMock = jest.fn();
  const history: HistoryItem[] = [
    {
      queryId: "23re",
      date: "22-34",
      parameters: { queryString: "hjhjhjh", what: "artist" },
      result: [
        {
          id: 1,
          title: "Jason",
          year: "1989",
          catno: "ff45",
          cover_image: "url"
        },
        {
          id: 2,
          title: "Olion",
          year: "1955",
          catno: "787r",
          cover_image: "url"
        }
      ]
    },
    {
      queryId: "zzz",
      date: "22-34",
      parameters: { queryString: "hjhjhjh", what: "artist" },
      result: [
        {
          id: 1,
          title: "Jason",
          year: "1989",
          catno: "ff45",
          cover_image: "url"
        },
        {
          id: 2,
          title: "Olion",
          year: "1955",
          catno: "787r",
          cover_image: "url"
        }
      ]
    }
  ];
  const props = {
    clear: clearMock,
    history: history,
    update: updateMock
  };
  const wrapper = mount(<QueryHistory {...props} />);
  it("renders correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });
  it("renders proper amount of list items", () => {
    expect(wrapper.find("li")).toHaveLength(2);
  });
  it("calls clear when clear history button is clicked", () => {
    const button = wrapper.find("button").at(0);
    button.simulate("click");
    expect(clearMock).toBeCalled();
  });
  it("calls update with proper parameter when delete button is clicked", () => {
    const button = wrapper.find("button").at(1);
    button.simulate("click");
    expect(updateMock).toBeCalledWith("23re");
  });
});
