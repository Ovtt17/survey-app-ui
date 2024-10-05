import {FormEvent} from "react";
import SurveyTitleInput from './SurveyTitleInput';
import SurveyDescriptionInput from "./SurveyDescriptionInput.tsx";
import AccordionList from "../accordion/AccordionList.tsx";
import SubmitSurveyButton from "./SubmitSurveyButton.tsx";
import {useSurveyContext} from "../../context/SurveyContext.tsx";

const SurveyFormContainer = () => {
    const { isSurveyEditable } = useSurveyContext();

    const createOrUpdateSurvey = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    };

    return (
        <div className='w-11/12 bg-white p-8 rounded-lg shadow-xl'>
            <form onSubmit={createOrUpdateSurvey} className='flex flex-col gap-5'>
                <SurveyTitleInput />
                <SurveyDescriptionInput />
                <AccordionList />
                <SubmitSurveyButton isEditable={isSurveyEditable} />
            </form>
        </div>
    );
}

export default SurveyFormContainer;