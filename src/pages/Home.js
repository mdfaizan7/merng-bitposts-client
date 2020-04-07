import React from "react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { Grid } from "semantic-ui-react";
import PostCard from "../components/PostCard";
import "../App.css";

const Home = () => {
  const { loading, data } = useQuery(FETCH_POSTS_QUERY);

  return (
    <Grid columns={3} divided>
      <Grid.Row className="page-title">
        <h1>Recent posts</h1>
      </Grid.Row>
      <Grid.Row>
        {loading ? (
          <h1>LOADING</h1>
        ) : (
          data.getPosts &&
          data.getPosts.map((post) => (
            <Grid.Column key={post.id} style={{ marginBottom: 20 }}>
              <PostCard post={post} />
            </Grid.Column>
          ))
        )}
      </Grid.Row>
    </Grid>
  );
};

const FETCH_POSTS_QUERY = gql`
  {
    getPosts {
      id
      body
      createdAt
      userName
      likeCount
      likes {
        userName
      }
      commentCount
      comments {
        id
        body
        userName
        createdAt
      }
    }
  }
`;

export default Home;
