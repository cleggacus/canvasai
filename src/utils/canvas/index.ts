import fs from "fs";
import https from "https";
import downloadFile from "./download";
import courses from "./courses";
import course from "./course";

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

const getCourses = (url: string, token: string) => {
  return courses({
    url, 
    token,
    params: {
      include: ["course_image", "banner_image", "favorites"]
    }
  });
}

const getCourse = (url: string, token: string, courseId: number) => {
  return course(courseId, {
    url, 
    token,
    params: {
      include: ["course_image", "banner_image", "favorites"]
    }
  });
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