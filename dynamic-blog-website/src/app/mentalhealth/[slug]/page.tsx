import React from "react";
import { Metadata } from "next";
import { Mentalhealth } from "@/sanity/lib/interface";
import { client } from "@/sanity/lib/sanity";
import { PortableText } from "@portabletext/react";
import { urlFor } from "@/sanity/lib/sanityImageUrl";
import Image from "next/image";
import Link from "next/link";

interface SanityImageAsset {
  _type: "reference";
  _ref: string;
}

interface PortableTextImageProps {
  value: {
    asset: SanityImageAsset;
  };
}

interface Props {
  params: { slug: string };
}

async function getData(slug: string) {
  const query = `*[_type == "mentalhealth" && slug.current == $slug] {
    title,
    content,
    _createdAt,
    "mainImage": mainImage.asset->url,
    slug
  }[0]`;

  try {
    const data = await client.fetch(query, { slug });
    if (!data) {
      console.error("No data found for slug:", slug);
    }
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}

async function getRecentPosts(postType: "mentalhealth") {
  const query = `*[_type == "${postType}"] | order(_createdAt desc) [0..3] {
    title,
    overview,
    slug,
    _id,
    _createdAt,
    "mainImage": mainImage.asset->url,
    content
  }`;

  try {
    const data = await client.fetch(query);
    return data;
  } catch (error) {
    console.error("Error fetching recent posts:", error);
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const data = await getData(params.slug);
  return {
    title: data?.title || "Mental Health",
    description: data?.content ? data.content[0]?.children[0]?.text || "Learn more about mental health." : "Learn more about mental health.",
  };
}

export default async function MentalhealthSlugPage({ params }: Props) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;

  const data = await getData(slug);
  if (!data) {
    return <div>Sorry, this content is not available.</div>;
  }

  const PortableTextComponent = {
    types: {
      Image: ({ value }: PortableTextImageProps) => {
        if (value.asset?._type === "reference") {
          const imageUrl = urlFor(value.asset).url();
          return (
            <Image
              src={imageUrl}
              alt="Image"
              width={800}
              height={800}
              className="object-cover rounded-lg"
            />
          );
        }
        return null;
      },
    },
  };

  const mentalhealthData = await getRecentPosts("mentalhealth");

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
      <div className="my-24 lg:col-span-8 col-span-1 mx-auto">
        <h1 className="font-extrabold text-3xl md:text-4xl lg:text-5xl ml-16 px-4 pt-4">
          {data.title}
        </h1>
        <p className="my-5 ml-16 px-4 font-bold">
          {new Date(data._createdAt).toISOString().split("T")[0]}
        </p>

        {data.mainImage && (
          <Image
            src={data.mainImage}
            alt="Main Image"
            width={750}
            height={300}
            className="object-cover rounded-lg border border-gray-500 mx-auto"
          />
        )}

        <div className="px-0 pt-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 leading-8 w-[70%] text-[#333]">
          <PortableText value={data.content} components={PortableTextComponent} />
        </div>
      </div>

      <div className="lg:col-span-4 col-span-1 my-24">
        <div className="lg:sticky relative top-8 my-24">
          <div className="bg-white shadow-lg rounded-lg pb-12 p-5 mg-8">
            <h3 className="text-xl mb-8 font-semibold border-b pb-4">
              Related Posts
            </h3>
            {mentalhealthData.length > 0 ? (
              mentalhealthData.map((post: Mentalhealth) => (
                <div key={post._id}>
                  <Link href={`/mentalhealth/${post.slug.current}`}>
                    <div className="flex items-center w-full mb-4">
                      <div className="w-16 flex-none">
                        {post.mainImage && (
                          <Image
                            src={post.mainImage}
                            alt={post.title}
                            width={60}
                            height={60}
                            className="align-middle rounded-full"
                          />
                        )}
                      </div>
                      <div className="flex-grow ml-4">
                        <p className="text-gray-500 font-xs">
                          {new Date(post._createdAt)
                            .toISOString()
                            .split("T")[0]}
                        </p>
                        <p className="text-md hover:text-purple-600">
                          {post.title}
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
