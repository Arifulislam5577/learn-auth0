import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const { getAccessTokenSilently } = useAuth0();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const getProducts = async () => {
      try {
        setError("");
        setLoading(true);
        const token = await getAccessTokenSilently();
        const res = await fetch("http://localhost:5000/products", {
          method: "GET",
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            authorization: "Bearer " + token,
          },
        });
        const result = await res.json();
        setProducts(result);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
    getProducts();
  }, [getAccessTokenSilently]);

  console.log({ products, loading, error });
  return (
    <section className="py-10 bg-white sm:py-16 lg:py-24">
      <div className="max-w-5xl px-4 mx-auto sm:px-6 lg:px-8">
        <div className="mx-auto text-left md:max-w-lg lg:max-w-2xl md:text-center">
          <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-5xl lg:leading-tight">
            I am building a product that can
            <span className="relative inline-block">
              <span className="absolute inline-block w-full h-2 bg-yellow-300 bottom-1.5"></span>
              <span className="relative"> solve developer’s pain </span>
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 mt-8 md:mt-20 gap-y-6 md:grid-cols-2 gap-x-10">
          <div>
            <img
              className="w-full mx-auto sm:max-w-xs"
              src="https://cdn.rareblocks.xyz/collection/celebration/images/team/2/business-man.jpg"
              alt=""
            />
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              Hey! I am John, founder of Celebration.
            </h3>
            <p className="mt-4 text-lg text-gray-700">
              Amet minim mollit non deserunt ullamco est sit aliqua dolor do
              amet sint. Velit officia consequat duis enim velit mollit.
              Exercitation veniam consequat sunt nostrud amet.
            </p>
            <p className="mt-4 text-lg text-gray-700">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>

            <h3 className="mt-8 text-lg font-semibold text-gray-900">
              How do I do this without any investment?
            </h3>
            <p className="mt-4 text-lg text-gray-700">
              Duis aute irure dolor in reprehenderit in voluptate velit esse
              cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
              cupidatat non proident, sunt in culpa qui officia deserunt mollit
              anim id est laborum.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
