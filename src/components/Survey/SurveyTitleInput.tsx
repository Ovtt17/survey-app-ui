import {useSurveyContext} from "../../context/SurveyContext.tsx";
import React from "react";

const SurveyTitleInput = () => {
    const {survey, setSurvey} = useSurveyContext();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSurvey({
            ...survey,
            title: e.target.value
        });
    }

    return (
        <div>
            <label className="block text-gray-600 mb-2">Título</label>
            <input
                type="text"
                name="Title"
                value={survey.title}
                placeholder="Título de la Encuesta"
                className="w-full border border-gray-300 rounded-lg p-3"
                onChange={handleChange}
            />
        </div>
    );
}

export default SurveyTitleInput;