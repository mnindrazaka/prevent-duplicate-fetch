import React from "react";
import { httpClientWithCache } from "./base";

type Product = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

export const getProductDetail = (id: number): Promise<Product> => {
  return httpClientWithCache
    .getWithCache<Product>(`/posts/${id}`)
    .then((res) => res.data);
};

export const useGetProductDetail = (id: number) => {
  const [data, setData] = React.useState<Product>();

  React.useEffect(() => {
    getProductDetail(id).then(setData);
  }, [id]);

  return { data };
};
