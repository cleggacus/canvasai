import { getSdk } from "@/src/graphql/sdk";
import { gql, GraphQLClient } from "graphql-request";

export type Course = {
  id: number,
  name: string,
  image_download_url: string,
  created_at: string,
}

const applyToken = (url: string, token: string) => {
  let urlObj = new URL(url);
  urlObj.searchParams.set("access_token", token);
  urlObj.searchParams.set("per_page", "100");
  urlObj.searchParams.set("include[]", "course_image")
  urlObj.searchParams.set("enrollment_state", "active")
  urlObj.searchParams.set("state", "available")
  urlObj.searchParams.set("exclude_blueprint_courses", "true")
  return urlObj.toString()
}

const getCourses = async (url: string, token: string) => {
  if(url.endsWith("/"))
    url.slice(url.length-1, url.length);

  const response = await fetch(applyToken(`${url}/api/v1/courses/`, token));
  const data = await response.json() as Course[];

  data.sort((a, b) => Date.parse(b.created_at) - Date.parse(a.created_at));

  return data
}

const getCourse = async (url: string, token: string, courseId: string) => {
  if(url.endsWith("/"))
    url.slice(url.length-1, url.length);

  url = `${url}/api/graphql`;


  const graphQLClient = new GraphQLClient(url, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  })

  const sdk = getSdk(graphQLClient);

  const { data } = await sdk.course({
    courseId
  });

  return data.course;
}

export {
  getCourses,
  getCourse
}