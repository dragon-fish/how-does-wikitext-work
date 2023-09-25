export const mwApi = new mw.Api({
  ajax: {},
  parameters: {
    format: 'json',
    formatversion: 2,
    action: 'query',
  },
})
