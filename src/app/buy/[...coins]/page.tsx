import Trading from "../../components/Trading";
import MyAssets from "../../components/MyAssets";

const page = () => {
  return (
    <main className="bg-yellow-100 w-screen h-screen flex justify-center items-center">
      <Trading></Trading>
      <MyAssets></MyAssets>
    </main>
  );
};

export default page;
