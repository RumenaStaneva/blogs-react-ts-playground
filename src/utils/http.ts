export async function get(url: string) {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }

  const data = (await response.json()) as unknown;
  return data;
}

// generic get
// export async function get<T>(url: string) {
//     const response = await fetch(url);

//     if (!response.ok) {
//       throw new Error('Failed to fetch data.');
//     }

//     const data = await response.json() as unknown;
//     return data as T;
//   }

// T is then set when calling get:

// const data = await get<RawDataBlogPost[]>(
//     'https://jsonplaceholder.typicode.com/posts'
//   );
