import fetch from 'isomorphic-unfetch';
import Link from 'next/link';
import styled from 'styled-components';

import Layout from '../components/MyLayout';

interface ShowProps {
  shows: {
    id: number;
    name: string;
  }[];
}

const ListItem = styled.li`
  list-style-type: none;
`;

const Index = (props: ShowProps) => {
  return (
    <Layout>
      <span>Batman TV Shows</span>
      <ul>
        {props.shows.map(show => (
          <ListItem key={show.id}>
            <Link as={`/p/${show.id}`} href={`/post?id=${show.id}`}>
              <button>{show.name}</button>
            </Link>
          </ListItem>
        ))}
      </ul>
    </Layout>
  );
};

Index.getInitialProps = async function() {
  const res = await fetch('https://api.tvmaze.com/search/shows?q=batman');
  const data = await res.json();

  console.log(`Show data fetched. Count: ${data.length}`);

  return {
    shows: data.map((entry: any) => entry.show)
  };
};

export default Index;
