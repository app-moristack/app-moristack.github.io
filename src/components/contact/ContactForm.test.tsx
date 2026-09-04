import { describe, expect, it, vi } from 'vitest'
import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithRouter } from '@/test/renderApp'
import { MIN_FILL_SECONDS } from '@/lib/submitContact'
import { ContactForm } from './ContactForm'

async function fillValidEnquiry(user: ReturnType<typeof userEvent.setup>) {
  await user.type(screen.getByLabelText(/full name/i), 'Ada Poonoosamy')
  await user.type(screen.getByLabelText(/email/i), 'ada@example.com')
  await user.type(screen.getByLabelText(/phone number/i), '+230 5123 4567')
  await user.type(
    screen.getByLabelText(/project description/i),
    'We run a bistro with two outlets and need a website with a digital menu.',
  )
  await user.click(screen.getByLabelText(/may store the details/i))
}

/** The timing check rejects anything faster than a person can realistically type. */
function pretendTheFormWasOpenedEarlier() {
  const realNow = Date.now
  vi.spyOn(Date, 'now').mockImplementation(() => realNow() + (MIN_FILL_SECONDS + 2) * 1000)
}

describe('ContactForm validation', () => {
  it('reports every missing required field instead of submitting', async () => {
    const user = userEvent.setup()
    const fetchSpy = vi.fn()
    vi.stubGlobal('fetch', fetchSpy)

    renderWithRouter(<ContactForm />)
    await user.click(screen.getByRole('button', { name: /send my enquiry/i }))

    expect(await screen.findByText(/please enter your full name/i)).toBeInTheDocument()
    expect(screen.getByText(/please enter your email address/i)).toBeInTheDocument()
    expect(screen.getByText(/confirm you are happy/i)).toBeInTheDocument()
    expect(fetchSpy).not.toHaveBeenCalled()
  })

  it('marks an invalid field with aria-invalid and links its message', async () => {
    const user = userEvent.setup()
    renderWithRouter(<ContactForm />)

    const email = screen.getByLabelText(/email/i)
    await user.type(email, 'not-an-email')
    await user.tab()

    await waitFor(() => expect(email).toHaveAttribute('aria-invalid', 'true'))
    expect(email).toHaveAccessibleDescription(/valid email address/i)
  })

  it('keeps the honeypot out of the tab order', () => {
    renderWithRouter(<ContactForm />)
    expect(screen.getByLabelText(/leave this field empty/i)).toHaveAttribute('tabindex', '-1')
  })
})

describe('ContactForm submission', () => {
  it('falls back to email when no endpoint is configured', async () => {
    const user = userEvent.setup()
    const fetchSpy = vi.fn()
    vi.stubGlobal('fetch', fetchSpy)

    renderWithRouter(<ContactForm />)
    await fillValidEnquiry(user)
    pretendTheFormWasOpenedEarlier()
    await user.click(screen.getByRole('button', { name: /send my enquiry/i }))

    const alert = await screen.findByRole('alert')
    expect(alert).toHaveTextContent(/not connected yet/i)
    expect(alert).toHaveTextContent(/moristack@gmail.com/i)
    expect(fetchSpy).not.toHaveBeenCalled()
  })

  it('preserves everything the visitor typed after a failure', async () => {
    const user = userEvent.setup()
    vi.stubGlobal('fetch', vi.fn())

    renderWithRouter(<ContactForm />)
    await fillValidEnquiry(user)
    pretendTheFormWasOpenedEarlier()
    await user.click(screen.getByRole('button', { name: /send my enquiry/i }))

    await screen.findByRole('alert')
    expect(screen.getByLabelText(/full name/i)).toHaveValue('Ada Poonoosamy')
    expect(screen.getByLabelText(/email/i)).toHaveValue('ada@example.com')
    expect(screen.getByLabelText(/project description/i)).toHaveValue(
      'We run a bistro with two outlets and need a website with a digital menu.',
    )
  })

  it('rejects a submission sent faster than a person could complete it', async () => {
    const user = userEvent.setup()
    renderWithRouter(<ContactForm />)

    await fillValidEnquiry(user)
    await user.click(screen.getByRole('button', { name: /send my enquiry/i }))

    expect(await screen.findByRole('alert')).toHaveTextContent(/submitted very quickly/i)
  })

  it('announces the outcome to assistive technology', async () => {
    const user = userEvent.setup()
    renderWithRouter(<ContactForm />)

    await fillValidEnquiry(user)
    pretendTheFormWasOpenedEarlier()
    await user.click(screen.getByRole('button', { name: /send my enquiry/i }))

    const alert = await screen.findByRole('alert')
    expect(alert).toHaveAttribute('aria-live', 'assertive')
  })
})
