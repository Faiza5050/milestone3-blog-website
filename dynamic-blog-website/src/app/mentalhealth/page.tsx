import React from "react";
import { Mentalhealth } from "@/sanity/lib/interface";
import { client } from "@/sanity/lib/client";
import Link from "next/link";
import Image from "next/image";

async function getData() {
  const query = `*[_type == "mentalhealth"]{
    title,
    overview,
    content,
    slug,
    _id,
    url,
    _createdAt,
    "mainImage" : mainImage.asset->url
  }`;

  const data = await client.fetch(query);
  return data;
}

export const revalidate = 60;

export default async function MentalHealthPage() {
  const data = await getData();

  if (!data || data.length === 0) {
    return <div>No Mental Health posts available.</div>;
  }

  return (
    <div>
      <div className="w-full bg-cover bg-center mb-10 -mt-15 h-[700px]"
        style={{ backgroundImage: "url('/mental.jpg')" }}>
        <div className="w-full font-bold text-3xl text-center mr-72 pt-60">
          <div className="w-full h-60 bg-black opacity-70 text-white z-[-1]">
            <div className="h-60 max-w-screen-2xl mx-auto flex flex-col justify-center
              items-center text-4xl md:text-5xl font-extrabold text-center">
              Mental Health
            </div>
          </div>
        </div>
      </div>

      <h1 className="font-extrabold capitalize text-2xl md:text-3xl lg:text-5xl text-center text-violet-500 my-12">
        All my Mental Health Posts
      </h1>

      <div className="grid grid-2 bg-transparent lg:grid-cols-2 gap-8 px-14 py-5">
        {data.map((mentalhealth: Mentalhealth) => (
          <div key={mentalhealth._id} className="bg-white p-3 rounded-lg shadow-xl hover:-translate-y-3 hover:scale-300 duration-300">
            <article>
              <Link href={`/mentalhealth/${mentalhealth.slug.current}`}>
                <div>
                  {mentalhealth.mainImage && (
                    <Image
                      src={mentalhealth.mainImage}
                      alt={mentalhealth.title}
                      width={500}
                      height={200}
                      className="object-cover rounded-lg border border-gray-500"
                    />
                  )}
                  <h2 className="text-3xl font-bold hover:text-violet-500 transition duration-300 ease-in-out mt-8">
                    {mentalhealth.title}
                  </h2>
                </div>
                <p className="line-clamp-2 mt-4">{mentalhealth.overview}</p>
              </Link>

              <div>
                Date Published:{" "}
                <span className="font-semibold">
                  {new Date(mentalhealth._createdAt).toISOString().split("T")[0]}
                </span>
              </div>
            </article>
          </div>
        ))}
      </div>

    </div>
  );
}
