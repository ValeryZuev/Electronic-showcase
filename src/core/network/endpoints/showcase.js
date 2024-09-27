export default [
  {
    name: 'getCategories',
    url: '/products/categories',
    api: 'api',
    httpMethod: 'get',
    handler: 'normalizeCategories',
    store: { name: 'showcase', key: 'categories', },
    doc: {
      params: [],
      returns: 'Array'
    }
  },
  {
    name: 'getAllProducts',
    url: '/products',
    api: 'api',
    httpMethod: 'get',
    handler: 'normalizeProducts',
    store: { name: 'showcase', key: 'products', },
    doc: {
      params: [
        { name: 'sort', type: 'string', description: 'asc or desc' },
        { name: 'limit', type: 'number' },
      ],
      returns: 'Array'
    }
  },
  {
    name: 'getProductsByCategory',
    url: '/products/category/{category}',
    api: 'api',
    httpMethod: 'get',
    hasUrlParams: true,
    handler: 'normalizeProducts',
    store: { name: 'showcase', key: 'products', },
    doc: {
      params: [
        { name: 'category', type: 'string', required: true, urlParam: true },
        { name: 'limit', type: 'number' },
        { name: 'sort', type: 'string', description: 'asc or desc' },
      ],
      returns: 'Array'
    }
  },
]
