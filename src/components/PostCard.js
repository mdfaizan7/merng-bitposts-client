import React, { useContext } from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth";
import LikeButton from "./LikeButton";
import DeleteButton from "./DeleteButton";

//semantic-ui
import { Button, Card, Icon, Image, Label } from "semantic-ui-react";

const PostCard = ({
  post: { id, body, createdAt, userName, likeCount, commentCount, likes },
}) => {
  const { user } = useContext(AuthContext);

  return (
    <>
      <Card fluid>
        <Card.Content>
          <Image
            floated="right"
            size="mini"
            src="https://react.semantic-ui.com/images/avatar/large/molly.png"
          />
          <Card.Header>{userName}</Card.Header>
          <Card.Meta as={Link} to={`posts/${id}`}>
            {moment(createdAt).fromNow()}
          </Card.Meta>
          <Card.Description>{body}</Card.Description>
        </Card.Content>

        <Card.Content extra>
          <LikeButton user={user} post={{ id, likes, likeCount }} />
          <Button labelPosition="right" as={Link} to={`/posts/${id}`}>
            <Button color="blue" basic>
              <Icon name="comments" />
            </Button>
            <Label basic color="blue" pointing="left">
              {commentCount}
            </Label>
          </Button>
          {user && user.userName === userName && <DeleteButton postId={id} />}
        </Card.Content>
      </Card>
    </>
  );
};

export default PostCard;
