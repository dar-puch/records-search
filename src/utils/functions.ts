import {
  search,
  what,
  Release,
  addToHistory,
  HistoryItem,
  getHistory,
  removeFromHistory,
} from "./api";
import * as React from "react";
import { useState } from "react";
import { v1 } from "uuid";
import { today } from "./today";

export const fetchArtist = async (inputValue: string, what: what) => {
  try {
    return await search(inputValue, what);
  } catch (error) {
    throw new Error(error.message);
  }
};
export const useQueryHistory = () => {
  const [queryHistory, setQueryHistory] = useState<HistoryItem[]>([]);

  React.useEffect(() => {
    const fn = async () => {
      try {
      setQueryHistory(await getHistory());
    } catch (e) { console.log('cannot load query history data')}
  }
    fn();
  }, []);

  const saveQuery = (inputValue: string, what: what, releases: Release[]) => {
    const queryInfo: HistoryItem = {
      queryId: v1(),
      date: today(),
      parameters: { queryString: inputValue, what },
      result: releases,
    };
    try {
      setQueryHistory([...queryHistory, queryInfo]);
      addToHistory(queryInfo);
    } catch (error) {
      throw new Error("saving query failed " + error.message);
    }
  };

  const deleteHistoryItem = async (id: string) => {
    await removeFromHistory(id);
    setQueryHistory(queryHistory.filter((item) => item.queryId !== id));
  };

  const clearHistory = async () => {
    await removeFromHistory("all");
    setQueryHistory([]);
  };

  return { saveQuery, deleteHistoryItem, clearHistory, queryHistory };
};
