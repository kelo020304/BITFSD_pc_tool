import { Component, type ReactNode } from "react";

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  errorMessage: string | null;
  stack: string | null;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = {
    errorMessage: null,
    stack: null,
  };

  static getDerivedStateFromError(error: unknown): ErrorBoundaryState {
    return {
      errorMessage: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack ?? null : null,
    };
  }

  override componentDidCatch(error: unknown) {
    console.error("bitfsd-annotator runtime error", error);
  }

  override render() {
    if (!this.state.errorMessage) {
      return this.props.children;
    }

    return (
      <div className="runtime-error">
        <div className="runtime-error__card">
          <div className="runtime-error__title">Runtime Error</div>
          <div className="runtime-error__message">{this.state.errorMessage}</div>
          {this.state.stack && <pre className="runtime-error__stack">{this.state.stack}</pre>}
          <button className="secondary-button" onClick={() => window.location.reload()} type="button">
            Reload
          </button>
        </div>
      </div>
    );
  }
}
