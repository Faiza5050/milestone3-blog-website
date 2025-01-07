export interface PortableTextMarkDef {
    _key: string;
    _type: string;
}

export interface PortableTextBlock {
    _key: string;
    _type: string;
    children: Array<{
        _key: string;
        _type: string;
        text: string;
        marks: string[];
    }>;
    markDefs: PortableTextMarkDef[];
}

export interface Programming {
    title: string;
    overview: string;
    content: PortableTextBlock[];
    _id: string;
    slug: {
        current : string;
    };
    _createdAt: string;
    mainImage: string;
    url: string;
}

export interface Mentalhealth {
    title: string;
    overview: string;
    content: PortableTextBlock[];
    _id: string;
    slug: {
        current : string;
    };
    _createdAt: string;
    mainImage: string;
    url: string;
}
