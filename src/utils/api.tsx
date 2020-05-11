
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

export interface searchResponse {
  pagination: {
    items: number,
    page: number,
    pages: number,
    per_page: number
  },
  results: Release[]
}

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
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': 'https://api.discogs.com/'
}


export const doFetch = async (urlTail: string, method: string = 'GET', headers: HeadersInit = {}, body: string | null = null) => {
  
  try {
    const response = await fetch(`https://api.discogs.com/database/search${urlTail}`, {
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

export const search = async (query: string, what: what): Promise<searchResponse> => {
  return await doFetch(`?${what}=${query}&key=OmCRcVUyDaPdkmtfZisk&secret=ITwNkHvKmnERqjmfsbZdTgJVWJvgBVVz`);
}

export const getReleaseById = async (id: number): Promise<Release> => {
  return await doFetch(`data/${id}`);
}

export const getHistory =  (): HistoryItem[] => {
  const lsString = localStorage.getItem('history');
  return (lsString ? JSON.parse(lsString) : [] );
}

export const updateHistory = (item: HistoryItem[]) => {
  const stringified = JSON.stringify(item);
  localStorage.setItem('history', stringified);
}




///////////////////////////////////

// search('Nirvana', 'artist');

// przykład użycia: 
//getArtistsReleases(108713);

// const getLabelsReleases = async (labelID: number): Promise<{ releases: Release[] }> => {
//   const response = await fetch(`https://api.discogs.com/labels/${labelID}/releases`);
//   const json = await response.json();
//   const releases = json.releases
//   return releases;
// }
// przykładowe labelID: 1