import { useFormContext } from 'react-hook-form';
import { surveyValidationRules } from '../../../data/validationRules';

const SurveyDescriptionInput = () => {
    const { register, formState: { errors } } = useFormContext();

    return (
        <div>
            <label className="block text-gray-600 mb-2">Descripción</label>
            <textarea
                placeholder="Descripción de la Encuesta"
                className="w-full border border-gray-300 rounded-lg p-3"
                {...register('description', surveyValidationRules.description)}
            />
            {errors.description?.message && <span className="text-red-500">{String(errors.description.message)}</span>}
        </div>
    );
}

export default SurveyDescriptionInput;