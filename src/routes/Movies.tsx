import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Movies = () => {
  return (
    <div>
      <Link to={"/movie/912649"} >
        <Button>Go to movie</Button>
      </Link>
    </div>
  );
};

export default Movies;
