import { useFormContext } from 'react-hook-form';
import { surveyValidationRules } from '../../../data/validationRules';

const SurveyTitleInput = () => {
    const { register, formState: {errors} } = useFormContext();

    return (
        <div>
            <label className="block text-gray-600 mb-2">Título</label>
            <input
                type="text"
                placeholder="Título de la Encuesta"
                className="w-full border border-gray-300 rounded-lg p-3"
                {...register('title', surveyValidationRules.title)}
            />
            {errors.title?.message && <span className="text-red-500">{String(errors.title.message)}</span>}
        </div>
    );
}

export default SurveyTitleInput;