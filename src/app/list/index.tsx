"use client";

import { useInView } from "react-intersection-observer";
import { Fragment, useEffect } from "react";
import {
  Card,
  CardBody,
  CardFooter,
  SimpleGrid,
  Text,
  Image,
  Center,
  Button,
  Box,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import useAssetListQuery from "./useAssetListQuery";

const List = () => {
  const router = useRouter();
  const { ref, inView } = useInView();

  const { status, data, isFetchingNextPage, fetchNextPage, hasNextPage } =
    useAssetListQuery();

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);

  return (
    <div>
      {status === "loading" || !data ? (
        <p>Loading...</p>
      ) : (
        <>
          <SimpleGrid
            spacing={4}
            templateColumns="repeat(2, minmax(200px, 1fr))"
          >
            {data.pages.map((page) => (
              <Fragment key={page.next}>
                {page.assets.map((asset) => (
                  <Card
                    key={asset.id}
                    onClick={() =>
                      router.push(
                        `/${asset.id}?assetContractAddress=${asset.assetContractAddress}&tokenId=${asset.tokenId}`
                      )
                    }
                  >
                    <CardBody>
                      <Center>
                        <Image
                          src={asset.imageUrl}
                          alt={asset.name}
                          borderRadius="lg"
                          boxSize="100px"
                          objectFit="cover"
                          // When image_url is null
                          fallbackSrc="https://via.placeholder.com/150"
                        />
                      </Center>
                    </CardBody>
                    <Center>
                      <CardFooter>
                        <Text>{asset.name}</Text>
                      </CardFooter>
                    </Center>
                  </Card>
                ))}
              </Fragment>
            ))}
          </SimpleGrid>
          <Box h={2} />
          <Center>
            <Button
              ref={ref}
              onClick={() => fetchNextPage()}
              disabled={!hasNextPage || isFetchingNextPage}
            >
              {isFetchingNextPage
                ? "Loading more..."
                : hasNextPage
                ? "Load Newer"
                : "Nothing more to load"}
            </Button>
          </Center>
        </>
      )}
    </div>
  );
};

export default List;
