import React, { useEffect, useState } from 'react';

const mapNewsToData = (news) => {
  const newsData = [];

  news.forEach((current) => {
    newsData.push({
      link: current.attributes.href.value,
      date: current.querySelector('p').innerHTML,
      title: current.querySelector('h4').innerHTML,
    });
  });

  return newsData;
};

function News() {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const getNews = async () => {
      const allNews = await window.api.getNews();
      const domParser = new DOMParser();
      const newsDoc = domParser.parseFromString(allNews, 'text/html');
      const recentNews = newsDoc.querySelectorAll(
        '#nav-1 #recent-announcements a',
      );
      setNews(mapNewsToData(recentNews));
    };
    getNews();
  }, []);

  const newsContent = () => news.map(({ date, title, link }) => (
    <tr key={link} className="pt-2 block">
      <td className="text-sm w-24">{date}</td>
      <td>
        <a className="text-sky-600 hover:text-sky-700" href={link}>
          {title}
        </a>
      </td>
    </tr>
  ));

  return (
    <div id="news" className="flex-1 mt-8">
      <h3 className="text-xl pb-2 pl-2">News</h3>
      <div className="noDrag shade p-6">
        <table><tbody>{newsContent()}</tbody></table>
      </div>
    </div>
  );
}

export default News;
