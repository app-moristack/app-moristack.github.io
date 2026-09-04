import { Component, type ErrorInfo, type ReactNode } from 'react'

type Props = { readonly children: ReactNode; readonly fallback?: ReactNode }
type State = { readonly hasError: boolean }

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false }

  static getDerivedStateFromError(): State {
    return { hasError: true }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    if (import.meta.env.DEV) {
      console.error('Unhandled UI error', error, info.componentStack)
    }
  }

  render() {
    if (!this.state.hasError) return this.props.children
    if (this.props.fallback !== undefined) return this.props.fallback

    return (
      <div role="alert" className="mx-auto max-w-md px-5 py-20 text-center">
        <h2 className="text-xl font-bold">Something went wrong</h2>
        <p className="mt-2 text-sm text-ink-300">
          Please reload the page. If the problem continues, email us and we will help.
        </p>
      </div>
    )
  }
}
