import Banner from "./components/Banner";

export const revalidate = 60;

export default async function Home() {
  return (
    <>
      <div className="pt-20">
        <Banner />
      </div>
    </>
  );
}
