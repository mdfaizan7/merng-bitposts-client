import React, { useState } from "react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { Button, Confirm, Icon } from "semantic-ui-react";
import { FETCH_POSTS_QUERY } from "../util/graphql";

const DeleteButton = ({ postId, callback }) => {
  const [open, setOpen] = useState(false);

  const [deletePost] = useMutation(DELETE_POST_MUTATION, {
    update(proxy) {
      setOpen(false);
      const data = proxy.readQuery({
        query: FETCH_POSTS_QUERY,
      });
      proxy.writeQuery({
        query: FETCH_POSTS_QUERY,
        data: { getPosts: data.getPosts.filter((p) => p.id !== postId) },
      });

      if (callback) callback();
    },
    variables: { postId },
  });

  return (
    <>
      <Button
        as="div"
        color="red"
        onClick={() => setOpen(true)}
        floated="right"
      >
        <Icon name="trash" style={{ margin: 0 }} />
      </Button>
      <Confirm
        open={open}
        onCancel={() => setOpen(false)}
        onConfirm={deletePost}
      />
    </>
  );
};

const DELETE_POST_MUTATION = gql`
  mutation deletePost($postId: ID!) {
    deletePost(postId: $postId)
  }
`;

export default DeleteButton;
