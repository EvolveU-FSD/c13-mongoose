import { useEffect, useState } from "react";
import { useUser } from "../LoginContext";

import Header from "../components/Header";

import "./Page.css"
import "./MyProjectPage.css"
import { getConversion } from "../api";

export default function MyProjectPage() {
    const user = useUser()

    const [ conversion, setConversion ] = useState({
        orderNumber: '---',
        status: "loading",
        expectedCost: '-----',
        imageUrl: 'http://locahost:5173/src/assets/westfalia-combine.jpg',
        activityLog: [
        ]
    })

    useEffect(() => {
        getConversion(user.conversionId)
            .then(setConversion)
            .catch(error => {
                setConversion({
                    ...conversion,
                    status: 'Load error'
                })
            })
    }, [ user ])

    return (<>
        <Header />
        <div className="page-content project-card">
            <h1>Custom Order # { conversion.orderNumber }</h1>
            <img src="http://localhost:5173/src/assets/westfalia-combine.jpg" />
            <table><tbody>
                <tr><th>Status</th><td>{conversion.status}</td></tr>
                <tr><th>Expected Cost</th><td>${conversion.expectedCost}</td></tr>
                <tr><th>Activity Log</th><td>
                    { conversion.activityLog.map((log, index) => (
                        <p key={index}>{log.date}: {log.comment}</p>                        
                    ))}
                </td></tr>
            </tbody></table>
        </div>
    </>)
}