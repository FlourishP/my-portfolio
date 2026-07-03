function Error({ statusCode }: { statusCode?: number }) {
  return (
    <div style={{ padding: "2rem", textAlign: "center", fontFamily: "sans-serif" }}>
      <h1>{statusCode || "Error"}</h1>
      <p>{statusCode === 404 ? "Page not found" : "An error occurred"}</p>
    </div>
  );
}

Error.getInitialProps = ({ res, err }: { res: any; err: any }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
