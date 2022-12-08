import React, { useEffect, useState } from 'react';



const mapEventsToData = (events) => {
    let eventsData = []; 

    events.forEach((current) => {
        eventsData.push({
            link: current.attributes.href.value,
            text: current.querySelector("h6").innerHTML,
            title: current.querySelector("h5").innerHTML
        })
    })

    return eventsData;
}

const Events= () => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const getEvents= async () => {
            const events = await window.api.getNews();
            const domParser = new DOMParser();
            const eventsDoc = domParser.parseFromString(events, "text/html");
            const recentEvents = eventsDoc.querySelectorAll("#nav-2 .card a");
            setEvents(mapEventsToData(recentEvents));
        };
        getEvents()
    }, [])


    const eventsContent = () => {
        return events.map(({text, title, link}, index) => (
            <tr key={index} className="pt-2 block">
                <td><a className="text-sky-600 hover:text-sky-700" href={link}>{title}</a>
                </td>
            </tr>
        ))
    }


    return (
        <div id="events" className='flex-1'>
             <h3 className='text-xl pb-2 pl-2'>Events</h3>
            <div className='shade p-3'>
                <table>
                    {eventsContent()}
                </table>
            </div>
        </div>
    )
}

export default Events;