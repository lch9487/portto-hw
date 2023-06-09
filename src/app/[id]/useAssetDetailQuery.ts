import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { API_URL } from "../constants";

interface IUseAssetDetailQuery {
  id: number;
  assetContractAddress: string | null;
  tokenId: string | null;
}

interface IApiAssetDetail {
  collection: {
    name: string;
  };
  image_url: string;
  name: string;
  description: string;
  permalink: string;
}

interface IDisplayAssetDetail {
  collectionName: string;
  imageUrl: string;
  assetName: string;
  description: string;
  permalink: string;
}

const useAssetDetailQuery = ({
  id,
  assetContractAddress,
  tokenId,
}: IUseAssetDetailQuery) => {
  return useQuery({
    queryKey: ["assets", id],
    queryFn: async () => {
      const res = await axios.get(
        `${API_URL}/asset/${assetContractAddress}/${tokenId}`
      );

      return res.data;
    },
    enabled: !!assetContractAddress && !!tokenId,
    select: (data: IApiAssetDetail): IDisplayAssetDetail => ({
      collectionName: data.collection.name,
      imageUrl: data.image_url,
      assetName: data.name,
      description: data.description,
      permalink: data.permalink,
    }),
  });
};

export default useAssetDetailQuery;
