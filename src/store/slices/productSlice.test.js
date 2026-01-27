import {
  fetchAllProducts,
  fetchProductById,
  fetchCategories,
  fetchProductsByCategory,
} from 'services/api'
import { configureStore } from '@reduxjs/toolkit'

import reducer, {
  getProducts,
  getProductDetails,
  getCategories,
  getProductsByCategory,
  clearSelectedProduct,
} from './productSlice'



vi.mock('services/api', () => ({
  fetchAllProducts: vi.fn(),
  fetchProductById: vi.fn(),
  fetchCategories: vi.fn(),
  fetchProductsByCategory: vi.fn(),
}))

const createTestStore = () =>
  configureStore({
    reducer: {
      products: reducer,
    },
  })

beforeEach(() => {
  vi.clearAllMocks()
})

describe('productSlice - initial state', () => {
  it('should return the initial state when no action is dispatched', () => {
    const state = reducer(undefined, { type: 'unknown' })

    expect(state).toEqual({
      items: [],
      selectedProduct: null,
      categories: [],
      status: 'idle',
      error: null,
    })
  })
})

describe('productSlice - reducers', () => {
  it('should clear selected product when clearSelectedProduct is called', () => {
    const previousState = {
      items: [],
      selectedProduct: { id: 1 },
      categories: [],
      status: 'succeeded',
      error: null,
    }

    const state = reducer(previousState, clearSelectedProduct())

    expect(state.selectedProduct).toBeNull()
  })
})

describe('productSlice - async thunks', () => {
  it('product loaded successfully', async () => {
    const mockProducts = [{ id: 1 }, { id: 2 }]
    fetchAllProducts.mockResolvedValue(mockProducts)

    const store = createTestStore()
    await store.dispatch(getProducts())

    const state = store.getState().products

    expect(state.status).toBe('succeeded')
    expect(state.items).toEqual(mockProducts)
    expect(state.error).toBeNull()
  })

  it('handling error', async () => {
    fetchAllProducts.mockRejectedValue({
      isAxiosError: true,
      response: { data: 'Failed to load' },
    })

    const store = createTestStore()
    await store.dispatch(getProducts())

    const state = store.getState().products

    expect(state.status).toBe('failed')
    expect(state.error).toBe('Failed to load')
  })

  it('loaded product detailed successfully', async () => {
    const product = { id: 1, title: 'Product 1' }
    fetchProductById.mockResolvedValue(product)

    const store = createTestStore()
    await store.dispatch(getProductDetails(1))

    const state = store.getState().products

    expect(state.status).toBe('succeeded')
    expect(state.selectedProduct).toEqual(product)
  })

  it('categories loaded successfully', async () => {
    const categories = ['electronics', 'fashion']
    fetchCategories.mockResolvedValue(categories)

    const store = createTestStore()
    await store.dispatch(getCategories())

    const state = store.getState().products

    expect(state.status).toBe('succeeded')
    expect(state.categories).toEqual(categories)
  })

  it('product loaded by category successfully', async () => {
    const products = [{ id: 10 }]
    fetchProductsByCategory.mockResolvedValue(products)

    const store = createTestStore()
    await store.dispatch(getProductsByCategory('electronics'))

    const state = store.getState().products

    expect(state.status).toBe('succeeded')
    expect(state.items).toEqual(products)
  })
})
