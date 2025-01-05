const fetchMock = async (url: string, init: any) => {
  return {
    ok: true,
    status: 200,
    json: async () => ({}),
    text: async () => '',
    blob: async () => new Blob(),
    headers: new Headers(),
  };
};

export default fetchMock;