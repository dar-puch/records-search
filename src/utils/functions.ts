import {
  search,
  what,
  Release,
  HistoryItem,
  getHistory,
  updateHistory,
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
    setQueryHistory(getHistory())
  }, []);

  const saveQuery = (inputValue: string, what: what, releases: Release[]) => {
    const queryInfo: HistoryItem = {
      queryId: v1(),
      date: today(),
      parameters: { queryString: inputValue, what },
      result: releases,
    };
    const historyWithAddedItem = [...queryHistory, queryInfo]

    setQueryHistory(historyWithAddedItem);
    updateHistory(historyWithAddedItem);
  };

  const deleteHistoryItem =  (id: string) => {
    const historyWithDeletedItem = queryHistory.filter((item) => item.queryId !== id)
    updateHistory(historyWithDeletedItem);
    setQueryHistory(historyWithDeletedItem);
  };

  const clearHistory =  () => {
    updateHistory([]);
    setQueryHistory([]);
  };

  return { saveQuery, deleteHistoryItem, clearHistory, queryHistory };
};
