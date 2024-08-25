import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import ReviewCard from "./ReviewCard";
import { ReviewSummary } from "./ReviewSummary";

const Reviews = () => {
  
  return (
    <div className="border-2 p-10 rounded-md">
      <h2 className="font-manrope font-bold text-4xl text-black mb-8 text-center">Our customer reviews
      </h2>
      <div className="pt-8">
        <ReviewSummary />
      </div>
      <div>
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