import { InfiniteData, useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { API_LIST_LIMIT, API_URL, ASSET_OWNER } from "../constants";

interface IApiAsset {
  assets: {
    id: number;
    image_url: string;
    name: string;
    token_id: string;
    asset_contract: {
      address: string;
    };
  }[];
  next: string;
}

interface IDisplayAssetItem {
  id: number;
  name: string;
  imageUrl: string;
  assetContractAddress: string;
  tokenId: string;
}

interface IDisplayAssetList {
  assets: IDisplayAssetItem[];
  next: string;
}

const useAssetListQuery = () => {
  return useInfiniteQuery({
    queryKey: ["assets"],
    queryFn: async ({ pageParam }) => {
      const res = await axios.get(`${API_URL}/assets`, {
        params: {
          owner: ASSET_OWNER,
          cursor: pageParam,
          limit: API_LIST_LIMIT,
        },
      });

      return res.data;
    },
    getNextPageParam: (lastPage) => lastPage.next ?? undefined,
    select: (
      data: InfiniteData<IApiAsset>
    ): InfiniteData<IDisplayAssetList> => ({
      pages: data.pages.map(({ assets, next }) => ({
        assets: assets.map((asset) => ({
          id: asset.id,
          name: asset.name,
          imageUrl: asset.image_url,
          assetContractAddress: asset.asset_contract.address,
          tokenId: asset.token_id,
        })),
        next,
      })),
      pageParams: data.pageParams,
    }),
  });
};

export default useAssetListQuery;
