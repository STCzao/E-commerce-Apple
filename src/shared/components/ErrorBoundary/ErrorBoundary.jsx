import { Component } from "react";

class ErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error("[ErrorBoundary]", error, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center gap-4 text-center px-6">
          <p className="text-2xl font-semibold text-[#1d1d1f]">Algo salió mal</p>
          <p className="text-[#6e6e73] text-sm max-w-xs">
            Ocurrió un error inesperado. Por favor recargá la página.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="mt-2 px-6 py-2 rounded-full bg-[#1d1d1f] text-white text-sm font-medium hover:bg-[#1d1d1f]/85 transition-colors"
          >
            Recargar página
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
