import { Container, PostCard } from "../components";

const Home = () => {
  return (
    <div className="w-full py-8 mt-4 text-center">
      <Container>
        <div className="flex flex-col justify-center items-center px-4">
          <header className="text-center mb-10">
            <h1 className="text-5xl font-bold text-white mb-4">
              Welcome to My Blog
            </h1>
            <p className="text-white text-lg max-w-xl">
              Explore ideas, tutorials, and personal insights on web
              development, design, and technology.
            </p>
          </header>

          <div className="flex gap-4">
            <button className="bg-blue-600 text-white px-6 py-2 rounded-xl shadow hover:bg-blue-700 transition">
              Get Started
            </button>
            <button className="border border-blue-600 text-blue-600 px-6 py-2 rounded-xl hover:bg-blue-50 transition">
              Learn More
            </button>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Home;
