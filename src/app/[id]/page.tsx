"use client";
import styles from "../page.module.css";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import useAssetDetailQuery from "./useAssetDetailQuery";
import { ChevronLeftIcon, ExternalLinkIcon } from "@chakra-ui/icons";
import { Box, Flex, Spacer } from "@chakra-ui/layout";
import { Text, Image, Link } from "@chakra-ui/react";

const Detail = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const assetContractAddress = searchParams.get("assetContractAddress");
  const tokenId = searchParams.get("tokenId");

  const { data: asset, isLoading } = useAssetDetailQuery({
    id: Number(pathname),
    assetContractAddress,
    tokenId,
  });

  if (isLoading || !asset) return null;

  return (
    <main className={styles.main}>
      <Flex w="100%" justify="space-between" alignItems="center">
        <Box marginLeft="-28px" onClick={() => router.back()}>
          <ChevronLeftIcon boxSize={8} />
        </Box>
        <Spacer />
        <Text color="white">{asset.collectionName ?? "--"}</Text>
        <Spacer />
      </Flex>
      <Box h={2} />
      <Image
        src={asset.imageUrl}
        alt={asset.assetName}
        borderRadius="lg"
        boxSize="100%"
        objectFit="cover"
        // When image_url is null
        fallbackSrc="https://via.placeholder.com/150"
      />
      <Box h={2} />
      <Text>{asset.assetName ?? "--"}</Text>
      <Box h={2} />
      <Text maxH="150px" overflowY="auto">
        {asset.description ?? "--"}
      </Text>
      <Box h={2} />
      <Box
        position="fixed"
        bottom="16px"
        left="96px"
        right="96px"
        maxWidth="100%"
      >
        <Link href={asset.permalink ?? ""} isExternal>
          {asset.permalink ?? ""} <ExternalLinkIcon mx="2px" />
        </Link>
      </Box>
    </main>
  );
};

export default Detail;
