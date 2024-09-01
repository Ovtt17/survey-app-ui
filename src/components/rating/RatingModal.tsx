import React, { useEffect } from "react";
import { Modal, Rating, Typography, Button } from "@mui/material";

interface RatingModalProps {
  open: boolean;
  onClose: () => void;
  userRating?: number;
  onRate: (rating: number) => void;
}

const RatingModal: React.FC<RatingModalProps> = ({ open, onClose, userRating, onRate }) => {
  const [localRating, setLocalRating] = React.useState(userRating);

  useEffect(() => {
    if (open) {
      setLocalRating(userRating || 0);
    }
  }, [open, userRating]);

  const handleSave = () => {
    if (localRating !== undefined && localRating >= 1 && localRating <= 5) {
      onRate(localRating);
    } else {
      console.error("Rating is invalid or out of bounds.");
    }
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white border-2 border-black shadow-24 p-10">
        <Typography id="modal-title" variant="h6" component="h2">
          Valorar
        </Typography>
        <Rating
          name="user-rating"
          value={localRating}
          onChange={(_, newValue) => {
            setLocalRating(newValue || 0);
          }}
          precision={0.5}
        />
        <div className="mt-4">
          <Button
            variant="contained"
            color="primary"
            onClick={handleSave}
          >
            Guardar
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default RatingModal;
