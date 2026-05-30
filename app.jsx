// App entry
function App() {
  useReveal();
  return (
    <>
      <Loader />
      <ScrollProgress />
      <CursorDot />
      <Nav />
      <main>
        <Hero />
        <Manifeste />
        <Chapters />
        <Institutional />
        <Gammes />
        <Niger />
        <Trust />
        <CtaStrip />
      </main>
      <Footer />
      <Concierge />
      <Modal />
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById("app"));
root.render(<App />);
