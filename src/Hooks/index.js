import { useRef } from 'react';

export const useScroll = () => {
   const eleRef = useRef(null);
   const executeScroll = () => eleRef.current.scrollIntoView();

   return [eleRef, executeScroll];
};