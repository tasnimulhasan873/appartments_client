// src/Utils/AosInit.jsx
import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const AosInit = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 100,
    });
  }, []);

  return null;
};

export default AosInit;
