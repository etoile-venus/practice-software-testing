export const Products = {
  known: {
    name: 'Combination Pliers',
    category: 'Pliers',
  },

  searchTerms: ['pliers', 'hammer'],

  brands: {
    forgeFlex: 'ForgeFlex Tools',
    mightyCraft: 'MightyCraft Hardware',
  },

  categories: {
    handTools: 'Hand Tools',
    pliers: 'Pliers',
  },

  sortOptions: [
    {
      testName: 'sorts products by price from low to high',
      value: 'price,asc',
      field: 'price',
      direction: 'asc',
    },
    {
      testName: 'sorts products by price from high to low',
      value: 'price,desc',
      field: 'price',
      direction: 'desc',
    },
    {
      testName: 'sorts products by name from A to Z',
      value: 'name,asc',
      field: 'name',
      direction: 'asc',
    },
    {
      testName: 'sorts products by name from Z to A',
      value: 'name,desc',
      field: 'name',
      direction: 'desc',
    },
  ] as const,
}
