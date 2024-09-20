import { useState } from "react";
import { Button } from "react-bootstrap";

export function CopyToClipboard (props) {
    const [copied, setCopied] = useState(false)
    return <>
        <Button variant="dark" onClick={()=>{
                navigator.clipboard.writeText(props.data)
                setCopied(true)
        }}>
            {!copied ? 
                props.text : 
                "Copiado!"
            }
        </Button>
    </>
}