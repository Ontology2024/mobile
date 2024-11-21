export const searchPlace: any = async (location: string) => {
  const data = await fetch(
    `https://dapi.kakao.com/v2/local/search/keyword.json?query=${location}`,
    {
      headers: {
        Authorization: `KakaoAK 4e56c38149fa5a65c929658dcff2d85b`,
      },
    }
  );

  if (!data.ok) {
    throw new Error("Network response was not ok " + data.statusText);
  }
  const json = await data.json();
  return json?.documents || [];
};

export async function direction5({
  start,
  end,
}: {
  start: { latitude: string; longitude: string };
  end: { latitude: string; longitude: string };
}) {
  const url = `https://naveropenapi.apigw.ntruss.com/map-direction-15/v1/driving?goal=${end.longitude},${end.latitude}&start=${start.longitude},${start.latitude}&option=trafast:traoptimal:tracomfort`;
  const options = {
    method: "GET",
    headers: {
      "x-ncp-apigw-api-key-id": process.env.EXPO_PUBLIC_NAVER_API_CLIENT_ID!,
      "x-ncp-apigw-api-key": process.env.EXPO_PUBLIC_NAVER_API_SECRET!,
    },
  };
  const res = await fetch(url, options);
  if (!res.ok) {
    throw new Error("Network response was not ok");
  }
  const result = await res.json();
  return result;
}
