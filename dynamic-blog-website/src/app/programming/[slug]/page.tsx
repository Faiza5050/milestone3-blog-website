import { Programming } from "@/sanity/lib/interface";
import { client } from "@/sanity/lib/sanity";
import { PortableText } from "@portabletext/react";
import { urlFor } from "@/sanity/lib/sanityImageUrl";
import Image from "next/image";
import Link from "next/link";

interface SanityImageAsset {
  _type: 'reference';
  _ref: string;
}

interface PortableTextImageProps {
  value: {
    asset: SanityImageAsset;
  };
}

async function getData(slug: string) {
  const query = `*[_type == "programming" && slug.current == $slug] {
    title,
    content,
    _createdAt,
    "mainImage": mainImage.asset->url,
    slug
  }[0]`;

  try {
    const data = await client.fetch(query, { slug });
    if (!data) {
      console.log("No data found for this slug:", slug);
    }
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}

async function getRecentPosts(postType: "programming") {
  const query = `*[_type == "${postType}"] | order(_createdAt desc) [0..3]{
    title,
    overview,
    slug,
    _id,
    _createdAt,
    "mainImage": mainImage.asset->url,
    content,
  }`;

  try {
    const data = await client.fetch(query);
    console.log("Fetched recent posts:", data);
    return data;
  } catch (error) {
    console.error("Error fetching recent posts:", error);
    return [];
  }
}

type PageProps = {
  params: {
    slug: string;
  };
};

export default async function ProgrammingSlugPage({
  params,
}: PageProps) {
  
  const { slug } = params;
  
  console.log("Slug in params:", slug);

  const data = await getData(slug);

  if (!data) {
    console.error("No data found for this slug.");
    return <div>Sorry, this content is not available.</div>;
  }

  const PortableTextComponent = {
    types: {
      Image: ({ value }: PortableTextImageProps) => {
        if (value.asset?._type === 'reference') {
          const imageUrl = urlFor(value.asset).url();
          return <Image src={imageUrl} alt="Image" width={800} height={800} />;
        }
        return null;
      },
    },
  };

  const programmingData = await getRecentPosts("programming");

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
      <div className="my-24 lg:col-span-8 col-span-1 mx-auto">
        <h1 className="font-extrabold text-3xl md:text-4xl lg:text-5xl ml-16 px-4 pt-4">
          {data.title}
        </h1>
        <p className="my-5 ml-16 px-4 font-bold">
          {new Date(data._createdAt).toISOString().split("T")[0]}
        </p>

        <Image
          src={data.mainImage}
          alt="Main Image"
          width={750}
          height={300}
          className="object-cover rounded-lg border border-gray-500 mx-auto"
        />

        <div className="px-0 pt-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 leading-8 w-[70%] text-[#333]">
          <PortableText value={data.content} components={PortableTextComponent} />
        </div>
      </div>

      <div className="lg:col-span-4 col-span-1 my-24">
        <div className="lg:sticky relative top-8 my-24">
          <div className="bg-white shadow-lg rounded-lg pb-12 p-5 mg-8">
            <h3 className="text-xl mb-8 font-semibold border-b pb-4">Related Posts</h3>
            {programmingData.length > 0 ? (
              programmingData.map((programming: Programming) => (
                <div key={programming._id}>
                  <Link href={`/programming/${programming.slug.current}`}>
                    <div className="flex items-center w-full mb-4">
                      <div className="w-16 flex-none">
                        {programming.mainImage && (
                          <Image
                            src={programming.mainImage}
                            alt="Image"
                            width={60}
                            height={60}
                            className="align-middle rounded-full"
                          />
                        )}
                      </div>
                      <div className="flex-grow ml-4">
                        <p className="text-gray-500 font-xs">
                          <span>
                            {new Date(programming._createdAt)
                              .toISOString()
                              .split("T")[0]}
                          </span>
                        </p>
                        <p className="text-md hover:text-purple-600">
                          {programming.title}
                        </p>
                      </div>
                    </div>
                  </Link>
                </div>
              ))
            ) : (
              <div>No related posts found.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
