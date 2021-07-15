import { Pagination } from "react-bootstrap";

export default function CustomPagination(props) {
   return <Pagination className="pagination">
      <Pagination.First onClick={(e) => {
         props.fetchAndSetData({ page: 1 }); // props.fetchAndSetData
         window.scroll(0, 0);
      }} />
      <Pagination.Prev
         disabled={props.page.current === 1 ? true : false} // props.page.current
         onClick={(e) => {
            props.fetchAndSetData({ page: props.page.current - 1 });
            window.scroll(0, 0);
         }} />
      {props.page.current >= 3 ? <Pagination.Ellipsis disabled={true} /> : null}
      {props.page.current >= 2 ? (
         <Pagination.Item
            onClick={(e) => {
               props.fetchAndSetData({ page: props.page.current - 1 });
               window.scroll(0, 0);
            }}
         >
            {props.page.current - 1}
         </Pagination.Item>
      ) : null}
      <Pagination.Item active>{props.page.current}</Pagination.Item>
      {props.page.total - props.page.current >= 1 ? (
         <Pagination.Item
            onClick={(e) => {
               props.fetchAndSetData({ page: props.page.current + 1 });
               window.scroll(0, 0);
            }}
         >
            {props.page.current + 1}
         </Pagination.Item>
      ) : null}
      {props.page.total - props.page.current >= 2 ? (
         <Pagination.Ellipsis disabled={true} />
      ) : null}
      <Pagination.Next
         disabled={props.page.current === props.page.total ? true : false}
         onClick={(e) => {
            props.fetchAndSetData({ page: props.page.current + 1 });
            window.scroll(0, 0);
         }} />
      <Pagination.Last
         onClick={(e) => {
            props.fetchAndSetData({ page: props.page.total });
            window.scroll(0, 0);
         }} />
   </Pagination>;
}
