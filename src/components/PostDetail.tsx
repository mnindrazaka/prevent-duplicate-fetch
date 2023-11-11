import { useGetProductDetail } from "@/services";
import React from "react";

export type PostDetailProps = {
  id: number;
};

export function PostDetail(props: PostDetailProps) {
  const { data } = useGetProductDetail(props.id);
  return data ? (
    <div>
      <h1>{data.id}</h1>
      <p>{data.body}</p>
    </div>
  ) : (
    <p>Loading...</p>
  );
}
