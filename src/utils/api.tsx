
export type what = 'artist' | 'label';

export interface Release {
  id: number,
  cover_image: string,
  title: string,
  catno: string,
  year: string,
  artist?: string,
  label?: string[]
};

export interface HistoryItem {
  queryId: string;
  date: string;
  parameters: {
    queryString: string,
    what: what,
  };
  result: Release[];
}

const headers = {
  'Accept': 'application/json',
  'Content-Type': 'application/json'
}


export const doFetch = async (urlTail: string, method: string = 'GET', headers: HeadersInit = {}, body: string | null = null) => {
  try {
    const response = await fetch(`http://localhost:4000/${urlTail}`, {
      method: method,
      headers: headers,
      body: body
    });
    if (response.ok) {
      const json = await response.json();
      return json;
    }
    else {
      throw Error(`${response.status}`);
    }
  }
  catch (e) {
    console.log('fetch failed: ', e.message);
    throw Error(e.message);
  }
}

export const search = async (query: string, what: what): Promise<Release[]> => {
  return await doFetch(`data/?${what}=${query}`);
}

export const getReleaseById = async (id: number): Promise<Release> => {
  return await doFetch(`data/${id}`);
}

export const getHistory = async (): Promise<HistoryItem[]> => {
  return await doFetch('history');
}

export const addToHistory = async (item: HistoryItem): Promise<void> => {
  const stringified = JSON.stringify(item);
  await doFetch('history', 'POST', headers, stringified);
}

export const removeFromHistory = async (id: HistoryItem['queryId'] | 'all'): Promise<void> => {
  await doFetch(`history/?id=${id}`, 'DELETE', headers);
}

