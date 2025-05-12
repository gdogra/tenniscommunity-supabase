import { render, screen } from '@testing-library/react'
import Layout from '@/components/Layout'

describe('Layout', () => {
  it('should render children inside layout', () => {
    render(<Layout><div>Test Child</div></Layout>)
    expect(screen.getByText('Test Child')).toBeInTheDocument()
  })
})

