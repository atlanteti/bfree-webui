import { Pagination } from "react-bootstrap"
import axios from "axios";
import './styles.css';

export default function Pag(data) {
   let currentPage = data.page.current;
   let totalPages = data.page.total;

   async function nextPage(value) {
      try {
         const { data } = await axios({
            method: 'get',
            url: 'http://167.172.243.156:4803/clientes/listar',
            params: { page: value }
         })
         
      } catch (error) {
         alert(error)
      }
   }

   return (
      <div>
         {/* <Pagination>
            <Pagination.First />
            <Pagination.Prev />
            {
               currentPage >= 3 ? (
                  <Pagination.Ellipsis />
               ) : null
            }
            {
               currentPage >= 2 ? (
                  <Pagination.Item >{currentPage - 1}</Pagination.Item>
               ) : null
            }
            <Pagination.Item active>{currentPage}</Pagination.Item>
            {
               totalPages - currentPage >= 1 ? (
                  <Pagination.Item onClick={() => nextPage(currentPage + 1)}>{currentPage + 1}</Pagination.Item>
               ) : null
            }
            {
               totalPages - currentPage >= 2 ? (
                  <Pagination.Ellipsis />
               ) : null
            }
            <Pagination.Next />
            <Pagination.Last />
         </Pagination> */}
      </div>
   );
}