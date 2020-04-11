import React from "react";
import gql from "graphql-tag";
import { useForm } from "../util/hooks";
import { Form, Button } from "semantic-ui-react";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { FETCH_POSTS_QUERY } from "../util/graphql";

const CreatePost = () => {
  const { values, onChange, onSubmit } = useForm(createPostCallback, {
    body: "",
  });

  const [createPost, { error }] = useMutation(CREATE_POST_MUTATION, {
    variables: values,
    update(proxy, result) {
      const data = proxy.readQuery({
        query: FETCH_POSTS_QUERY,
      });
      proxy.writeQuery({
        query: FETCH_POSTS_QUERY,
        variables: values,
        data: { getPosts: [result.data.createPost, ...data.getPosts] },
      });
      values.body = "";
    },
  });

  function createPostCallback() {
    createPost();
  }

  return (
    <React.Fragment>
      <Form onSubmit={onSubmit}>
        <h3>Create a Post:</h3>
        <Form.Field>
          <Form.Input
            placeholder="This is start of something bueatiful, say something nice or share a cat fact"
            name="body"
            onChange={onChange}
            value={values.body}
          />
          <Button type="submit" color="teal">
            Submit
          </Button>
        </Form.Field>
      </Form>
    </React.Fragment>
  );
};

const CREATE_POST_MUTATION = gql`
  mutation createPost($body: String!) {
    createPost(body: $body) {
      id
      body
      createdAt
      userName
      likes {
        id
        userName
        createdAt
      }
      likeCount
      comments {
        id
        body
        userName
        createdAt
      }
      commentCount
    }
  }
`;

export default CreatePost;
