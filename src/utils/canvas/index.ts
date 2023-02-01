import fs from "fs";
import https from "https";
import downloadFile from "./download";
import courses from "./courses";

const applyToken = (url: string, token: string) => {
  let urlObj = new URL(url);
  urlObj.searchParams.set("access_token", token);
  urlObj.searchParams.set("per_page", "100");
  urlObj.searchParams.append("include[]", "course_image")
  urlObj.searchParams.append("include[]", "favorites")
  urlObj.searchParams.set("enrollment_state", "active")
  urlObj.searchParams.set("state", "available")
  urlObj.searchParams.set("exclude_blueprint_courses", "true")
  return urlObj.toString()
}

const getCourses = async (url: string, token: string) => {
  if(url.endsWith("/"))
    url.slice(url.length-1, url.length);

  const data = await courses({
    url, 
    token,
    params: {
      include: ["course_image", "banner_image", "favorites"]
    }
  });

  return data;
}

const getCourse = async (url: string, token: string, courseId: string) => {
  return {}
}

const getFile = async (url: string, token: string, fileId: string) => {
  return {}
}

// const fetchFile = async (url: string, token: string) => {
//   const response = await fetch(url, {
//     headers: {
//       authorization: `Bearer ${token}`,
//     }
//   })  

//   const arrayBuffer = await response.arrayBuffer();
//   const buffer = Buffer.from(arrayBuffer);

//   const v = new URL(url);
//   v.searchParams.set("verifier", token);

//   downloadFile(v.toString(), "file.pdf");

//   return buffer.toString("base64");
// }

export {
  getCourses,
  getCourse,
  getFile
}