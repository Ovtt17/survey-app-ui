import {useSurveyContext} from "../../context/SurveyContext.tsx";
import React from "react";

const SurveyDescriptionInput = () => {
    const {survey, setSurvey} = useSurveyContext();

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setSurvey({
            ...survey,
            description: e.target.value
        });
    }

    return (
        <div>
            <label className="block text-gray-600 mb-2">Descripción</label>
            <textarea
                name="Description"
                value={survey.description}
                placeholder="Descripción de la Encuesta"
                className="w-full border border-gray-300 rounded-lg p-3"
                onChange={handleChange}
            />
        </div>
    );
}

export default SurveyDescriptionInput;