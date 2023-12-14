import PopularFetch from "./PopularFetch";

export default function page() {
  return (
    <main>
      <h1 id="popular-mov-text">Popular Movies Now</h1>
      <h2 className="text-center text-2xl mt-5">
        This page uses client-side rendering.
      </h2>
      <PopularFetch />
    </main>
  );
}
