import Header from "./components/Header";
import Hero from "./components/Hero";
import Features from "./components/Features";
import Testimonials from "./components/Testimonials";
import Cta from "./components/Cta";
import Footer from "./components/Footer";
import Form_Empresa from "./components/Form_Empresa";
const Index = () => {

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Header/>
      <Hero/>
      <Features/>
      <Testimonials/>
      <Cta/>
      <Form_Empresa/>
      <Footer/> 
    </div>
  );
};

export default Index;