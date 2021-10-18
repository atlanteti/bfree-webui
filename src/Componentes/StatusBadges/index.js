export function ActiveStatusBadge(props) {
   return <div style={{
      fontWeight: "bold",
      color: "rgba(76, 175, 80, 1)",
      background: "rgba(76, 175, 80, 0.12)",
      borderRadius: 5,
      padding: "0px 7px",
      display: "inline-block",
   }}>
      Ativo
   </div>
}

export function InactiveStatusBadge(props) {
   return <div style={{
      fontWeight: "bold",
      color: "rgb(62, 81, 110, 1)",
      background: "rgba(62, 81, 110, 0.12)",
      borderRadius: 5,
      padding: "0px 7px",
      display: "inline-block",
   }}>
      Inativo
   </div>
}

export function StatusBadgePropped(props) {
   if (props.active === true) {
      return <ActiveStatusBadge />
   }
   return <InactiveStatusBadge />
}