import React from "react";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { Form, Button, TextArea } from "semantic-ui-react";
import { useForm } from "../utils/hooks";
import { FETCH_POSTS_QUERY } from "../utils/graphql";

function PostForm() {
  const { values, onSubmit, onChange } = useForm(createPostCallback, {
    body: "",
    error: ""
  });
  const [createPost, { error }] = useMutation(CREATE_POST_MUTATION, {
    variables: values,
    update(proxy, result) {
      const data = proxy.readQuery({
        query: FETCH_POSTS_QUERY
      });
      data.getPosts = [result.data.createPost, ...data.getPosts];
      proxy.writeQuery({
        query: FETCH_POSTS_QUERY,
        data
      });
      values.body = "";
    }
  });

  function createPostCallback() {
    createPost();
  }
  return (
    <div>
      <h2>Create a post:</h2>
      <Form onSubmit={onSubmit}>
        <TextArea
          name="body"
          placeholder="Say something"
          value={values.body}
          onChange={onChange}
        />
        <Button className="submit-button" color="teal" type="submit">
          Post
        </Button>
      </Form>
    </div>
  );
}
const CREATE_POST_MUTATION = gql`
  mutation createPost($body: String!) {
    createPost(body: $body) {
      id
      body
      createdAt
      username
      likeCount
      likes {
        username
      }
      commentCount
      comments {
        id
        username
        createdAt
        body
      }
    }
  }
`;

export default PostForm;
