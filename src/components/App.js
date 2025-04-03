import React from "react";
import Header from "./components/Header";
import PropertyList from "./components/PropertyList";
import ContactForm from "./components/ContactForm";

const App = () => {
  return (
    <div>
      <Header />
      <PropertyList />
      <ContactForm />
    </div>
  );
};

export default App;