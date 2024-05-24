import ShoppingList from "./ShoppingList";
import MainCarousel from "./MainCarousel";

function Home() {
  return (
    <div className="gear">
      <MainCarousel />
      <ShoppingList />
    </div>
  );
}

export default Home;
