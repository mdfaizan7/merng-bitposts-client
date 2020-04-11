import React, { useContext } from "react";
import { useQuery } from "@apollo/react-hooks";
import { Grid } from "semantic-ui-react";
import PostCard from "../components/PostCard";
import styled from "styled-components";
import { AuthContext } from "../context/auth";
import CreatePost from "../components/CreatePost";
import { FETCH_POSTS_QUERY } from "../util/graphql";

const Title = styled.h1`
  display: block;
  text-align: center;
  width: 100%;
  font-size: 2rem;
  margin-top: 10px !important;
`;

const Home = () => {
  const { loading, data } = useQuery(FETCH_POSTS_QUERY);

  const { user } = useContext(AuthContext);

  return (
    <Grid columns={3}>
      <Grid.Row className="page-ttle">
        <Title>Recent Posts</Title>
      </Grid.Row>
      <Grid.Row>
        {user && (
          <Grid.Column>
            <CreatePost />
          </Grid.Column>
        )}
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

export default Home;
