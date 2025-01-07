import React from "react";
import Link from "next/link";
import Image from "next/image";
import { client } from "@/sanity/lib/client";

interface Programming {
    _id: string;
    title: string;
    overview: string;
    slug: { current: string };
    _createdAt: string;
    mainImage: string;
}

async function getData() {
    const query = `*[_type == "programming"]
    {
        title,
        overview,
        slug,
        _id,
        _createdAt,
        "mainImage" : mainImage.asset->url
    }`;

    const data = await client.fetch(query);
    return data;   
}

export const revalidate = 60;

export default async function ProgrammingPage () {
    const data = await getData() as Programming[];

    return (
        <div>
            <div className="w-full bg-cover bg-center mb-10 -mt-15 h-[700px]"
                style={{backgroundImage: "url('/prog.jpg')"}}>
                    
                <div className="w-full font-bold text-3xl text-center mr-72 pt-60">
                    <div className="w-full h-60 bg-black opacity-70 text-white z-[-1]">
                        <div className="h-60 max-w-screen-2xl mx-auto flex flex-col justify-center
                            items-center text-4xl sm:text-3xl md:text-5xl lg:text-6xl font-extrabold text-center">
                            Programming
                        </div>
                    </div>
                </div>
            </div>

            <div>
                <h1 className="font-extrabold capitalize text-2xl md:text-3xl lg:text-5xl text-center
                 text-violet-500 my-12"> All my Programming Posts </h1>
            </div>

            <div className="grid grid-2 bg-transparent lg:grid-cols-2 gap-8 px-14 py-5">
                {data.map((programming) => (
                    <div
                        key={programming._id}
                        className="bg-white p-3 rounded-lg shadow-xl hover:-translate-y-3
                        hover:scale-300 duration-300"
                    >
                        <article>
                            <Link href={`/programming/${programming.slug.current}`}>
                                <div>
                                    <div>
                                        {programming.mainImage && (
                                            <Image 
                                                src={programming.mainImage} 
                                                alt={programming.title}
                                                width={500}
                                                height={300}
                                                className="object-cover rounded-lg border border-gray-500 w-full h-auto md:h-[250px] lg:h-[300px]"
                                            />
                                        )}
                                    </div>
                                    <h2 className="text-3xl font-bold hover:text-violet-500 transition duration-300 ease-in-out mt-8">
                                        {programming.title}
                                    </h2>
                                </div>

                                <p className="line-clamp-2 mt-4">{programming.overview}</p>
                            </Link>
                            
                            <div>
                                Date Published : 
                                <span className="font-semibold">
                                    {new Date(programming._createdAt).toISOString().split("T")[0]}
                                </span>
                            </div>
                        </article>
                    </div>
                ))}
            </div>

        </div>
    );
}
