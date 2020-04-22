import React, { useContext } from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import moment from "moment";
import LikeButton from "../components/LikeButton";
import DeleteButton from "../components/DeleteButton";
import { AuthContext } from "../context/auth";

import { Grid, Image, Card, Button, Icon, Label } from "semantic-ui-react";

const SinglePost = (props) => {
  const postId = props.match.params.postId;
  const { user } = useContext(AuthContext);

  const { data, loading } = useQuery(FETCH_POST_QUERY, {
    variables: {
      postId: postId,
    },
    onError(err) {
      console.log(err);
    },
  });

  const deletePostCallback = () => {
    props.history.push("/");
  };

  let postMarkup;
  let getPost;
  if (loading) {
    postMarkup = <p>Loading Post</p>;
  } else {
    getPost = data.getPost;
    const {
      id,
      body,
      createdAt,
      userName,
      comments,
      likes,
      likeCount,
      commentCount,
    } = getPost;

    postMarkup = (
      <Grid>
        <Grid.Row>
          <Grid.Column width={2}>
            <Image
              src="https://react.semantic-ui.com/images/avatar/large/molly.png"
              size="small"
              float="right"
            />
          </Grid.Column>
          <Grid.Column width={10}>
            <Card fluid>
              <Card.Content>
                <Card.Header>{userName}</Card.Header>
                <Card.Meta>{moment(createdAt).fromNow()}</Card.Meta>
                <Card.Description>{body}</Card.Description>
              </Card.Content>
              <hr />
              <Card.Content extra>
                <LikeButton user={user} post={{ id, likeCount, likes }} />
                <Button
                  as="div"
                  labelPosition="right"
                  onClick={() => console.log("Comment button clicked")}
                >
                  <Button basic color="blue">
                    <Icon name="comments" />
                  </Button>
                  <Label basic color="blue" pointing="left">
                    {commentCount}
                  </Label>
                </Button>
                {user && user.userName === userName && (
                  <DeleteButton postId={id} callback={deletePostCallback} />
                )}
              </Card.Content>
            </Card>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }

  return postMarkup;
};

const FETCH_POST_QUERY = gql`
  query getPost($postId: String!) {
    getPost(postId: $postId) {
      id
      body
      createdAt
      comments {
        createdAt
        userName
        body
        id
      }
      userName
      likes {
        userName
      }
      likeCount
      commentCount
    }
  }
`;

export default SinglePost;
