import { doFetch } from '../../index';
function mockFetch(response: { ok: boolean, status: string }) {
  return jest.fn().mockImplementation(() =>
    Promise.resolve({
      ok: true,
      json: () => response
    })
  );
}

let successResponse = {
  ok: true,
  status: '200'
}

let failedResponse = {
  ok: false,
  status: '500'
}

const expectProperFetchOptions = (url: string) => {
  expect(window.fetch).toHaveBeenCalledWith(`http://localhost:4000/${url}`, { method: 'GET', headers: { 'Content-Type': 'application/json' }, body: 'someBody' });
}

describe('doFetch', () => {
  it('emits an error without fetch', async () => {
    return doFetch('someUrl', 'GET', {}, '').catch(e => expect(e.message).toMatch('fetch is not defined'));
  })

  it('should call fetch with the correct url, headers and body', async () => {
    window.fetch = mockFetch(successResponse);
    await doFetch('someUrl', 'GET', { 'Content-Type': 'application/json' }, 'someBody');
    expectProperFetchOptions('someUrl');
  });

  it('returns correct answer', () => {
    window.fetch = mockFetch(successResponse);
    return expect(doFetch('someUrl', 'GET', {}, '')).resolves.toEqual(successResponse);
  });


  it('fetch fails with an error', async () => {
    window.fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve(failedResponse)
    });
    try {
      await doFetch('someUrl', 'GET', {}, '');
    } catch (e) {
      expect(e).toEqual(Error('500'));
    }
  })
});
