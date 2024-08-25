import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import ReviewCard from "./ReviewCard";

const Reviews = () => {
  return (
    <div className="border-2 p-10 rounded-md">
      <h2 className="text-2xl">Reviews</h2>
      <div className="pt-8">
        <ReviewCard />
      </div>
      <div className="fixed bottom-10 right-10">
        <Fab color="primary" aria-label="add">
          <AddIcon />
        </Fab>
      </div>

    </div>
  );
}

export default Reviews;