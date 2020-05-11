import * as React from "react";
import { useQueryHistory, fetchArtist } from "../functions";
import { renderHook, act } from "@testing-library/react-hooks";
import { today } from "../today";
import { v1 } from "uuid";

jest.mock("../api");
// eslint-disable-next-line import/first
import {
  search,
  what,
  Release,
  updateHistory,
  HistoryItem,
  getHistory,
  updateHistory,
} from "../api";

jest.mock("uuid");
jest.mock("../today");

const mockedupdateHistory = updateHistory as jest.Mock;
const mockedupdateHistory = updateHistory as jest.Mock;
const mockedGetHistory = getHistory as jest.Mock;
const mockedv1 = v1 as jest.Mock;
const mockedToday = today as jest.Mock;
const mockedSearch = search as jest.Mock;

const mockQueryHistory: HistoryItem[] = [
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
        cover_image: "url",
      },
      {
        id: 2,
        title: "Olion",
        year: "1955",
        catno: "787r",
        cover_image: "url",
      },
    ],
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
        cover_image: "url",
      },
      {
        id: 2,
        title: "Olion",
        year: "1955",
        catno: "787r",
        cover_image: "url",
      },
    ],
  },
];

const releases = [
  { id: 1, title: "Jason", year: "1989", catno: "ff45", cover_image: "hhh" },
  { id: 2, title: "Olion", year: "1955", catno: "787r", cover_image: "hhh" },
];

describe("useQueryHistory", () => {
  mockedv1.mockImplementation(() => "testid");
  mockedToday.mockImplementation(() => "2020-04-18");
  mockedGetHistory.mockResolvedValue(mockQueryHistory);

  it("saves query with expected parameters", () => {
    const { result } = renderHook(() => useQueryHistory());

    act(() => {
      result.current.saveQuery("U2", "artist", releases);
    });

    const expectedQueryInfo: HistoryItem = {
      queryId: "testid",
      date: "2020-04-18",
      parameters: { queryString: "U2", what: "artist" },
      result: releases,
    };

    expect(mockedupdateHistory).toHaveBeenCalledWith(expectedQueryInfo);
  });

  it("throws an error when saving fails", () => {
    mockedupdateHistory.mockImplementation(() => {
      throw new Error("400");
    });

    const { result } = renderHook(() => useQueryHistory());

    expect(result.current.saveQuery).toThrowError("saving query failed 400");
  });

  it("deletes query", async () => {
    const { result } = renderHook(() => useQueryHistory());
    await getHistory();
    await result.current.deleteHistoryItem("23re");

    expect(mockedupdateHistory).toHaveBeenCalledWith("23re");
    expect(result.current.queryHistory).toHaveLength(1);
  });

  it("clears history ", async () => {
    const { result } = renderHook(() => useQueryHistory());
    await getHistory();

    await result.current.clearHistory();

    expect(mockedupdateHistory).toHaveBeenCalledWith("all");
    expect(result.current.queryHistory).toHaveLength(0);
  });
});

describe("fetchArtist", () => {
  it("calls search with expected parameters ", () => {
    fetchArtist("U2", "artist");
    expect(mockedSearch).toHaveBeenCalledWith("U2", "artist");
  });
  it("throws an error when search fails ", () => {
    mockedSearch.mockImplementation(() => {
      throw new Error("400");
    });
    expect(fetchArtist).toThrowError("400");
  });
});
