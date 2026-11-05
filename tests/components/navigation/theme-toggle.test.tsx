import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ThemeProvider } from '@/providers/theme-provider'
import { ThemeToggle } from '@/components/navigation/theme-toggle'

beforeEach(() => {
  localStorage.clear()
  document.documentElement.className = ''
})

describe('ThemeToggle & ThemeProvider', () => {
  it('defaults to dark theme, adds dark class, and renders toggle button', () => {
    render(
      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>,
    )

    expect(document.documentElement.classList.contains('dark')).toBe(true)
    const toggleButton = screen.getByRole('button', { name: /switch to light mode/i })
    expect(toggleButton).toBeInTheDocument()
  })

  it('toggles theme between dark and light when clicked', async () => {
    const user = userEvent.setup()

    render(
      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>,
    )

    const toggleButton = screen.getByRole('button', { name: /switch to light mode/i })
    await user.click(toggleButton)

    // Now in light mode
    expect(document.documentElement.classList.contains('dark')).toBe(false)
    expect(localStorage.getItem('blockestate-theme')).toBe('light')
    expect(screen.getByRole('button', { name: /switch to dark mode/i })).toBeInTheDocument()

    // Toggle back to dark mode
    await user.click(screen.getByRole('button', { name: /switch to dark mode/i }))
    expect(document.documentElement.classList.contains('dark')).toBe(true)
    expect(localStorage.getItem('blockestate-theme')).toBe('dark')
    expect(screen.getByRole('button', { name: /switch to light mode/i })).toBeInTheDocument()
  })

  it('renders labeled variant with text correctly', async () => {
    const user = userEvent.setup()

    render(
      <ThemeProvider>
        <ThemeToggle variant="labeled" />
      </ThemeProvider>,
    )

    expect(screen.getByText('Light Mode')).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: /switch to light mode/i }))

    expect(screen.getByText('Dark Mode')).toBeInTheDocument()
  })
})

