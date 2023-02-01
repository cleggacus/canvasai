import { Course, RequestCoursesOptions } from "./courses";
import request from "./request";

const course = async (id: number, options: RequestCoursesOptions) => {
  const data = await request({
    ...options, 
    path: `/api/v1/courses/${id}`
  });

  return data as Course;
}

export default course;