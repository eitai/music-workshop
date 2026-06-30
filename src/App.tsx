import Header from "./components/Header";
import HeroSequence from "./components/HeroSequence";
import IntroBand from "./components/IntroBand";
import About from "./components/About";
import Services from "./components/Services";
import Gallery from "./components/Gallery";
import ContactCTA from "./components/ContactCTA";
import Footer from "./components/Footer";

export default function App() {
  return (
    <>
      <a href="#main" className="skip-link">
        דילוג לתוכן
      </a>
      <a href="#contact" className="skip-link skip-link--second">
        דילוג לטופס יצירת הקשר
      </a>

      <Header />

      <HeroSequence />

      <main id="main" tabIndex={-1}>
        <IntroBand />
        <About />
        <Services />
        <Gallery />
        <ContactCTA />
      </main>

      <Footer />
    </>
  );
}
