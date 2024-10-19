import {FC} from 'react';
import Button from "@mui/material/Button";

interface SubmitSurveyButtonProps {
    isEditable: boolean;
}

const SubmitSurveyButton: FC<SubmitSurveyButtonProps> = ({isEditable}) => {
    return (
        <div className='pt-10'>
            <Button type="submit" variant="contained" color="success" sx={{marginTop: 2}}>
                {isEditable ? 'Editar encuesta' : 'Crear encuesta'}
            </Button>
        </div>
    );
}

export default SubmitSurveyButton;