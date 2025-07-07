import { isRouteErrorResponse, useRouteError } from "react-router-dom";

export default function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <div style={styles.container}>
        <h1 style={styles.heading}>
          {error.status} {error.statusText}
        </h1>
        <p style={styles.text}>{error.data}</p>
      </div>
    );
  } else if (error instanceof Error) {
    return (
      <div style={styles.container}>
        <h1 style={styles.heading}>Error</h1>
        <p style={styles.text}>{error.message}</p>
        <p style={styles.text}>The stack trace is:</p>
        <pre style={styles.stack}>{error.stack}</pre>
      </div>
    );
  } else {
    return (
      <div style={styles.container}>
        <h1 style={styles.heading}>Unknown Error</h1>
      </div>
    );
  }
}

const styles = {
  container: {
    padding: "2rem",
    textAlign: "center",
    fontFamily: "sans-serif",
    backgroundColor: "#fef2f2",
    color: "#991b1b",
    borderRadius: "8px",
    margin: "2rem",
  },
  heading: {
    fontSize: "2rem",
    fontWeight: "bold",
  },
  text: {
    marginTop: "1rem",
    fontSize: "1rem",
  },
  stack: {
    marginTop: "1rem",
    textAlign: "left",
    whiteSpace: "pre-wrap",
    backgroundColor: "#fff0f0",
    padding: "1rem",
    borderRadius: "4px",
    fontSize: "0.9rem",
    color: "#333",
  },
};
