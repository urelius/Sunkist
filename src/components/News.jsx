import React, { useEffect, useState } from 'react';

const mapNewsToData = (news) => {
  const newsData = [];

  news.forEach((current) => {
    newsData.push({
      link: current.attributes.href.value,
      title: current.querySelector('h5').innerHTML,
    });
  });

  return newsData;
};

function News() {
  const [news, setNews] = useState([]);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const getNews = async () => {
      const allNews = await window.api.getNews();
      const domParser = new DOMParser();
      const newsDoc = domParser.parseFromString(allNews, 'text/html');
      const recentNews = newsDoc.querySelectorAll('#nav-1 div.card a');
      const recentEvents = newsDoc.querySelectorAll('#nav-2 div.card a');
      setNews(mapNewsToData(recentNews));
      setEvents(mapNewsToData(recentEvents));
    };
    getNews();
  }, []);

  const newsContent = (content) => content.map(({ title, link }) => (
    <tr key={link} className="pt-0.5 block">
      <td>
        <a className="text-sky-600 hover:text-sky-700" href={link}>
          {title}
        </a>
      </td>
    </tr>
  ));

  return (
    newsContent(news) && (
    <div className="basis-1/2 shade noDrag rounded-lg">
      <div id="news">
        <div className="pt-3 px-4">
          <h3 className="text-xl p-0">News</h3>
          <table><tbody>{newsContent(news)}</tbody></table>
        </div>
        <div className="py-3 p-4">
          <h3 className="text-xl p-0">Events</h3>
          <table><tbody>{newsContent(events)}</tbody></table>
        </div>
      </div>
    </div>
    )
  );
}

export default News;
